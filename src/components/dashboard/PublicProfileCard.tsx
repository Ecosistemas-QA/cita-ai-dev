"use client";

import { useEffect, useState } from "react";
import { Check, Copy, ExternalLink, Link2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface PublicProfileCardProps {
  slug: string | null;
}

export function PublicProfileCard({ slug }: PublicProfileCardProps) {
  const publicPath = slug ? `/${slug}` : "";
  const [publicUrl, setPublicUrl] = useState(publicPath);
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "error">("idle");

  useEffect(() => {
    if (publicPath) {
      setPublicUrl(new URL(publicPath, window.location.origin).toString());
    }
  }, [publicPath]);

  async function copyPublicUrl() {
    try {
      const url = new URL(publicPath, window.location.origin).toString();
      await navigator.clipboard.writeText(url);
      setCopyStatus("copied");
    } catch {
      setCopyStatus("error");
    }
  }

  if (!slug) {
    return (
      <Card className="border-amber-200 bg-amber-50/80 shadow-sm">
        <CardContent className="flex items-start gap-3 p-5">
          <Link2 className="mt-0.5 h-5 w-5 shrink-0 text-amber-700" />
          <div>
            <h2 className="font-semibold text-amber-950">Perfil público no disponible</h2>
            <p className="mt-1 text-sm text-amber-800">
              No pudimos encontrar tu slug. Contacta a soporte antes de compartir tu agenda.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden border-purple-100 bg-gradient-to-r from-white via-purple-50/70 to-indigo-50/80 shadow-md">
      <CardContent className="flex flex-col gap-5 p-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex min-w-0 items-start gap-4 lg:flex-1">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-purple-600 to-indigo-600 text-white shadow-sm">
            <Link2 className="h-5 w-5" />
          </div>
          <div className="min-w-0">
            <h2 className="font-semibold text-gray-950">Tu enlace público de reservas</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Compártelo con tus clientes para que puedan consultar horarios y reservar.
            </p>
            <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-center">
              <label className="sr-only" htmlFor="public-profile-url">
                URL pública de reservas
              </label>
              <input
                id="public-profile-url"
                className="h-9 w-full min-w-0 flex-1 rounded-md sm:min-w-[18rem] border border-purple-200 bg-white px-3 font-mono text-sm text-gray-700 outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
                onFocus={(event) => event.currentTarget.select()}
                readOnly
                value={publicUrl}
              />
              <span className="w-fit rounded-full bg-purple-100 px-2.5 py-1 text-xs font-medium text-purple-700">
                Slug: {slug}
              </span>
            </div>
            <p aria-live="polite" className="mt-2 min-h-5 text-xs text-muted-foreground">
              {copyStatus === "copied" && "Enlace copiado al portapapeles."}
              {copyStatus === "error" && "No se pudo copiar. Selecciona el enlace manualmente."}
            </p>
          </div>
        </div>

        <div className="flex shrink-0 flex-wrap gap-2 lg:justify-end">
          <Button asChild variant="outline">
            <a href={publicPath} rel="noreferrer" target="_blank">
              <ExternalLink className="mr-2 h-4 w-4" />
              Abrir perfil
            </a>
          </Button>
          <Button onClick={copyPublicUrl} type="button">
            {copyStatus === "copied" ? (
              <Check className="mr-2 h-4 w-4" />
            ) : (
              <Copy className="mr-2 h-4 w-4" />
            )}
            {copyStatus === "copied" ? "Copiado" : "Copiar enlace"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
