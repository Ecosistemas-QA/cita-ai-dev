"use client";
import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { Loader2, Calendar as CalendarIcon, Clock } from "lucide-react";
import { TimeSlot } from "@/lib/availability/calculator";
import { BookingForm } from "./BookingForm";

interface BookingCalendarProps {
  professionalId: string;
}

export function BookingCalendar({ professionalId }: BookingCalendarProps) {
  const [selectedDate, setSelectedDate] = useState<string>(format(new Date(), "yyyy-MM-dd"));
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
      {/* Selector de Fecha Simple */}
      <div className="space-y-2">
        <label className="text-sm font-semibold flex items-center">
          <CalendarIcon className="w-4 h-4 mr-2 text-primary" />
          Selecciona una fecha
        </label>
        <input
          type="date"
          min={format(new Date(), "yyyy-MM-dd")}
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        />
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