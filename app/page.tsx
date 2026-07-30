"use client";

import { useMemo, useState } from "react";
import { testRegex, buildSegments } from "@/lib/regex-utils";
import { evaluateCron } from "@/lib/cron-utils";

const COMMON_FLAGS: { flag: string; label: string }[] = [
  { flag: "g", label: "global" },
  { flag: "i", label: "case-insensitive" },
  { flag: "m", label: "multiline" },
  { flag: "s", label: "dotAll" },
];

function RegexTester() {
  const [pattern, setPattern] = useState("(\\w+)@(\\w+\\.\\w+)");
  const [flags, setFlags] = useState("gi");
  const [input, setInput] = useState(
    "iletisim@ornek.com adresine yaz, ya da destek@site.org da olur."
  );

  const result = useMemo(() => testRegex(pattern, flags, input), [pattern, flags, input]);
  const segments = useMemo(
    () => (result.valid ? buildSegments(input, result.matches) : []),
    [result, input]
  );

  const toggleFlag = (f: string) => {
    setFlags((cur) => (cur.includes(f) ? cur.replace(f, "") : cur + f));
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-zinc-600 dark:text-zinc-400">Pattern</label>
        <div className="flex items-center gap-2 rounded-lg border border-zinc-300 bg-white px-3 py-2 font-mono text-sm dark:border-zinc-700 dark:bg-zinc-900">
          <span className="text-zinc-400">/</span>
          <input
            className="flex-1 bg-transparent outline-none"
            value={pattern}
            onChange={(e) => setPattern(e.target.value)}
            spellCheck={false}
          />
          <span className="text-zinc-400">/{flags}</span>
        </div>
        <div className="flex gap-3 pt-1">
          {COMMON_FLAGS.map(({ flag, label }) => (
            <label key={flag} className="flex items-center gap-1.5 text-sm text-zinc-600 dark:text-zinc-400">
              <input
                type="checkbox"
                checked={flags.includes(flag)}
                onChange={() => toggleFlag(flag)}
              />
              {flag} <span className="text-zinc-400">({label})</span>
            </label>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-zinc-600 dark:text-zinc-400">Test metni</label>
        <textarea
          className="min-h-28 rounded-lg border border-zinc-300 bg-white p-3 font-mono text-sm outline-none dark:border-zinc-700 dark:bg-zinc-900"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          spellCheck={false}
        />
      </div>

      {!result.valid ? (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700 dark:bg-red-950 dark:text-red-400">
          {result.error}
        </p>
      ) : (
        <>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
              Eşleşmeler ({result.matches.length})
            </label>
            <div className="whitespace-pre-wrap break-words rounded-lg border border-zinc-300 bg-white p-3 font-mono text-sm dark:border-zinc-700 dark:bg-zinc-900">
              {result.matches.length === 0
                ? <span className="text-zinc-400">(eşleşme yok)</span>
                : segments.map((s, i) =>
                    s.isMatch ? (
                      <mark key={i} className="rounded bg-amber-200 px-0.5 dark:bg-amber-500/40">
                        {s.text}
                      </mark>
                    ) : (
                      <span key={i}>{s.text}</span>
                    )
                  )}
            </div>
          </div>

          {result.matches.length > 0 && (
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-zinc-600 dark:text-zinc-400">Detaylar</label>
              <ul className="flex flex-col gap-2 text-sm">
                {result.matches.map((m, i) => (
                  <li
                    key={i}
                    className="rounded-lg border border-zinc-200 bg-zinc-50 p-2 font-mono dark:border-zinc-800 dark:bg-zinc-900/50"
                  >
                    <span className="text-zinc-500">#{i} @{m.index}</span>{" "}
                    <span className="font-semibold">{m.match}</span>
                    {m.groups.length > 0 && (
                      <span className="text-zinc-500">
                        {" "}
                        groups: [{m.groups.map((g) => g ?? "∅").join(", ")}]
                      </span>
                    )}
                    {m.namedGroups && Object.keys(m.namedGroups).length > 0 && (
                      <span className="text-zinc-500">
                        {" "}
                        named: {JSON.stringify(m.namedGroups)}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </>
      )}
    </div>
  );
}

function CronTester() {
  const [expression, setExpression] = useState("*/15 9-17 * * 1-5");
  const result = useMemo(() => evaluateCron(expression, 5), [expression]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
          Cron ifadesi
        </label>
        <input
          className="rounded-lg border border-zinc-300 bg-white px-3 py-2 font-mono text-sm outline-none dark:border-zinc-700 dark:bg-zinc-900"
          value={expression}
          onChange={(e) => setExpression(e.target.value)}
          spellCheck={false}
        />
        <p className="text-xs text-zinc-400">dakika saat gün(ay) ay gün(hafta) — örn: */5 * * * *</p>
      </div>

      {!result.valid ? (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700 dark:bg-red-950 dark:text-red-400">
          {result.error}
        </p>
      ) : (
        <>
          <div className="rounded-lg border border-zinc-300 bg-white p-3 text-sm dark:border-zinc-700 dark:bg-zinc-900">
            {result.description}
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
              Sonraki çalışma zamanları
            </label>
            <ol className="flex flex-col gap-1 font-mono text-sm">
              {result.nextRuns.map((t, i) => (
                <li
                  key={i}
                  className="rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-1.5 dark:border-zinc-800 dark:bg-zinc-900/50"
                >
                  {t}
                </li>
              ))}
            </ol>
          </div>
        </>
      )}
    </div>
  );
}

export default function Home() {
  const [tab, setTab] = useState<"regex" | "cron">("regex");

  return (
    <div className="flex min-h-screen justify-center bg-zinc-50 px-4 py-12 dark:bg-black">
      <main className="w-full max-w-2xl">
        <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
          Regex & Cron Playground
        </h1>
        <p className="mt-1 text-sm text-zinc-500">
          Yaz, canlı test et. cron-parser ve cronstrue üzerine ince bir katman.
        </p>

        <div className="mt-6 flex gap-1 rounded-lg bg-zinc-200 p-1 dark:bg-zinc-800">
          {(["regex", "cron"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`flex-1 rounded-md py-1.5 text-sm font-medium capitalize transition-colors ${
                tab === t
                  ? "bg-white text-zinc-900 shadow dark:bg-zinc-950 dark:text-zinc-50"
                  : "text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="mt-6">
          {tab === "regex" ? <RegexTester /> : <CronTester />}
        </div>
      </main>
    </div>
  );
}
