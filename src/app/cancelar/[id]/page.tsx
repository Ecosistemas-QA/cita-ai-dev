import React from "react";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Calendar, Clock, AlertTriangle, User } from "lucide-react";
import { CancelButton } from "./CancelButton"; // Client component
import { formatAppointmentDate } from "@/lib/utils/datetime";

interface CancelPageProps {
  params: {
    id: string;
  };
}

async function getAppointment(id: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("appointments")
    .select(`
      id,
      start_time,
      status,
      professionals (
        name
      )
    `)
    .eq("id", id)
    .single();

  if (error || !data) return null;
  return data;
}

export default async function CancelPage({ params }: CancelPageProps) {
  const appointment = await getAppointment(params.id);

  if (!appointment) {
    notFound();
  }

  if (appointment.status === 'cancelled') {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <Card className="max-w-md w-full border-0 shadow-xl">
          <CardContent className="pt-6 text-center space-y-4">
            <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
              <Calendar className="w-8 h-8 text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Cita ya cancelada</h2>
            <p className="text-muted-foreground">
              Esta reserva ya ha sido anulada anteriormente. No se requiere ninguna acción adicional.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-red-50 flex items-center justify-center p-4">
      <Card className="max-w-md w-full border-0 shadow-2xl overflow-hidden">
        <div className="h-2 bg-red-500 w-full" />
        <CardHeader className="text-center pb-2">
          <div className="mx-auto w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-4">
            <AlertTriangle className="w-10 h-10 text-red-600" />
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">¿Cancelar Cita?</CardTitle>
          <CardDescription className="text-base">
            Estás a punto de cancelar tu reserva con <strong>{appointment.professionals.name}</strong>.
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6 pt-6">
          <div className="bg-white rounded-xl p-4 border border-slate-200 space-y-3">
            <div className="flex items-center text-gray-700">
              <Calendar className="w-5 h-5 mr-3 text-primary" />
              <span className="font-semibold">
                {formatAppointmentDate(appointment.start_time, {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                })}
              </span>
            </div>
            <div className="flex items-center text-gray-700">
              <Clock className="w-5 h-5 mr-3 text-primary" />
              <span className="font-semibold">
                {formatAppointmentDate(appointment.start_time, {
                  hour: "2-digit",
                  minute: "2-digit",
                  hourCycle: "h23",
                })} hs
              </span>
            </div>
          </div>
          
          <p className="text-sm text-center text-muted-foreground">
            Esta acción no se puede deshacer. El horario quedará libre para otros clientes.
          </p>
        </CardContent>

        <CardFooter className="bg-slate-50 border-t p-6">
          <CancelButton appointmentId={appointment.id} />
        </CardFooter>
      </Card>
    </div>
  );
}
