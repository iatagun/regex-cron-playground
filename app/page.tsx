import Link from "next/link";
import { TOOLS } from "@/lib/tools";

export default function Home() {
  return (
    <div className="flex justify-center px-4 py-8">
      <main className="w-full max-w-3xl">
        <p className="text-sm text-muted">
          <span className="text-amber">$</span> ls tools/
        </p>

        <div className="mt-4 divide-y divide-border rounded-md border border-border">
          {TOOLS.map(({ href, command, description }) => (
            <Link
              key={href}
              href={href}
              className="flex flex-col gap-0.5 px-4 py-3 transition-colors hover:bg-surface sm:flex-row sm:items-baseline sm:gap-4"
            >
              <span className="shrink-0 font-display text-sm font-bold text-cyan sm:w-28">
                {command}
              </span>
              <span className="text-sm text-muted">{description}</span>
            </Link>
          ))}
        </div>

        <p className="mt-4 text-xs text-muted">
          8 araç, 1 bağımlılık ({" "}
          <a
            href="https://www.npmjs.com/package/diff"
            className="text-cyan hover:text-amber hover:underline"
          >
            diff
          </a>{" "}
          — Myers diff için). Geri kalanı native Web/JS API.
        </p>
      </main>
    </div>
  );
}
