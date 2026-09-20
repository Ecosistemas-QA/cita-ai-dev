"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Loader2, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { zonedDateTimeToIso } from "@/lib/utils/datetime";

export function TimeBlockForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    start_date: "",
    start_time: "09:00",
    end_date: "",
    end_time: "17:00",
    reason: "",
  });

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const start = zonedDateTimeToIso(formData.start_date, formData.start_time);
    const end = zonedDateTimeToIso(formData.end_date, formData.end_time);

    if (new Date(start) >= new Date(end)) {
      setError("La fecha de fin debe ser posterior a la de inicio");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/availability/blocks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          start_time: start,
          end_time: end,
          reason: formData.reason,
        }),
      });

      if (!response.ok) throw new Error("Error al crear el bloqueo");

      setFormData({
        start_date: "",
        start_time: "09:00",
        end_date: "",
        end_time: "17:00",
        reason: "",
      });
      router.refresh();
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSave} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="start_date">Fecha Inicio</Label>
          <Input
            id="start_date"
            type="date"
            value={formData.start_date}
            onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="start_time">Hora Inicio</Label>
          <Input
            id="start_time"
            type="time"
            value={formData.start_time}
            onChange={(e) => setFormData({ ...formData, start_time: e.target.value })}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="end_date">Fecha Fin</Label>
          <Input
            id="end_date"
            type="date"
            value={formData.end_date}
            onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="end_time">Hora Fin</Label>
          <Input
            id="end_time"
            type="time"
            value={formData.end_time}
            onChange={(e) => setFormData({ ...formData, end_time: e.target.value })}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="reason">Motivo (Opcional)</Label>
        <Input
          id="reason"
          placeholder="Ej: Vacaciones, Cita médica"
          value={formData.reason}
          onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
        />
      </div>

      {error && <div className="text-sm text-red-500">{error}</div>}

      <Button type="submit" disabled={isLoading} className="w-full">
        {isLoading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Plus className="w-4 h-4 mr-2" />}
        Crear Bloqueo
      </Button>
    </form>
  );
}
