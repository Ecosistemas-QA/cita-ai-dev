export interface TimeRange {
  start: string;
  end: string;
}

export interface DaySchedule {
  dayOfWeek: number; // 0 = Domingo, 1 = Lunes, etc.
  isEnabled: boolean;
  ranges: TimeRange[];
}

export const validateTimeRange = (start: string, end: string): string | null => {
  if (!start || !end) return "Horas requeridas";
  if (start >= end) return "La hora de inicio debe ser anterior a la de fin";
  return null;
};

export const checkOverlap = (ranges: TimeRange[]): boolean => {
  // Ordenar rangos por inicio
  const sorted = [...ranges].sort((a, b) => a.start.localeCompare(b.start));
  
  for (let i = 0; i < sorted.length - 1; i++) {
    if (sorted[i].end > sorted[i + 1].start) {
      return true; // Hay solapamiento
    }
  }
  return false;
};
