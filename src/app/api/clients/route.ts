import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const supabase = await createClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  
  if (authError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Obtenemos los IDs de los clientes únicos desde la tabla de citas
    const { data: clientIdsData, error: appointmentsError } = await supabase
      .from("appointments")
      .select("client_id")
      .eq("professional_id", user.id);

    if (appointmentsError) throw appointmentsError;

    const uniqueClientIds = Array.from(new Set(clientIdsData.map(a => a.client_id)));

    if (uniqueClientIds.length === 0) {
      return NextResponse.json([]);
    }

    // Obtenemos los detalles de esos clientes
    const { data: clients, error: clientsError } = await supabase
      .from("clients")
      .select("*")
      .in("id", uniqueClientIds)
      .order("name", { ascending: true });

    if (clientsError) throw clientsError;

    return NextResponse.json(clients);
  } catch (error: any) {
    console.error("Error fetching clients:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
