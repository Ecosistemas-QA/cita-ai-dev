
"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Calendar, Users, Settings, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Disponibilidad", href: "/dashboard/availability", icon: Calendar },
  { name: "Clientes", href: "/dashboard/clients", icon: Users },
  { name: "Configuración", href: "/dashboard/settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 h-full flex flex-col bg-gradient-to-b from-white/95 to-purple-50/30 dark:from-gray-900 dark:to-gray-800 border-r border-purple-100/50 dark:border-gray-700 shadow-sm backdrop-blur-sm">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center shadow-md">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              CITA AI
            </h1>
            <p className="text-xs text-muted-foreground">Gestión de Citas</p>
          </div>
        </div>
      </div>
      <nav className="mt-6 px-3">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 group",
                    {
                      "gradient-primary text-white shadow-md": isActive,
                      "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800": !isActive,
                    }
                  )}
                >
                  <item.icon
                    className={cn(
                      "w-5 h-5 transition-transform group-hover:scale-110",
                      {
                        "text-white": isActive,
                        "text-gray-500 dark:text-gray-400 group-hover:text-primary": !isActive,
                      }
                    )}
                  />
                  <span className="ml-3">{item.name}</span>
                  {isActive && (
                    <div className="ml-auto w-1.5 h-1.5 rounded-full bg-white/80"></div>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className="mt-auto p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="px-3 py-2 rounded-lg bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20">
          <p className="text-xs font-semibold text-gray-700 dark:text-gray-300">Versión MVP</p>
          <p className="text-xs text-muted-foreground mt-0.5">Demo en desarrollo</p>
        </div>
      </div>
    </aside>
  );
}
