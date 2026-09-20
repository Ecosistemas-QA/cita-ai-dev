"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Calendar, Loader2, AlertCircle, ArrowLeft } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { validatePassword } from "@/lib/validations/auth";
import { Suspense } from "react";

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const supabase = createClient();
  
  const [isLoading, setIsLoading] = useState(false);
  const [isVerifying, setIsVerifying] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [sessionActive, setSessionActive] = useState(false);

  useEffect(() => {
    async function checkSession() {
      // 1. Check for errors in URL (from Supabase redirect)
      const errorParam = searchParams.get('error_description') || searchParams.get('error');
      if (errorParam) {
        setError("El enlace de recuperación es inválido o ha expirado. Por favor, solicita uno nuevo.");
        setIsVerifying(false);
        return;
      }

      // 2. Check if we have an active session
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        setError("No hay una sesión activa de recuperación. Por favor, solicita un nuevo enlace.");
        setSessionActive(false);
      } else {
        setSessionActive(true);
      }
      setIsVerifying(false);
    }

    checkSession();
  }, [searchParams, supabase.auth]);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const passError = validatePassword(password);
    if (passError) {
      setError(passError);
      setIsLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      setIsLoading(false);
      return;
    }

    try {
      const { error: updateError } = await supabase.auth.updateUser({
        password: password,
      });

      if (updateError) throw updateError;

      alert("Tu contraseña ha sido actualizada con éxito.");
      router.push("/login");
    } catch (err: any) {
      setError(err.message || "No se pudo actualizar la contraseña.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isVerifying) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-100 via-indigo-100 to-pink-100">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-100 via-indigo-100 to-pink-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="relative z-10 w-full max-w-md animate-fade-in">
        <Card className="shadow-soft border-0 backdrop-blur-sm bg-white/95 dark:bg-gray-800/90">
          <CardHeader className="space-y-3 text-center pb-6">
            <div className="mx-auto w-16 h-16 rounded-full gradient-primary flex items-center justify-center shadow-glow mb-2">
              <Calendar className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              CITA AI
            </CardTitle>
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              CITA AI
            </CardTitle>
            <CardDescription className="text-base">
              Establecer nueva contraseña
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!sessionActive && error ? (
              <div className="text-center space-y-4 py-4">
                <div className="mx-auto w-12 h-12 rounded-full bg-red-100 flex items-center justify-center text-red-600">
                  <AlertCircle className="w-6 h-6" />
                </div>
                <p className="text-sm font-medium text-red-600 bg-red-50 p-3 rounded">
                  {error}
                </p>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/forgot-password">
                    Solicitar nuevo enlace
                  </Link>
                </Button>
              </div>
            ) : (
              <form onSubmit={handleReset} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-semibold">
                    Nueva Contraseña
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="h-11 transition-all focus:ring-2 focus:ring-primary/20"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-sm font-semibold">
                    Confirmar Contraseña
                  </Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="h-11 transition-all focus:ring-2 focus:ring-primary/20"
                  />
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
                      Guardando...
                    </>
                  ) : (
                    "Actualizar Contraseña"
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

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-100 via-indigo-100 to-pink-100">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    }>
      <ResetPasswordForm />
    </Suspense>
  );
}
