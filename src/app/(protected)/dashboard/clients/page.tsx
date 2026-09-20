import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { ClientList } from "@/components/dashboard/ClientList";
import { getProfessionalClients } from "@/lib/supabase/clients";

export default async function ClientsPage() {
  const clients = await getProfessionalClients();

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-2">
            Mis Clientes
          </h1>
          <p className="text-muted-foreground">Gestiona tu base de datos de clientes</p>
        </div>
        {/* Placeholder for future functionality */}
        <Button className="gradient-primary hover:opacity-90 shadow-md opacity-50 cursor-not-allowed">
          <Plus className="w-4 h-4 mr-2" />
          Nuevo Cliente
        </Button>
      </div>

      <Card className="border-0 shadow-soft bg-white/90 backdrop-blur-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl">Lista de Clientes</CardTitle>
              <CardDescription>
                {clients.length} clientes registrados
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <ClientList clients={clients} />
        </CardContent>
      </Card>
    </div>
  );
}