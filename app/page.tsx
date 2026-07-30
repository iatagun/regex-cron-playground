import Link from "next/link";
import { TOOLS } from "@/lib/tools";

const DESCRIPTIONS: Record<string, string> = {
  "/regex": "Regex pattern'ini canlı test et, eşleşmeleri ve grupları gör.",
  "/cron": "Cron ifadesini insan diline çevir, sonraki çalışma zamanlarını gör.",
  "/json": "JSON'u formatla/minify et, syntax hatasını bul.",
  "/base64": "Metni Base64 veya URL-encode ile kodla/çöz.",
  "/id": "UUID v4 üret, Unix timestamp ↔ tarih çevir.",
  "/jwt": "JWT'nin header ve payload'ını çöz (imza doğrulamadan).",
  "/diff": "İki metni kelime veya satır bazında karşılaştır.",
  "/hash": "Metinden SHA-1/256/384/512 hash üret.",
};

export default function Home() {
  return (
    <div className="flex min-h-screen justify-center bg-zinc-50 px-4 py-12 dark:bg-black">
      <main className="w-full max-w-2xl">
        <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
          Devtools Playground
        </h1>
        <p className="mt-1 text-sm text-zinc-500">
          Var olan kütüphaneler ve native API&apos;ler üzerine ince bir katman. Sıfırdan
          altyapı yok.
        </p>

        <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {TOOLS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="rounded-lg border border-zinc-300 bg-white p-4 transition-colors hover:border-zinc-400 dark:border-zinc-700 dark:bg-zinc-900 dark:hover:border-zinc-500"
            >
              <div className="font-medium text-zinc-900 dark:text-zinc-50">{label}</div>
              <p className="mt-1 text-sm text-zinc-500">{DESCRIPTIONS[href]}</p>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
