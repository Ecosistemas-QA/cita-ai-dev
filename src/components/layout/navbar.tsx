"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Calendar, LogOut, User } from "lucide-react";
import { useAuth } from "@/contexts/auth-context";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const { user, signOut } = useAuth();

  const routes = [
    {
      href: "/dashboard",
      label: "Dashboard",
      active: pathname === "/dashboard",
    },
    {
      href: "/dashboard/availability",
      label: "Disponibilidad",
      active: pathname === "/dashboard/availability",
    },
    {
      href: "/dashboard/clients",
      label: "Clientes",
      active: pathname === "/dashboard/clients",
    },
  ];

  return (
    <nav className="border-b bg-white/75 backdrop-blur-lg sticky top-0 z-50">
      <div className="flex h-16 items-center px-4 container mx-auto max-w-7xl">
        <Link href="/" className="flex items-center gap-2 mr-6">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center">
            <Calendar className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-xl bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
            Cita.ai
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-4 lg:space-x-6 mx-6">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                route.active ? "text-black dark:text-white" : "text-muted-foreground"
              )}
            >
              {route.label}
            </Link>
          ))}
        </div>

        <div className="ml-auto flex items-center space-x-4">
          {user ? (
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground hidden md:inline-block">
                {user.email}
              </span>
              <Button variant="ghost" size="sm" onClick={() => signOut()}>
                <LogOut className="w-4 h-4 mr-2" />
                Salir
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/login">
                <Button variant="ghost" size="sm">
                  Iniciar Sesión
                </Button>
              </Link>
              <Link href="/login">
                <Button size="sm" className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-90">
                  Registrarse Gratis
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
