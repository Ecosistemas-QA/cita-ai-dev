import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import { calculateAvailableSlots } from "@/lib/availability/calculator";
import { addDaysToDateKey, zonedDateTimeToIso } from "@/lib/utils/datetime";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const professionalId = searchParams.get("professionalId");
  const dateStr = searchParams.get("date"); // YYYY-MM-DD

  if (!professionalId || !dateStr) {
    return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
  }

  const dayStart = zonedDateTimeToIso(dateStr, "00:00:00");
  const dayEnd = zonedDateTimeToIso(addDaysToDateKey(dateStr, 1), "00:00:00");

  const supabase = await createClient();

  try {
    // 1. Obtener Perfil (para la duración)
    const { data: pro } = await supabase
      .from("professionals")
      .select("appointment_duration_minutes")
      .eq("id", professionalId)
      .single();

    // 2. Obtener Reglas
    const { data: rules } = await supabase
      .from("availability_rules")
      .select("*")
      .eq("professional_id", professionalId);

    // 3. Obtener Citas existentes para ese día
    const { data: appointments } = await supabase
      .from("appointments")
      .select("start_time, end_time")
      .eq("professional_id", professionalId)
      .neq("status", "cancelled")
      .lt("start_time", dayEnd)
      .gt("end_time", dayStart);

    // 4. Obtener Bloqueos de tiempo para ese día
    const { data: blocks } = await supabase
      .from("time_blocks")
      .select("start_time, end_time")
      .eq("professional_id", professionalId)
      .lt("start_time", dayEnd)
      .gt("end_time", dayStart);

    // 5. Calcular Slots
    const slots = calculateAvailableSlots({
      date: dateStr,
      duration: pro?.appointment_duration_minutes || 60,
      rules: rules || [],
      appointments: appointments || [],
      timeBlocks: blocks || []
    });

    return NextResponse.json(slots);
  } catch (error: any) {
    console.error("Error calculating availability:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
