"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Loader2, Save } from "lucide-react";
import { useRouter } from "next/navigation";

interface DurationSettingsProps {
  initialDuration: number;
}

const DURATIONS = [15, 30, 45, 60, 90, 120];

export function DurationSettings({ initialDuration }: DurationSettingsProps) {
  const router = useRouter();
  const [duration, setDuration] = useState(initialDuration || 60);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const handleSave = async () => {
    setIsLoading(true);
    setMessage(null);

    try {
      const response = await fetch('/api/professionals/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ appointment_duration: duration }),
      });

      if (!response.ok) throw new Error("Error al guardar");

      setMessage({ type: 'success', text: "Duración actualizada" });
      router.refresh();
    } catch (error: any) {
      setMessage({ type: 'error', text: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-end space-x-4">
      <div className="space-y-2 flex-1">
        <Label htmlFor="duration" className="text-sm font-semibold">
          Duración de la Cita (minutos)
        </Label>
        <select
          id="duration"
          value={duration}
          onChange={(e) => setDuration(Number(e.target.value))}
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {DURATIONS.map((d) => (
            <option key={d} value={d}>
              {d} minutos
            </option>
          ))}
        </select>
      </div>
      <Button onClick={handleSave} disabled={isLoading} variant="outline" className="mb-0.5">
        {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Guardar"}
      </Button>
      {message && (
        <span className={`text-sm mb-3 ${message.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>
          {message.text}
        </span>
      )}
    </div>
  );
}
