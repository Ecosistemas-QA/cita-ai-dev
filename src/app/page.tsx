import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock, CheckCircle, Smartphone, ArrowRight, Star } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-gray-900">
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary/10 text-primary hover:bg-primary/20 mb-8">
            <Star className="w-3 h-3 mr-1" />
            La forma más simple de gestionar tus citas
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 bg-clip-text text-transparent pb-2">
            Tu tiempo es oro.<br />
            Deja de perderlo agendando.
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            Elimina el caos de WhatsApp y las llamadas. Cita.ai permite que tus clientes reserven automáticamente 24/7 en tu calendario personalizado.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/login">
              <Button size="lg" className="h-12 px-8 text-lg bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-90 shadow-lg hover:shadow-xl transition-all">
                Comenzar Gratis
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="h-12 px-8 text-lg">
              Ver Demo en Vivo
            </Button>
          </div>
          
          <div className="mt-12 text-sm text-muted-foreground">
            <span className="mr-4">✓ Sin tarjeta de crédito</span>
            <span className="mr-4">✓ Configuración en 2 min</span>
            <span>✓ Plan gratuito para siempre</span>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Todo lo que necesitas, nada que te sobre</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Diseñado específicamente para profesionales independientes que quieren enfocarse en su servicio, no en ser secretarias.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-soft hover:shadow-md transition-all">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mb-4">
                  <Calendar className="w-6 h-6 text-purple-600" />
                </div>
                <CardTitle>Agenda 24/7</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Tu calendario está abierto incluso cuando tú duermes. Los clientes ven tu disponibilidad real y reservan sin esperas.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-soft hover:shadow-md transition-all">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center mb-4">
                  <CheckCircle className="w-6 h-6 text-indigo-600" />
                </div>
                <CardTitle>Cero Dobles Reservas</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Olvídate de los errores humanos. El sistema bloquea automáticamente los horarios ocupados, garantizando paz mental.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-soft hover:shadow-md transition-all">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-pink-100 dark:bg-pink-900/30 flex items-center justify-center mb-4">
                  <Smartphone className="w-6 h-6 text-pink-600" />
                </div>
                <CardTitle>Tu Enlace Único</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Comparte tu link `cita.ai/tu-nombre` en Instagram, WhatsApp o TikTok. Es tu tarjeta de presentación profesional.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Social Proof / Stats */}
      <section className="py-20 bg-slate-50 dark:bg-gray-800/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-primary mb-2">10k+</div>
              <p className="text-muted-foreground">Citas Agendadas</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">500+</div>
              <p className="text-muted-foreground">Profesionales</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">30h</div>
              <p className="text-muted-foreground">Ahorradas al mes</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">0</div>
              <p className="text-muted-foreground">Errores de agenda</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-24">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">¿Listo para recuperar tu tiempo?</h2>
          <p className="text-xl text-muted-foreground mb-10">
            Únete a cientos de terapeutas, entrenadores y estilistas que ya usan Cita.ai.
          </p>
          <Link href="/login">
            <Button size="lg" className="h-14 px-10 text-xl bg-gradient-to-r from-purple-600 to-indigo-600 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all">
              Crear mi cuenta gratis
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
          <p>© 2026 Cita.ai. Todos los derechos reservados.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link href="#" className="hover:text-primary">Términos</Link>
            <Link href="#" className="hover:text-primary">Privacidad</Link>
            <Link href="#" className="hover:text-primary">Contacto</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
