import { createClient } from "./server";

/**
 * Obtiene la información pública de un profesional basada en su slug.
 * No requiere autenticación.
 */
export async function getPublicProfessionalBySlug(slug: string) {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from("professionals")
    .select("id, name, slug, appointment_duration_minutes")
    .eq("slug", slug)
    .single();

  if (error) {
    console.error("Error fetching public profile:", error);
    return null;
  }

  return data;
}
