"use client";

import { useMemo, useState } from "react";
import { testRegex, buildSegments } from "@/lib/regex-utils";
import { ErrorBanner, Panel, TextArea } from "@/components/ui";

const COMMON_FLAGS: { flag: string; label: string }[] = [
  { flag: "g", label: "global" },
  { flag: "i", label: "case-insensitive" },
  { flag: "m", label: "multiline" },
  { flag: "s", label: "dotAll" },
];

export default function RegexPage() {
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
        <TextArea value={input} onChange={(e) => setInput(e.target.value)} />
      </div>

      {!result.valid ? (
        <ErrorBanner>{result.error}</ErrorBanner>
      ) : (
        <>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
              Eşleşmeler ({result.matches.length})
            </label>
            <Panel mono>
              {result.matches.length === 0 ? (
                <span className="text-zinc-400">(eşleşme yok)</span>
              ) : (
                segments.map((s, i) =>
                  s.isMatch ? (
                    <mark key={i} className="rounded bg-amber-200 px-0.5 dark:bg-amber-500/40">
                      {s.text}
                    </mark>
                  ) : (
                    <span key={i}>{s.text}</span>
                  )
                )
              )}
            </Panel>
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
