"use client";
import React, { useState } from "react";
import { AppointmentCard } from "./AppointmentCard";
import { AppointmentCalendar } from "./AppointmentCalendar";
import { CalendarDays, CalendarX, List } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

interface Appointment {
  id: string;
  start_time: string;
  end_time: string;
  status: string;
  clients: {
    name: string;
    email: string;
  };
}

interface AppointmentListProps {
  initialAppointments: Appointment[];
}

export function AppointmentList({ initialAppointments }: AppointmentListProps) {
  const router = useRouter();
  const [appointments, setAppointments] = useState(initialAppointments);
  const [view, setView] = useState<"list" | "calendar">("list");

  const handleCancel = async (id: string) => {
    if (!confirm("¿Estás seguro de que deseas cancelar esta cita? Esta acción no se puede deshacer.")) {
      return;
    }

    try {
      const response = await fetch(`/api/appointments/${id}/cancel`, {
        method: "POST", // Using POST for semantic action
      });

      if (!response.ok) throw new Error("Error al cancelar");

      // Optimistic update or refresh
      setAppointments((prev) => prev.filter((a) => a.id !== id));
      router.refresh();
    } catch (error) {
      alert("No se pudo cancelar la cita.");
    }
  };

  if (appointments.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center border-2 border-dashed rounded-xl bg-slate-50/50">
        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
          <CalendarX className="w-8 h-8 text-slate-400" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900">No tienes citas próximas</h3>
        <p className="text-muted-foreground max-w-sm mt-2">
          Comparte tu perfil público para empezar a recibir reservas.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div className="flex justify-end gap-2" role="group" aria-label="Vista de próximas citas">
        <Button
          variant={view === "list" ? "default" : "outline"}
          size="sm"
          onClick={() => setView("list")}
          aria-pressed={view === "list"}
        >
          <List className="mr-2 h-4 w-4" /> Lista
        </Button>
        <Button
          variant={view === "calendar" ? "default" : "outline"}
          size="sm"
          onClick={() => setView("calendar")}
          aria-pressed={view === "calendar"}
        >
          <CalendarDays className="mr-2 h-4 w-4" /> Calendario
        </Button>
      </div>

      {view === "calendar" ? (
        <AppointmentCalendar appointments={appointments} />
      ) : (
        <div className="space-y-4">
          {appointments.map((appointment) => (
            <AppointmentCard
              key={appointment.id}
              appointment={appointment}
              onCancel={handleCancel}
            />
          ))}
        </div>
      )}
    </div>
  );
}
