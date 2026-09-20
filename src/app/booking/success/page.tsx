"use client";
import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Calendar, Clock, Mail, User } from "lucide-react";
import Link from "next/link";
import { format, parseISO } from "date-fns";
import { es } from "date-fns/locale";

function SuccessContent() {
  const searchParams = useSearchParams();
  const date = searchParams.get("date");
  const time = searchParams.get("time");
  const professional = searchParams.get("professional");

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full animate-in fade-in zoom-in duration-500">
        <Card className="border-0 shadow-2xl overflow-hidden">
          <div className="h-2 bg-green-500 w-full" />
          <CardHeader className="text-center pb-2">
            <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle2 className="w-12 h-12 text-green-600" />
            </div>
            <CardTitle className="text-3xl font-bold text-gray-900">¡Cita Confirmada!</CardTitle>
            <CardDescription className="text-lg">Tu reserva se ha realizado con éxito.</CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6 pt-6">
            <div className="bg-slate-50 rounded-xl p-6 border border-slate-100 space-y-4">
              <div className="flex items-center space-x-4">
                <div className="bg-white p-2 rounded-lg shadow-sm">
                  <User className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground uppercase tracking-wider font-semibold">Profesional</p>
                  <p className="text-lg font-bold text-gray-800">{professional || "---"}</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="bg-white p-2 rounded-lg shadow-sm">
                  <Calendar className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground uppercase tracking-wider font-semibold">Fecha</p>
                  <p className="text-lg font-bold text-gray-800">
                    {date ? format(parseISO(date), "eeee d 'de' MMMM", { locale: es }) : "---"}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="bg-white p-2 rounded-lg shadow-sm">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground uppercase tracking-wider font-semibold">Hora</p>
                  <p className="text-lg font-bold text-gray-800">{time || "--:--"} hs</p>
                </div>
              </div>
            </div>

            <div className="flex items-start p-4 bg-blue-50 rounded-lg text-blue-800 text-sm">
              <Mail className="w-5 h-5 mr-3 mt-0.5 shrink-0 opacity-70" />
              <p>
                Te hemos enviado un email de confirmación. Revisa tu bandeja de entrada (y la carpeta de spam).
              </p>
            </div>
          </CardContent>

          <CardFooter className="bg-slate-50 border-t p-6 flex flex-col space-y-3">
            <Button className="w-full h-12 text-lg font-bold gradient-primary" asChild>
              <Link href="/">
                Ir al inicio
              </Link>
            </Button>
            <p className="text-xs text-center text-muted-foreground">
              ¿Necesitas hacer cambios? Revisa el link de cancelación en tu correo.
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

export default function BookingSuccessPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Cargando...</div>}>
      <SuccessContent />
    </Suspense>
  );
}
