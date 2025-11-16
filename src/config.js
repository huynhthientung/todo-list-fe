const DEFAULT_BE_HOST = "http://localhost:3000";

export const BE_HOST =
  import.meta.env.VITE_BE_HOST?.trim() || DEFAULT_BE_HOST;
