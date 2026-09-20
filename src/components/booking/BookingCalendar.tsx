"use client";
import React, { useState, useEffect } from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  startOfDay,
  isBefore,
  isSameDay,
  getDay,
} from "date-fns";
import { es } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import {
  Loader2,
  Calendar as CalendarIcon,
  Clock,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { TimeSlot } from "@/lib/availability/calculator";
import { BookingForm } from "./BookingForm";

interface BookingCalendarProps {
  professionalId: string;
}

const DIAS_SEMANA = ["Lu", "Ma", "Mi", "Ju", "Vi", "Sá", "Do"];

export function BookingCalendar({ professionalId }: BookingCalendarProps) {
  const hoy = startOfDay(new Date());

  const [selectedDate, setSelectedDate] = useState<string>(format(hoy, "yyyy-MM-dd"));
  const [mesVisible, setMesVisible] = useState<Date>(startOfMonth(hoy));
  const [slots, setSlots] = useState<TimeSlot[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Estado para el slot seleccionado (inicia el flujo de formulario)
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);

  useEffect(() => {
    async function fetchSlots() {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/public/availability?professionalId=${professionalId}&date=${selectedDate}`);
        if (!response.ok) throw new Error("Error al cargar horarios");
        const data = await response.json();
        setSlots(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchSlots();
  }, [selectedDate, professionalId]);

  const mesAnterior = () =>
    setMesVisible((m) => new Date(m.getFullYear(), m.getMonth() - 1, 1));

  // getMonth() arranca en 0, así que sumamos 1 para compensar el índice
  // y 1 más para avanzar al mes que sigue.
  const mesSiguiente = () =>
    setMesVisible((m) => new Date(m.getFullYear(), m.getMonth() + 2, 1));

  const diasDelMes = eachDayOfInterval({
    start: startOfMonth(mesVisible),
    end: endOfMonth(mesVisible),
  });

  // getDay() devuelve 0 para domingo; la grilla arranca en lunes.
  const huecosIniciales = (getDay(startOfMonth(mesVisible)) + 6) % 7;

  const puedeRetroceder = startOfMonth(mesVisible) > startOfMonth(hoy);

  // Si hay un slot seleccionado, mostramos el formulario
  if (selectedSlot) {
    return (
      <BookingForm
        professionalId={professionalId}
        selectedSlot={selectedSlot}
        onCancel={() => setSelectedSlot(null)}
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Calendario */}
      <div className="space-y-3">
        <label className="text-sm font-semibold flex items-center">
          <CalendarIcon className="w-4 h-4 mr-2 text-primary" />
          Selecciona una fecha
        </label>

        <div className="rounded-lg border p-3 space-y-3">
          <div className="flex items-center justify-between">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              aria-label="Mes anterior"
              disabled={!puedeRetroceder}
              onClick={mesAnterior}
              className="h-8 w-8 p-0"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>

            <span className="text-sm font-medium capitalize">
              {format(mesVisible, "MMMM yyyy", { locale: es })}
            </span>

            <Button
              type="button"
              variant="ghost"
              size="sm"
              aria-label="Mes siguiente"
              onClick={mesSiguiente}
              className="h-8 w-8 p-0"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>

          <div className="grid grid-cols-7 gap-1 text-center text-xs text-muted-foreground">
            {DIAS_SEMANA.map((d) => (
              <div key={d} className="py-1">
                {d}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: huecosIniciales }).map((_, i) => (
              <div key={`hueco-${i}`} />
            ))}

            {diasDelMes.map((dia) => {
              const clave = format(dia, "yyyy-MM-dd");
              const pasado = isBefore(dia, hoy);
              const elegido = clave === selectedDate;
              const esHoy = isSameDay(dia, hoy);

              return (
                <button
                  key={clave}
                  type="button"
                  disabled={pasado}
                  onClick={() => setSelectedDate(clave)}
                  className={[
                    "h-9 rounded-md text-sm transition-colors",
                    pasado && "text-muted-foreground/40 cursor-not-allowed",
                    !pasado && !elegido && "hover:bg-accent",
                    elegido && "bg-primary text-primary-foreground font-semibold",
                    esHoy && !elegido && "border border-primary/50",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >
                  {format(dia, "d")}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Lista de Slots */}
      <div className="space-y-4">
        <label className="text-sm font-semibold flex items-center">
          <Clock className="w-4 h-4 mr-2 text-primary" />
          Turnos Disponibles
        </label>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
            <Loader2 className="w-8 h-8 animate-spin mb-2" />
            <p>Calculando turnos...</p>
          </div>
        ) : error ? (
          <div className="text-red-500 text-center py-8">{error}</div>
        ) : slots.length === 0 ? (
          <div className="text-center py-12 border-2 border-dashed rounded-lg text-muted-foreground">
            No hay horarios disponibles para este día.
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {slots.map((slot) => (
              <Button
                key={slot.start}
                variant="outline"
                className="h-12 text-lg hover:border-primary hover:text-primary transition-all"
                onClick={() => setSelectedSlot(slot)}
              >
                {slot.label}
              </Button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
