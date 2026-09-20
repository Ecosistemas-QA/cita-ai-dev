"use client";
import React from "react";
import { Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function UpgradeBanner() {
  return (
    <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-lg p-4 flex flex-col sm:flex-row items-center justify-between gap-4 animate-in slide-in-from-top-4 duration-500">
      <div className="flex items-center space-x-3">
        <div className="bg-amber-100 p-2 rounded-full text-amber-600">
          <Sparkles className="w-5 h-5" />
        </div>
        <div>
          <h4 className="font-bold text-amber-900">¡Límite de clientes alcanzado!</h4>
          <p className="text-sm text-amber-700">
            Has llegado a los 10 clientes del plan gratuito. Actualiza a Pro para seguir creciendo.
          </p>
        </div>
      </div>
      <Button 
        size="sm" 
        className="bg-amber-600 hover:bg-amber-700 text-white border-0 shadow-sm shrink-0 w-full sm:w-auto"
        asChild
      >
        <Link href="/contacto?motivo=planes">
          Solicitar información <ArrowRight className="w-4 h-4 ml-2" />
        </Link>
      </Button>
    </div>
  );
}
