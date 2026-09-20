export const generateSlug = (name: string): string => {
  return name
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Quitar acentos
    .replace(/[^a-z0-9\s-]/g, "") // Quitar caracteres especiales
    .replace(/\s+/g, "-") // Espacios por guiones
    .replace(/-+/g, "-"); // Quitar guiones duplicados
};
