export function generateUuid(): string {
  return crypto.randomUUID();
}

export type TimestampResult =
  | { valid: true; iso: string; utc: string; local: string }
  | { valid: false; error: string };

export function parseTimestamp(input: string): TimestampResult {
  const trimmed = input.trim();
  if (!/^-?\d+$/.test(trimmed)) {
    return { valid: false, error: "Sayısal bir Unix timestamp girin (saniye veya milisaniye)." };
  }
  const num = Number(trimmed);
  const ms = trimmed.replace("-", "").length <= 10 ? num * 1000 : num;
  const date = new Date(ms);
  if (Number.isNaN(date.getTime())) {
    return { valid: false, error: "Geçersiz timestamp." };
  }
  return {
    valid: true,
    iso: date.toISOString(),
    utc: date.toUTCString(),
    local: date.toLocaleString("tr-TR"),
  };
}

export type DateToTimestampResult =
  | { valid: true; seconds: number; milliseconds: number }
  | { valid: false; error: string };

export function parseDateToTimestamp(input: string): DateToTimestampResult {
  if (!input.trim()) return { valid: false, error: "Tarih boş olamaz." };
  const date = new Date(input);
  if (Number.isNaN(date.getTime())) {
    return { valid: false, error: "Geçersiz tarih. ISO 8601 formatı deneyin (2026-01-01T12:00:00Z)." };
  }
  return { valid: true, seconds: Math.floor(date.getTime() / 1000), milliseconds: date.getTime() };
}
