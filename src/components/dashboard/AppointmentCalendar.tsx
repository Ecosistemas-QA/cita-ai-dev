"use client";

import React, { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatAppointmentDate, getDateKeyInTimeZone } from "@/lib/utils/datetime";

interface Appointment {
  id: string;
  start_time: string;
  clients: {
    name: string;
    email: string;
  };
}

interface AppointmentCalendarProps {
  appointments: Appointment[];
}

const WEEKDAYS = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

export function AppointmentCalendar({ appointments }: AppointmentCalendarProps) {
  const firstDateKey = appointments[0]
    ? getDateKeyInTimeZone(appointments[0].start_time)
    : getDateKeyInTimeZone(new Date());
  const [year, month] = firstDateKey.split("-").map(Number);
  const [visibleMonth, setVisibleMonth] = useState(() => new Date(Date.UTC(year, month - 1, 1)));

  const appointmentsByDate = useMemo(() => {
    const grouped = new Map<string, Appointment[]>();
    appointments.forEach((appointment) => {
      const dateKey = getDateKeyInTimeZone(appointment.start_time);
      grouped.set(dateKey, [...(grouped.get(dateKey) || []), appointment]);
    });
    return grouped;
  }, [appointments]);

  const visibleYear = visibleMonth.getUTCFullYear();
  const visibleMonthIndex = visibleMonth.getUTCMonth();
  const leadingDays = new Date(Date.UTC(visibleYear, visibleMonthIndex, 1)).getUTCDay();
  const daysInMonth = new Date(Date.UTC(visibleYear, visibleMonthIndex + 1, 0)).getUTCDate();
  const cells = Array.from({ length: leadingDays + daysInMonth }, (_, index) => {
    const day = index - leadingDays + 1;
    return day > 0 ? day : null;
  });
  const monthLabel = new Intl.DateTimeFormat("es-AR", {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(visibleMonth);

  const changeMonth = (offset: number) => {
    setVisibleMonth(new Date(Date.UTC(visibleYear, visibleMonthIndex + offset, 1)));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Button variant="outline" size="icon" onClick={() => changeMonth(-1)} aria-label="Mes anterior">
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <h3 className="text-lg font-semibold capitalize">{monthLabel}</h3>
        <Button variant="outline" size="icon" onClick={() => changeMonth(2)} aria-label="Mes siguiente">
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      <div className="grid grid-cols-7 overflow-hidden rounded-lg border border-slate-200 bg-slate-200 gap-px">
        {WEEKDAYS.map((weekday) => (
          <div key={weekday} className="bg-slate-50 px-1 py-2 text-center text-xs font-semibold text-slate-500">
            {weekday}
          </div>
        ))}

        {cells.map((day, index) => {
          if (!day) {
            return <div key={`empty-${index}`} className="min-h-24 bg-white" aria-hidden="true" />;
          }

          const dateKey = `${visibleYear}-${String(visibleMonthIndex + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
          const dayAppointments = appointmentsByDate.get(dateKey) || [];

          return (
            <div key={dateKey} className="min-h-24 bg-white p-1.5 sm:p-2">
              <span className="text-xs font-semibold text-slate-600">{day}</span>
              <div className="mt-1 space-y-1">
                {dayAppointments.map((appointment) => (
                  <div
                    key={appointment.id}
                    className="rounded bg-indigo-50 px-1.5 py-1 text-[11px] leading-tight text-indigo-900"
                    title={`${appointment.clients.name} - ${appointment.clients.email}`}
                  >
                    <span className="font-bold">
                      {formatAppointmentDate(appointment.start_time, {
                        hour: "2-digit",
                        minute: "2-digit",
                        hourCycle: "h23",
                      })}
                    </span>
                    <span className="ml-1 hidden truncate sm:inline">{appointment.clients.name}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
