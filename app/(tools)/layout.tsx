import Link from "next/link";
import { ToolNav } from "@/components/tool-nav";

export default function ToolsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen justify-center bg-zinc-50 px-4 py-12 dark:bg-black">
      <main className="w-full max-w-2xl">
        <Link href="/" className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
          Devtools Playground
        </Link>
        <p className="mt-1 text-sm text-zinc-500">
          Var olan kütüphaneler ve native API&apos;ler üzerine ince bir katman.
        </p>

        <div className="mt-6">
          <ToolNav />
        </div>

        <div className="mt-6">{children}</div>
      </main>
    </div>
  );
}
