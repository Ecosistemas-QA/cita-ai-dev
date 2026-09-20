import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Clock, Settings, CalendarOff } from "lucide-react";
import { WeeklyScheduleForm } from "@/components/dashboard/availability/WeeklyScheduleForm";
import { DurationSettings } from "@/components/dashboard/availability/DurationSettings";
import { TimeBlockForm } from "@/components/dashboard/availability/TimeBlockForm";
import { TimeBlockList } from "@/components/dashboard/availability/TimeBlockList";
import { getAvailabilityData } from "@/lib/supabase/availability";

export default async function AvailabilityPage() {
  const { schedule, duration, blocks } = await getAvailabilityData();

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      <div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-2">
          Gestionar Disponibilidad
        </h1>
        <p className="text-muted-foreground">Define tus horas de trabajo y excepciones (vacaciones, citas personales)</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Columna Izquierda: Configuración y Bloqueos */}
        <div className="lg:col-span-4 space-y-6">
          <Card className="border-0 shadow-soft bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Settings className="h-5 w-5 text-primary" />
                <CardTitle className="text-xl">Configuración General</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <DurationSettings initialDuration={duration} />
            </CardContent>
          </Card>

          <Card className="border-0 shadow-soft bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <CalendarOff className="h-5 w-5 text-primary" />
                <CardTitle className="text-xl">Bloqueos de Tiempo</CardTitle>
              </div>
              <CardDescription>Añade excepciones a tu horario regular</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <TimeBlockForm />
              <div className="pt-4 border-t">
                <h4 className="text-sm font-semibold mb-3">Bloqueos Activos</h4>
                <TimeBlockList blocks={blocks} />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Columna Derecha: Horario Semanal */}
        <div className="lg:col-span-8">
          <Card className="border-0 shadow-soft bg-white/90 backdrop-blur-sm min-h-full">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-primary" />
                <CardTitle className="text-2xl">Horario Semanal Recurrente</CardTitle>
              </div>
              <CardDescription>
                Configura tus horarios de disponibilidad estándar para cada día
              </CardDescription>
            </CardHeader>
            <CardContent>
              <WeeklyScheduleForm initialSchedule={schedule.length > 0 ? schedule : undefined} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}