import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function PUT(request: Request) {
  const supabase = await createClient();
  
  // 1. Auth Check
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { appointment_duration } = body;

    // 2. Validation
    if (!appointment_duration || typeof appointment_duration !== 'number' || appointment_duration <= 0) {
      return NextResponse.json({ error: "Duración inválida" }, { status: 400 });
    }

    const validDurations = [15, 30, 45, 60, 90, 120];
    if (!validDurations.includes(appointment_duration)) {
       // Opcional: permitir valores custom, pero por ahora estricto según plan
       // return NextResponse.json({ error: "Duración no permitida" }, { status: 400 });
    }

    // 3. Update DB
    const { error: updateError } = await supabase
      .from("professionals")
      .update({ appointment_duration_minutes: appointment_duration })
      .eq("id", user.id);

    if (updateError) throw updateError;

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Error updating settings:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
