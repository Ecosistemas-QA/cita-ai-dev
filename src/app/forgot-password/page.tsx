"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Calendar, Loader2, ArrowLeft, MailCheck } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { validateEmail } from "@/lib/validations/auth";

export default function ForgotPasswordPage() {
  const supabase = createClient();
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState("");

  const handleResetRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const emailError = validateEmail(email);
    if (emailError) {
      setError(emailError);
      setIsLoading(false);
      return;
    }

    try {
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/api/auth/callback?next=/reset-password`,
      });

      if (resetError) throw resetError;

      setIsSent(true);
    } catch (err: any) {
      setError(err.message || "Ocurrió un error al procesar tu solicitud.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-100 via-indigo-100 to-pink-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      </div>

      <div className="relative z-10 w-full max-w-md animate-fade-in">
        <Card className="shadow-soft border-0 backdrop-blur-sm bg-white/95 dark:bg-gray-800/90">
          <CardHeader className="space-y-3 text-center pb-6">
            <div className="mx-auto w-16 h-16 rounded-full gradient-primary flex items-center justify-center shadow-glow mb-2">
              <Calendar className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              CITA AI
            </CardTitle>
            <CardDescription className="text-base">
              Recuperación de contraseña
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isSent ? (
              <div className="text-center space-y-4 animate-scale-in">
                <div className="mx-auto w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                  <MailCheck className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Email enviado</h3>
                <p className="text-sm text-muted-foreground">
                  Si <strong>{email}</strong> está registrado, recibirás un enlace para restablecer tu contraseña en unos minutos.
                </p>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/login">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Volver al Login
                  </Link>
                </Button>
              </div>
            ) : (
              <form onSubmit={handleResetRequest} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-semibold">
                    Tu Correo Electrónico
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="tu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="h-11 transition-all focus:ring-2 focus:ring-primary/20"
                  />
                  <p className="text-xs text-muted-foreground">
                    Te enviaremos un link seguro para cambiar tu clave.
                  </p>
                </div>

                {error && (
                  <div className="text-sm text-red-500 font-medium text-center bg-red-50 p-2 rounded">
                    {error}
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-11 text-base font-semibold gradient-primary hover:opacity-90 transition-all shadow-md hover:shadow-lg"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    "Enviar enlace"
                  )}
                </Button>
              </form>
            )}
          </CardContent>
          <CardFooter className="flex flex-col space-y-2 text-center pb-6">
            <Link
              href="/login"
              className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center"
            >
              <ArrowLeft className="mr-1 h-3 w-3" /> Volver al inicio de sesión
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
