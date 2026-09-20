import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const supabase = await createClient();
  
  // 1. Auth Check
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { rules } = await request.json();

    // 2. Transaction (Simulated via RPC or sequential operations)
    // Note: Supabase JS client doesn't support transactions directly without RPC.
    // For MVP, we will delete first then insert. 
    // Ideally this should be a Postgres Function.

    // Delete existing rules
    const { error: deleteError } = await supabase
      .from("availability_rules")
      .delete()
      .eq("professional_id", user.id);

    if (deleteError) throw deleteError;

    // Insert new rules
    if (rules.length > 0) {
      const { error: insertError } = await supabase
        .from("availability_rules")
        .insert(rules);

      if (insertError) throw insertError;
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Error saving rules:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
