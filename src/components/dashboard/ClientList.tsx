"use client";
import React from "react";
import { Mail, Phone, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Client {
  id: string;
  name: string;
  email: string;
  phone?: string;
}

interface ClientListProps {
  clients: Client[];
}

export function ClientList({ clients }: ClientListProps) {
  if (clients.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center border-2 border-dashed rounded-xl bg-slate-50/50">
        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
          <Users className="w-8 h-8 text-slate-400" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900">Aún no tienes clientes</h3>
        <p className="text-muted-foreground max-w-sm mt-2">
          ¡Comparte tu enlace de reserva para empezar a recibir citas!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {clients.map((client) => (
        <div
          key={client.id}
          className="flex items-center justify-between p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors group"
        >
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center">
              <span className="text-white font-semibold">
                {client.name.split(" ").map((n) => n[0]).join("")}
              </span>
            </div>
            <div>
              <p className="font-semibold">{client.name}</p>
              <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 mt-1">
                <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                  <Mail className="w-3 h-3" />
                  <span>{client.email}</span>
                </div>
                {client.phone && (
                  <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                    <Phone className="w-3 h-3" />
                    <span>{client.phone}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={() => window.open(`mailto:${client.email}`)}>
              Contactar
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
