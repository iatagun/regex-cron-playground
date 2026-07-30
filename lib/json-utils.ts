export type JsonResult =
  | { valid: true; formatted: string; minified: string }
  | { valid: false; error: string };

export function analyzeJson(input: string): JsonResult {
  if (!input.trim()) {
    return { valid: false, error: "JSON boş olamaz." };
  }
  try {
    const parsed = JSON.parse(input);
    return {
      valid: true,
      formatted: JSON.stringify(parsed, null, 2),
      minified: JSON.stringify(parsed),
    };
  } catch (e) {
    return { valid: false, error: e instanceof Error ? e.message : "Geçersiz JSON." };
  }
}
