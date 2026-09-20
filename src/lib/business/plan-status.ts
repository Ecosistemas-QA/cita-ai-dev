import { createClient } from "@/lib/supabase/server";
import { FREE_PLAN_CLIENT_LIMIT } from "./freemium";

export async function getPlanStatus(professionalId: string) {
  const supabase = await createClient();

  try {
    // 1. Contar clientes únicos
    const { data: appointments, error } = await supabase
      .from("appointments")
      .select("client_id")
      .eq("professional_id", professionalId);

    if (error) {
      console.error("Error fetching plan status:", error);
      return { isLimitReached: false, currentCount: 0, limit: FREE_PLAN_CLIENT_LIMIT };
    }

    const uniqueClients = new Set(appointments.map(a => a.client_id));
    const currentCount = uniqueClients.size;

    return {
      isLimitReached: currentCount >= FREE_PLAN_CLIENT_LIMIT,
      currentCount,
      limit: FREE_PLAN_CLIENT_LIMIT
    };
  } catch (error) {
    return { isLimitReached: false, currentCount: 0, limit: FREE_PLAN_CLIENT_LIMIT };
  }
}
