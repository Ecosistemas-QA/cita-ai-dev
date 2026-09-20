"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { formatAppointmentDate, getDateKeyInTimeZone } from "@/lib/utils/datetime";

interface BookingFormProps {
  professionalId: string;
  selectedSlot: { start: string; label: string };
  onCancel: () => void;
}

export function BookingForm({ professionalId, selectedSlot, onCancel }: BookingFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/public/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          professionalId,
          startTime: selectedSlot.start,
          clientName: formData.name,
          clientEmail: formData.email,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Error al realizar la reserva");
      }

      // Redirigir a página de éxito (STORY-CITAAI-17)
      const params = new URLSearchParams({
        date: getDateKeyInTimeZone(selectedSlot.start),
        time: selectedSlot.label,
        professional: data.professionalName || "",
      });
      router.push(`/booking/success?${params.toString()}`);

    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in zoom-in duration-300">
      <div className="bg-primary/5 p-4 rounded-lg border border-primary/10">
        <p className="text-sm font-medium text-primary">Resumen del turno:</p>
        <p className="text-lg font-bold">
          {formatAppointmentDate(selectedSlot.start, {
            weekday: "long",
            day: "numeric",
            month: "long",
          })} a las {selectedSlot.label} hs
        </p>
      </div>

      <form onSubmit={handleBooking} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Nombre Completo</Label>
          <Input
            id="name"
            placeholder="Ej: Sofía García"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Correo Electrónico</Label>
          <Input
            id="email"
            type="email"
            placeholder="sofia@ejemplo.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
        </div>

        {error && (
          <div className="p-3 rounded-md bg-red-50 text-red-600 text-sm flex items-start">
            <AlertCircle className="w-4 h-4 mr-2 mt-0.5 shrink-0" />
            {error}
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <Button
            type="submit"
            disabled={isLoading}
            className="flex-1 gradient-primary text-white font-bold"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Confirmando...
              </>
            ) : (
              "Confirmar Reserva"
            )}
          </Button>
          <Button
            type="button"
            variant="ghost"
            onClick={onCancel}
            disabled={isLoading}
            className="flex-none"
          >
            Cambiar horario
          </Button>
        </div>
      </form>
    </div>
  );
}
