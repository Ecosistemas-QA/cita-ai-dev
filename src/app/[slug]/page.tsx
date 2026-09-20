import React from "react";
import { notFound } from "next/navigation";
import { getPublicProfessionalBySlug } from "@/lib/supabase/professionals";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Calendar, Clock, MapPin, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";

import { BookingCalendar } from "@/components/booking/BookingCalendar";

interface PublicProfilePageProps {
  params: {
    slug: string;
  };
}

export default async function PublicProfilePage({ params }: PublicProfilePageProps) {
  const { slug } = params;
  const professional = await getPublicProfessionalBySlug(slug);

  if (!professional) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-gray-900 pb-12">
      {/* Header / Banner Simple */}
      <div className="h-48 bg-gradient-to-r from-purple-600 to-indigo-600 w-full" />
      
      <div className="max-w-4xl mx-auto px-4 -mt-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Sidebar Info */}
          <div className="md:col-span-1 space-y-6">
            <Card className="shadow-lg border-0 overflow-hidden">
              <div className="aspect-square bg-slate-200 flex items-center justify-center text-4xl font-bold text-slate-400">
                {professional.name.charAt(0)}
              </div>
              <CardContent className="p-6">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                  {professional.name}
                </h1>
                <p className="text-sm text-muted-foreground mb-4">Profesional verificado</p>
                
                <div className="space-y-3 text-sm">
                  <div className="flex items-center text-gray-600 dark:text-gray-300">
                    <Clock className="w-4 h-4 mr-2 text-primary" />
                    Sesiones de {professional.appointment_duration_minutes || 60} min
                  </div>
                  <div className="flex items-center text-gray-600 dark:text-gray-300">
                    <MapPin className="w-4 h-4 mr-2 text-primary" />
                    Atención Online / Presencial
                  </div>
                </div>

                <Button variant="outline" className="w-full mt-6" size="sm">
                  <Share2 className="w-4 h-4 mr-2" /> Compartir perfil
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Main Booking Area */}
          <div className="md:col-span-2 space-y-6">
            <Card className="shadow-lg border-0 min-h-[400px]">
              <CardHeader className="border-b bg-white/50 dark:bg-gray-800/50">
                <CardTitle className="text-xl">Agenda tu Cita</CardTitle>
                <CardDescription>Selecciona un día y horario para comenzar tu reserva.</CardDescription>
              </CardHeader>
              <CardContent className="p-6 sm:p-8">
                <BookingCalendar professionalId={professional.id} />
              </CardContent>
            </Card>
          </div>

        </div>
      </div>
    </div>
  );
}