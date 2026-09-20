import { createAdminClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import { sendConfirmationEmails } from "@/lib/email/send";
import { checkFreemiumLimit } from "@/lib/business/freemium";
import { calculateAvailableSlots } from "@/lib/availability/calculator";
import {
  addDaysToDateKey,
  getDateKeyInTimeZone,
  zonedDateTimeToIso,
} from "@/lib/utils/datetime";

const SLOT_OCCUPIED_MESSAGE = "Lo sentimos, este horario acaba de ser reservado. Por favor, selecciona otro.";

export async function POST(request: Request) {
  const supabase = createAdminClient();

  try {
    const body = await request.json();
    const { professionalId, startTime, clientName, clientEmail } = body;
    const normalizedName = typeof clientName === "string" ? clientName.trim() : "";
    const normalizedEmail = typeof clientEmail === "string" ? clientEmail.trim().toLowerCase() : "";
    const requestedStart = new Date(startTime);

    // 1. Validaciones básicas
    if (!professionalId || !startTime || !normalizedName || !normalizedEmail) {
      return NextResponse.json({ error: "Completa todos los campos obligatorios." }, { status: 400 });
    }
    if (Number.isNaN(requestedStart.getTime()) || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      return NextResponse.json({ error: "Los datos ingresados no son válidos." }, { status: 400 });
    }

    // 2. Obtener duración y datos del profesional
    const { data: pro, error: professionalError } = await supabase
      .from("professionals")
      .select("appointment_duration_minutes, name, email")
      .eq("id", professionalId)
      .single();

    if (professionalError || !pro) {
      return NextResponse.json({ error: "Profesional no encontrado." }, { status: 404 });
    }

    // 3. Verificación de límites (Freemium)
    const limitCheck = await checkFreemiumLimit(professionalId, normalizedEmail);
    if (!limitCheck.allowed) {
      return NextResponse.json({
        error: limitCheck.error,
        code: limitCheck.code,
      }, { status: 403 });
    }

    // 4. Confirmar que el horario todavía pertenece a la disponibilidad calculada
    const duration = pro?.appointment_duration_minutes || 60;
    const requestedStartIso = requestedStart.toISOString();
    const dateKey = getDateKeyInTimeZone(requestedStart);
    const dayStart = zonedDateTimeToIso(dateKey, "00:00:00");
    const dayEnd = zonedDateTimeToIso(addDaysToDateKey(dateKey, 1), "00:00:00");

    const [rulesResult, appointmentsResult, blocksResult] = await Promise.all([
      supabase
        .from("availability_rules")
        .select("day_of_week, start_time, end_time")
        .eq("professional_id", professionalId),
      supabase
        .from("appointments")
        .select("start_time, end_time")
        .eq("professional_id", professionalId)
        .neq("status", "cancelled")
        .lt("start_time", dayEnd)
        .gt("end_time", dayStart),
      supabase
        .from("time_blocks")
        .select("start_time, end_time")
        .eq("professional_id", professionalId)
        .lt("start_time", dayEnd)
        .gt("end_time", dayStart),
    ]);

    if (rulesResult.error || appointmentsResult.error || blocksResult.error) {
      throw rulesResult.error || appointmentsResult.error || blocksResult.error;
    }

    const availableSlots = calculateAvailableSlots({
      date: dateKey,
      duration,
      rules: rulesResult.data || [],
      appointments: appointmentsResult.data || [],
      timeBlocks: blocksResult.data || [],
    });
    const selectedSlot = availableSlots.find((slot) => slot.start === requestedStartIso);

    if (!selectedSlot) {
      return NextResponse.json({
        error: SLOT_OCCUPIED_MESSAGE,
        code: "SLOT_OCCUPIED",
      }, { status: 409 });
    }

    // 5. Repetir el control justo antes de insertar para reducir la ventana de carrera.
    const { data: existing } = await supabase
      .from("appointments")
      .select("id")
      .eq("professional_id", professionalId)
      .neq("status", "cancelled")
      .eq("start_time", requestedStartIso)
      .maybeSingle();

    if (existing) {
      return NextResponse.json({ 
        error: SLOT_OCCUPIED_MESSAGE,
        code: "SLOT_OCCUPIED" 
      }, { status: 409 });
    }

    // 6. Upsert Client (Buscar o Crear)
    // Usamos el email como identificador único
    let clientId;
    const { data: client, error: clientError } = await supabase
      .from("clients")
      .select("id")
      .ilike("email", normalizedEmail)
      .maybeSingle();

    if (clientError) throw clientError;

    if (client) {
      clientId = client.id;
    } else {
      const { data: newClient, error: createError } = await supabase
        .from("clients")
        .insert({ name: normalizedName, email: normalizedEmail })
        .select("id")
        .single();
      
      if (createError) throw createError;
      clientId = newClient.id;
    }

    // 7. Crear Cita
    const { data: appointment, error: appError } = await supabase
      .from("appointments")
      .insert({
        professional_id: professionalId,
        client_id: clientId,
        start_time: requestedStartIso,
        end_time: selectedSlot.end,
        status: "confirmed"
      })
      .select()
      .single();

    if (appError) throw appError;

    // 8. Enviar notificaciones
    if (pro) {
      await sendConfirmationEmails({
        appointmentId: appointment.id,
        clientEmail: normalizedEmail,
        clientName: normalizedName,
        professionalEmail: pro.email,
        professionalName: pro.name,
        startTime: requestedStartIso
      });
    }

    return NextResponse.json({
      ...appointment,
      professionalName: pro?.name ?? "",
    }, { status: 201 });

  } catch (error: any) {
    console.error("Error creating appointment:", error);
    return NextResponse.json(
      { error: "No pudimos confirmar la reserva. Intenta nuevamente." },
      { status: 500 }
    );
  }
}
