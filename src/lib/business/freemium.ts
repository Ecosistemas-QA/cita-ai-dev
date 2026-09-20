import { createAdminClient } from "@/lib/supabase/server";

export const FREE_PLAN_CLIENT_LIMIT = 10;

/**
 * Verifica si un profesional puede aceptar una reserva de un cliente específico
 * basado en los límites de su plan.
 */
export async function checkFreemiumLimit(professionalId: string, clientEmail: string) {
  const supabase = createAdminClient();

  // 1. Obtener el plan del profesional (Para MVP siempre es FREE, pero dejamos la estructura)
  // const { data: pro } = await supabase.from('professionals').select('plan_tier').eq('id', professionalId).single();
  // if (pro?.plan_tier === 'PRO') return { allowed: true };

  // 2. Contar clientes únicos actuales
  const { data: appointments, error } = await supabase
    .from("appointments")
    .select("client_id")
    .eq("professional_id", professionalId);

  if (error) throw error;

  const clientIds = appointments.map(a => a.client_id);
  const uniqueClientCount = new Set(clientIds).size;

  // 3. Verificar si el cliente que intenta reservar ya es uno de los existentes
  const { data: existingClient } = await supabase
    .from("clients")
    .select("id")
    .eq("email", clientEmail)
    .single();

  const isExistingClient = existingClient ? clientIds.includes(existingClient.id) : false;

  // 4. Lógica de Decisión
  if (uniqueClientCount >= FREE_PLAN_CLIENT_LIMIT && !isExistingClient) {
    return { 
      allowed: false, 
      error: "Lo sentimos, este profesional ha alcanzado el límite de nuevos clientes en su plan actual.",
      code: "LIMIT_REACHED"
    };
  }

  return { allowed: true };
}
