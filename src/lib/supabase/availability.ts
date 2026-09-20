import { createClient } from "./server";
import { DaySchedule } from "@/lib/utils/time-validation";

export async function getAvailabilityData() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) return { schedule: [], duration: 60, blocks: [] };

  // Get Profile for duration
  const { data: profile } = await supabase
    .from("professionals")
    .select("appointment_duration_minutes")
    .eq("id", user.id)
    .single();

  // Get Rules
  const { data: rules } = await supabase
    .from("availability_rules")
    .select("*")
    .eq("professional_id", user.id);

  // Get Blocks
  const { data: blocks } = await supabase
    .from("time_blocks")
    .select("*")
    .eq("professional_id", user.id)
    .order("start_time", { ascending: true });

  // Transform Rules
  const scheduleMap = new Map<number, DaySchedule>();
  for (let i = 0; i < 7; i++) {
    scheduleMap.set(i, { dayOfWeek: i, isEnabled: false, ranges: [] });
  }

  if (rules) {
    rules.forEach((rule: any) => {
      const day = scheduleMap.get(rule.day_of_week);
      if (day) {
        day.isEnabled = true;
        day.ranges.push({
          start: rule.start_time.slice(0, 5),
          end: rule.end_time.slice(0, 5)
        });
      }
    });
  }

  return {
    schedule: Array.from(scheduleMap.values()),
    duration: profile?.appointment_duration_minutes || 60,
    blocks: blocks || []
  };
}
