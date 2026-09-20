"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Trash2, CalendarOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { formatAppointmentDate } from "@/lib/utils/datetime";

interface TimeBlock {
  id: string;
  start_time: string;
  end_time: string;
  reason: string | null;
}

interface TimeBlockListProps {
  blocks: TimeBlock[];
}

export function TimeBlockList({ blocks }: TimeBlockListProps) {
  const router = useRouter();

  const handleDelete = async (id: string) => {
    if (!confirm("¿Estás seguro de eliminar este bloqueo?")) return;

    try {
      const response = await fetch(`/api/availability/blocks?id=${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error("Error al eliminar");
      router.refresh();
    } catch (error: any) {
      alert(error.message);
    }
  };

  if (blocks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center text-muted-foreground border-2 border-dashed rounded-lg">
        <CalendarOff className="w-8 h-8 mb-2 opacity-20" />
        <p>No hay bloqueos activos</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {blocks.map((block) => (
        <div key={block.id} className="flex items-center justify-between p-3 rounded-md bg-slate-50 dark:bg-slate-800/50 border">
          <div className="text-sm">
            <p className="font-semibold text-gray-900 dark:text-white">
              {block.reason || "Bloqueo manual"}
            </p>
            <p className="text-xs text-muted-foreground">
              {formatAppointmentDate(block.start_time, {
                dateStyle: "short",
                timeStyle: "short",
              })} - {formatAppointmentDate(block.end_time, {
                dateStyle: "short",
                timeStyle: "short",
              })}
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => handleDelete(block.id)}
            className="text-red-500 hover:text-red-700 hover:bg-red-50"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      ))}
    </div>
  );
}
