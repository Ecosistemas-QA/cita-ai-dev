"use client";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, Calendar, XCircle, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatAppointmentDate } from "@/lib/utils/datetime";

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

interface AppointmentCardProps {
  appointment: Appointment;
  onCancel?: (id: string) => void;
}

export function AppointmentCard({ appointment, onCancel }: AppointmentCardProps) {
  const clientName = appointment.clients.name;
  const clientInitial = clientName.charAt(0).toUpperCase();

  return (
    <Card className="border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
      <CardContent className="p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="h-12 w-12 rounded-full bg-gradient-to-br from-purple-100 to-indigo-100 flex items-center justify-center text-purple-600 font-bold text-lg shrink-0">
            {clientInitial}
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white">{clientName}</h4>
            <div className="flex items-center text-sm text-muted-foreground space-x-3 mt-1">
              <span className="flex items-center">
                <Calendar className="w-3 h-3 mr-1" />
                {formatAppointmentDate(appointment.start_time, {
                  day: "numeric",
                  month: "long",
                })}
              </span>
              <span className="flex items-center">
                <Clock className="w-3 h-3 mr-1" />
                {formatAppointmentDate(appointment.start_time, {
                  hour: "2-digit",
                  minute: "2-digit",
                  hourCycle: "h23",
                })}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2 w-full sm:w-auto">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1 sm:flex-none"
            onClick={() => window.open(`mailto:${appointment.clients.email}`)}
          >
            <Mail className="w-4 h-4 mr-2" />
            Contactar
          </Button>
          
          {onCancel && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="flex-1 sm:flex-none text-red-600 hover:text-red-700 hover:bg-red-50"
              onClick={() => onCancel(appointment.id)}
            >
              <XCircle className="w-4 h-4 mr-2" />
              Cancelar
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
