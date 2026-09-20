"use client";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Calendar } from "lucide-react";
import { LoginForm } from "@/components/auth/LoginForm";
import { RegisterForm } from "@/components/auth/RegisterForm";

export default function LoginPage() {
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-100 via-indigo-100 to-pink-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Elementos decorativos de fondo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 w-full max-w-md animate-fade-in">
        <Card className="shadow-soft border-0 backdrop-blur-sm bg-white/95 dark:bg-gray-800/90 border-purple-100/50">
          <CardHeader className="space-y-3 text-center pb-6">
            <div className="mx-auto w-16 h-16 rounded-full gradient-primary flex items-center justify-center shadow-glow mb-2">
              <Calendar className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              CITA AI
            </CardTitle>
            <CardDescription className="text-base">
              {isSignUp ? "Crea tu cuenta profesional" : "Gestión inteligente de citas y turnos"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isSignUp ? <RegisterForm /> : <LoginForm />}
          </CardContent>
          <CardFooter className="flex flex-col space-y-2 text-center pb-6">
             <div className="text-sm text-muted-foreground">
              {isSignUp ? "¿Ya tienes una cuenta?" : "¿No tienes cuenta aún?"}{" "}
              <button
                type="button"
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-primary font-semibold hover:underline focus:outline-none"
              >
                {isSignUp ? "Inicia Sesión" : "Regístrate gratis"}
              </button>
            </div>
            {!isSignUp && (
               <p className="text-xs text-muted-foreground pt-2">
                 Demo: Registra un usuario nuevo para probar.
               </p>
            )}
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}