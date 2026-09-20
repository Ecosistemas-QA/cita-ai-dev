import Link from "next/link";
import { ArrowLeft, Mail, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50 px-4 py-16">
      <Card className="mx-auto max-w-xl border-amber-200 shadow-xl">
        <CardHeader className="space-y-4 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-amber-100 text-amber-700">
            <Sparkles className="h-7 w-7" />
          </div>
          <CardTitle className="text-3xl">Planes para seguir creciendo</CardTitle>
          <CardDescription className="text-base">
            Contactanos para conocer las opciones disponibles cuando alcances el límite del plan gratuito.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button className="w-full bg-amber-600 hover:bg-amber-700" asChild>
            <a href="mailto:soporte@cita.ai?subject=Información sobre planes de Cita.ai">
              <Mail className="mr-2 h-4 w-4" />
              Escribir a soporte
            </a>
          </Button>
          <Button variant="ghost" className="w-full" asChild>
            <Link href="/dashboard">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver al panel
            </Link>
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}
