"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { validateEmail, validatePassword, validateName } from "@/lib/validations/auth";
import { generateSlug } from "@/lib/utils/slug";

export function RegisterForm() {
  const router = useRouter();
  const supabase = createClient();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    // Validaciones
    const nameError = validateName(formData.name);
    const emailError = validateEmail(formData.email);
    const passError = validatePassword(formData.password);

    if (nameError || emailError || passError) {
      setError(nameError || emailError || passError);
      setIsLoading(false);
      return;
    }

    try {
      const baseSlug = generateSlug(formData.name);
      let slug = baseSlug;
      let suffix = 2;

      while (suffix <= 100) {
        const { data: existingProfile, error: slugError } = await supabase
          .from("professionals")
          .select("id")
          .eq("slug", slug)
          .maybeSingle();

        if (slugError) throw slugError;
        if (!existingProfile) break;

        slug = `${baseSlug}-${suffix}`;
        suffix += 1;
      }

      const { data, error: signUpError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          emailRedirectTo: `${window.location.origin}/api/auth/callback`,
          data: {
            full_name: formData.name,
            slug: slug,
          },
        },
      });

      if (signUpError) throw signUpError;
      if (data.user?.identities?.length === 0) {
        throw new Error("EMAIL_ALREADY_EXISTS");
      }

      if (data.session) {
        router.push("/dashboard");
        router.refresh();
        return;
      }

      alert("Registro exitoso. Por favor, revisa tu email para confirmar tu cuenta.");
    } catch (err: any) {
      const isDuplicateEmail = err.message === "EMAIL_ALREADY_EXISTS"
        || err.message?.toLowerCase().includes("already registered");
      setError(isDuplicateEmail
        ? "Esta dirección de email ya está en uso."
        : err.message || "Ocurrió un error inesperado.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleRegister} className="space-y-5">
      <div className="space-y-2">
        <Label htmlFor="name" className="text-sm font-semibold">
          Nombre Completo
        </Label>
        <Input
          id="name"
          type="text"
          placeholder="Ej: Dr. Juan Pérez"
          value={formData.name}
          onChange={handleChange}
          required
          className="h-11 transition-all focus:ring-2 focus:ring-primary/20"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email" className="text-sm font-semibold">
          Correo Electrónico
        </Label>
        <Input
          id="email"
          type="email"
          placeholder="tu@email.com"
          value={formData.email}
          onChange={handleChange}
          required
          className="h-11 transition-all focus:ring-2 focus:ring-primary/20"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password" className="text-sm font-semibold">
          Contraseña
        </Label>
        <Input
          id="password"
          type="password"
          placeholder="••••••••"
          value={formData.password}
          onChange={handleChange}
          required
          className="h-11 transition-all focus:ring-2 focus:ring-primary/20"
        />
      </div>

      {error && (
        <div className="text-sm text-red-500 font-medium text-center bg-red-50 p-2 rounded">
          {error}
        </div>
      )}

      <Button
        type="submit"
        disabled={isLoading}
        className="w-full h-11 text-base font-semibold gradient-primary hover:opacity-90 transition-all shadow-md hover:shadow-lg"
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Procesando...
          </>
        ) : (
          "Registrarse"
        )}
      </Button>
    </form>
  );
}
