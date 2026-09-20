import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/contexts/auth-context";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata: Metadata = {
  title: "CITA AI - Gestión de Citas",
  description: "Sistema de gestión de citas y turnos para profesionales y pequeños negocios",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="h-full">
      <body className="h-full antialiased">
        <AuthProvider>
          {children}
          <SpeedInsights />
        </AuthProvider>
      </body>
    </html>
  );
}