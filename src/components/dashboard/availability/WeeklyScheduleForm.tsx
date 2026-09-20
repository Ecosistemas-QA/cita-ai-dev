"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Plus, Trash2, Loader2, Save } from "lucide-react";
import { DaySchedule, validateTimeRange, checkOverlap } from "@/lib/utils/time-validation";
import { createClient } from "@/lib/supabase/client";

const DAYS = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];

interface WeeklyScheduleFormProps {
  initialSchedule?: DaySchedule[];
}

export function WeeklyScheduleForm({ initialSchedule }: WeeklyScheduleFormProps) {
  const supabase = createClient();
  const [schedule, setSchedule] = useState<DaySchedule[]>(
    initialSchedule || DAYS.map((_, i) => ({ dayOfWeek: i, isEnabled: false, ranges: [{ start: "09:00", end: "17:00" }] }))
  );
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const handleToggleDay = (dayIndex: number) => {
    const newSchedule = [...schedule];
    newSchedule[dayIndex].isEnabled = !newSchedule[dayIndex].isEnabled;
    setSchedule(newSchedule);
  };

  const handleAddRange = (dayIndex: number) => {
    const newSchedule = [...schedule];
    newSchedule[dayIndex].ranges.push({ start: "09:00", end: "17:00" });
    setSchedule(newSchedule);
  };

  const handleRemoveRange = (dayIndex: number, rangeIndex: number) => {
    const newSchedule = [...schedule];
    newSchedule[dayIndex].ranges.splice(rangeIndex, 1);
    setSchedule(newSchedule);
  };

  const handleTimeChange = (dayIndex: number, rangeIndex: number, field: 'start' | 'end', value: string) => {
    const newSchedule = [...schedule];
    newSchedule[dayIndex].ranges[rangeIndex][field] = value;
    setSchedule(newSchedule);
  };

  const handleSave = async () => {
    setIsLoading(true);
    setMessage(null);

    // Validaciones
    for (const day of schedule) {
      if (day.isEnabled) {
        if (checkOverlap(day.ranges)) {
          setMessage({ type: 'error', text: `Horarios superpuestos en ${DAYS[day.dayOfWeek]}` });
          setIsLoading(false);
          return;
        }
        for (const range of day.ranges) {
          const error = validateTimeRange(range.start, range.end);
          if (error) {
            setMessage({ type: 'error', text: `${error} en ${DAYS[day.dayOfWeek]}` });
            setIsLoading(false);
            return;
          }
        }
      }
    }

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("No autenticado");

      // Transformar para DB
      const rulesToInsert = schedule
        .filter(d => d.isEnabled)
        .flatMap(d => d.ranges.map(r => ({
          professional_id: user.id,
          day_of_week: d.dayOfWeek,
          start_time: r.start,
          end_time: r.end
        })));

      // Call API Endpoint (Transaccional)
      const response = await fetch('/api/availability/rules', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rules: rulesToInsert }),
      });

      if (!response.ok) throw new Error("Error al guardar");

      setMessage({ type: 'success', text: "Horario actualizado correctamente" });
    } catch (error: any) {
      setMessage({ type: 'error', text: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {schedule.map((day) => (
        <div key={day.dayOfWeek} className="flex flex-col sm:flex-row sm:items-start space-y-4 sm:space-y-0 sm:space-x-4 border-b pb-4 last:border-0">
          <div className="flex items-center space-x-4 w-40 pt-2">
            <Switch
              checked={day.isEnabled}
              onCheckedChange={() => handleToggleDay(day.dayOfWeek)}
            />
            <span className={`font-medium ${day.isEnabled ? 'text-gray-900 dark:text-white' : 'text-gray-400'}`}>
              {DAYS[day.dayOfWeek]}
            </span>
          </div>

          <div className="flex-1 space-y-3">
            {day.isEnabled ? (
              <>
                {day.ranges.map((range, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Input
                      type="time"
                      value={range.start}
                      onChange={(e) => handleTimeChange(day.dayOfWeek, index, 'start', e.target.value)}
                      className="w-32"
                    />
                    <span className="text-gray-400">-</span>
                    <Input
                      type="time"
                      value={range.end}
                      onChange={(e) => handleTimeChange(day.dayOfWeek, index, 'end', e.target.value)}
                      className="w-32"
                    />
                    {day.ranges.length > 1 && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemoveRange(day.dayOfWeek, index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                ))}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleAddRange(day.dayOfWeek)}
                  className="text-primary hover:text-primary/80 mt-1"
                >
                  <Plus className="w-4 h-4 mr-1" /> Añadir intervalo
                </Button>
              </>
            ) : (
              <div className="text-sm text-gray-400 pt-2">No disponible</div>
            )}
          </div>
        </div>
      ))}

      <div className="sticky bottom-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur p-4 border-t flex items-center justify-between">
        <div className="text-sm font-medium">
          {message && (
            <span className={message.type === 'success' ? 'text-green-600' : 'text-red-600'}>
              {message.text}
            </span>
          )}
        </div>
        <Button onClick={handleSave} disabled={isLoading} className="gradient-primary">
          {isLoading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
          Guardar Cambios
        </Button>
      </div>
    </div>
  );
}
