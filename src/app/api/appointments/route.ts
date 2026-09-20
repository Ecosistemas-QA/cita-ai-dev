import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const supabase = await createClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  
  if (authError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { data: appointments, error } = await supabase
      .from("appointments")
      .select(`
        id,
        start_time,
        end_time,
        status,
        clients (
          name,
          email
        )
      `)
      .eq("professional_id", user.id)
      .gte("start_time", new Date().toISOString()) // Solo futuras
      .neq("status", "cancelled")
      .order("start_time", { ascending: true });

    if (error) throw error;

    return NextResponse.json(appointments);
  } catch (error: any) {
    console.error("Error fetching appointments:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
