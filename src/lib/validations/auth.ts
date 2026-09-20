export interface AuthFormData {
  email: string;
  password?: string;
  name?: string;
}

export const validateEmail = (email: string): string | null => {
  if (!email) return "El correo es requerido.";
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return "Formato de correo inválido.";
  return null;
};

export const validatePassword = (password: string): string | null => {
  if (!password) return "La contraseña es requerida.";
  if (password.length < 8) return "La contraseña debe tener al menos 8 caracteres.";
  return null;
};

export const validateName = (name: string): string | null => {
  if (!name || name.trim().length < 2) return "El nombre debe tener al menos 2 caracteres.";
  return null;
};
