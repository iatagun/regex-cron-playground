export const TOOLS = [
  {
    href: "/regex",
    label: "Regex",
    command: "grep",
    description: "Pattern'i canlı test et, eşleşmeleri ve grupları gör.",
  },
  {
    href: "/cron",
    label: "Cron",
    command: "crontab",
    description: "İfadeyi insan diline çevir, sonraki çalışma zamanlarını gör.",
  },
  {
    href: "/json",
    label: "JSON",
    command: "jq",
    description: "Formatla/minify et, syntax hatasının yerini bul.",
  },
  {
    href: "/base64",
    label: "Base64 / URL",
    command: "base64",
    description: "Metni Base64 veya URL-encode ile kodla/çöz.",
  },
  {
    href: "/id",
    label: "UUID / Timestamp",
    command: "uuidgen",
    description: "UUID v4 üret, Unix timestamp ↔ tarih çevir.",
  },
  {
    href: "/jwt",
    label: "JWT",
    command: "jwt",
    description: "Header ve payload'ı çöz (imza doğrulamadan).",
  },
  {
    href: "/diff",
    label: "Diff",
    command: "diff",
    description: "İki metni kelime veya satır bazında karşılaştır.",
  },
  {
    href: "/hash",
    label: "Hash",
    command: "shasum",
    description: "Metinden SHA-1/256/384/512 hash üret.",
  },
] as const;
