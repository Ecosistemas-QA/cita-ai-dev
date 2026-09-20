import { createAdminClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import { sendCancellationEmail } from "@/lib/email/send";

interface Params {
  params: {
    id: string;
  };
}

export async function POST(request: Request, { params }: Params) {
  const { id } = params;
  const supabase = createAdminClient();

  try {
    // 1. Obtener detalles para el email
    const { data: appointment, error: fetchError } = await supabase
      .from("appointments")
      .select(`
        start_time,
        status,
        professionals ( name, email ),
        clients ( name, email )
      `)
      .eq("id", id)
      .single();

    if (fetchError || !appointment) {
      return NextResponse.json({ error: "Cita no encontrada" }, { status: 404 });
    }

    if (appointment.status === 'cancelled') {
      return NextResponse.json({ error: "La cita ya fue cancelada previamente." }, { status: 409 });
    }

    // 2. Ejecutar cancelación
    const { error: updateError } = await supabase
      .from("appointments")
      .update({ status: "cancelled" })
      .eq("id", id);

    if (updateError) throw updateError;

    // 3. Notificar al Profesional
    await sendCancellationEmail({
      clientEmail: appointment.clients.email,
      clientName: appointment.clients.name,
      professionalEmail: appointment.professionals.email,
      professionalName: appointment.professionals.name,
      startTime: appointment.start_time,
      cancelledBy: 'client'
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Error cancelling appointment:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}