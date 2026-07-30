export type TextResult = { valid: true; output: string } | { valid: false; error: string };

export function encodeBase64(input: string): string {
  const bytes = new TextEncoder().encode(input);
  let binary = "";
  for (const b of bytes) binary += String.fromCharCode(b);
  return btoa(binary);
}

export function decodeBase64(input: string): TextResult {
  if (!input.trim()) return { valid: false, error: "Girdi boş olamaz." };
  try {
    const binary = atob(input.trim());
    const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0));
    return { valid: true, output: new TextDecoder("utf-8", { fatal: true }).decode(bytes) };
  } catch {
    return { valid: false, error: "Geçerli bir Base64 dizisi değil." };
  }
}

export function encodeUrlComponent(input: string): string {
  return encodeURIComponent(input);
}

export function decodeUrlComponent(input: string): TextResult {
  if (!input.trim()) return { valid: false, error: "Girdi boş olamaz." };
  try {
    return { valid: true, output: decodeURIComponent(input) };
  } catch {
    return { valid: false, error: "Geçerli bir URL-encoded dizi değil." };
  }
}
