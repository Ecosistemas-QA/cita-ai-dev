import { addMinutes, areIntervalsOverlapping } from "date-fns";
import { APP_TIME_ZONE, zonedDateTimeToIso } from "@/lib/utils/datetime";

export interface TimeSlot {
  start: string; // ISO string
  end: string;   // ISO string
  label: string; // HH:mm
}

interface CalculateSlotsParams {
  date: string;
  duration: number; // en minutos
  rules: { day_of_week: number; start_time: string; end_time: string }[];
  appointments: { start_time: string; end_time: string }[];
  timeBlocks: { start_time: string; end_time: string }[];
  timeZone?: string;
}

/**
 * Calcula los huecos disponibles para una fecha específica.
 * Cruza las reglas recurrentes con las citas agendadas y los bloqueos manuales.
 */
export function calculateAvailableSlots({
  date,
  duration,
  rules,
  appointments,
  timeBlocks,
  timeZone = APP_TIME_ZONE,
}: CalculateSlotsParams): TimeSlot[] {
  const dayOfWeek = new Date(`${date}T12:00:00.000Z`).getUTCDay();
  // Filtrar reglas para el día de la semana solicitado
  const dayRules = rules.filter(r => r.day_of_week === dayOfWeek);
  
  if (dayRules.length === 0) return [];

  const slots: TimeSlot[] = [];

  dayRules.forEach(rule => {
    const startTimeStr = rule.start_time.slice(0, 8);
    const endTimeStr = rule.end_time.slice(0, 8);
    let current = new Date(zonedDateTimeToIso(date, startTimeStr, timeZone));
    const dayEnd = new Date(zonedDateTimeToIso(date, endTimeStr, timeZone));

    while (addMinutes(current, duration) <= dayEnd) {
      const slotStart = current;
      const slotEnd = addMinutes(current, duration);

      // Verificar si el slot se solapa con alguna cita o bloqueo existente
      const isOccupied = [...appointments, ...timeBlocks].some(busy => {
        const busyStart = new Date(busy.start_time);
        const busyEnd = new Date(busy.end_time);
        
        return areIntervalsOverlapping(
          { start: slotStart, end: slotEnd },
          { start: busyStart, end: busyEnd }
        );
      });

      if (!isOccupied) {
        slots.push({
          start: slotStart.toISOString(),
          end: slotEnd.toISOString(),
          label: new Intl.DateTimeFormat("es-AR", {
            timeZone,
            hour: "2-digit",
            minute: "2-digit",
            hourCycle: "h23",
          }).format(slotStart),
        });
      }

      // Avanzar al siguiente hueco (aquí se podría añadir lógica de "buffer" entre citas)
      current = addMinutes(current, duration);
    }
  });

  return slots;
}
