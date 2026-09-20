"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

interface CancelButtonProps {
  appointmentId: string;
}

export function CancelButton({ appointmentId }: CancelButtonProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleConfirm = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/public/appointments/${appointmentId}/cancel`, {
        method: "POST",
      });

      if (!response.ok) throw new Error("Error al cancelar");

      alert("Cita cancelada correctamente.");
      router.refresh(); // Recargará la página y mostrará el estado "Ya cancelada"
    } catch (error) {
      alert("Hubo un problema al cancelar la cita. Intenta nuevamente.");
      setIsLoading(false);
    }
  };

  return (
    <Button 
      variant="destructive" 
      className="w-full h-12 text-lg font-bold shadow-lg hover:shadow-xl transition-all"
      onClick={handleConfirm}
      disabled={isLoading}
    >
      {isLoading ? (
        <>
          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
          Procesando...
        </>
      ) : (
        "Confirmar Cancelación"
      )}
    </Button>
  );
}
