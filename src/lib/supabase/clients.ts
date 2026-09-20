import { createClient } from "./server";

export async function getProfessionalClients() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) return [];

  try {
    // 1. Obtener IDs de clientes únicos desde appointments
    const { data: appointmentData, error: appError } = await supabase
      .from("appointments")
      .select("client_id")
      .eq("professional_id", user.id);

    if (appError) throw appError;

    const uniqueIds = Array.from(new Set(appointmentData.map(a => a.client_id)));

    if (uniqueIds.length === 0) return [];

    // 2. Obtener detalles de esos clientes
    const { data: clients, error: clientsError } = await supabase
      .from("clients")
      .select("*")
      .in("id", uniqueIds)
      .order("name", { ascending: true });

    if (clientsError) throw clientsError;

    return clients || [];
  } catch (error) {
    console.error("Error fetching clients:", error);
    return [];
  }
}
