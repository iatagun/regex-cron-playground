export type JwtResult =
  | { valid: true; header: unknown; payload: unknown; signature: string }
  | { valid: false; error: string };

function base64UrlDecode(segment: string): string {
  const base64 = segment.replace(/-/g, "+").replace(/_/g, "/");
  const padded = base64 + "=".repeat((4 - (base64.length % 4)) % 4);
  const binary = atob(padded);
  const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0));
  return new TextDecoder("utf-8").decode(bytes);
}

// Decodes header/payload only — does NOT verify the signature.
export function decodeJwt(token: string): JwtResult {
  const parts = token.trim().split(".");
  if (parts.length !== 3) {
    return { valid: false, error: "JWT üç parçadan oluşmalı: header.payload.signature" };
  }
  try {
    const header = JSON.parse(base64UrlDecode(parts[0]));
    const payload = JSON.parse(base64UrlDecode(parts[1]));
    return { valid: true, header, payload, signature: parts[2] };
  } catch {
    return { valid: false, error: "Header veya payload çözülemedi: geçersiz Base64URL/JSON." };
  }
}
