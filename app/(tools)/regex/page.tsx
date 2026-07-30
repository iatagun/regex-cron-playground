"use client";

import { useMemo, useState } from "react";
import { testRegex, buildSegments } from "@/lib/regex-utils";
import { ErrorBanner, Panel, PromptLine, TextArea } from "@/components/ui";

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

  const grepFlags = ["-E", flags.includes("i") && "-i", flags.includes("g") && "-o"]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="flex flex-col gap-6">
      <PromptLine command={`grep ${grepFlags} '${pattern}' input.txt`} />

      <div className="flex flex-col gap-2">
        <label className="font-display text-xs font-bold uppercase tracking-wide text-muted">
          Pattern
        </label>
        <div className="flex items-center gap-2 rounded-md border border-border bg-bg px-3 py-2 text-sm focus-within:border-amber">
          <span className="text-muted">/</span>
          <input
            className="flex-1 bg-transparent text-ink outline-none"
            value={pattern}
            onChange={(e) => setPattern(e.target.value)}
            spellCheck={false}
          />
          <span className="text-muted">/{flags}</span>
        </div>
        <div className="flex gap-4 pt-1">
          {COMMON_FLAGS.map(({ flag, label }) => (
            <label key={flag} className="flex items-center gap-1.5 text-xs text-muted">
              <input
                type="checkbox"
                className="accent-amber"
                checked={flags.includes(flag)}
                onChange={() => toggleFlag(flag)}
              />
              {flag} <span className="text-muted/70">({label})</span>
            </label>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className="font-display text-xs font-bold uppercase tracking-wide text-muted">
          Test metni
        </label>
        <TextArea value={input} onChange={(e) => setInput(e.target.value)} />
      </div>

      {!result.valid ? (
        <ErrorBanner>{result.error}</ErrorBanner>
      ) : (
        <>
          <div className="flex flex-col gap-2">
            <label className="font-display text-xs font-bold uppercase tracking-wide text-muted">
              Eşleşmeler ({result.matches.length})
            </label>
            <Panel mono>
              {result.matches.length === 0 ? (
                <span className="text-muted">(eşleşme yok)</span>
              ) : (
                segments.map((s, i) =>
                  s.isMatch ? (
                    <mark key={i} className="rounded bg-amber/20 px-0.5 text-amber">
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
              <label className="font-display text-xs font-bold uppercase tracking-wide text-muted">
                Detaylar
              </label>
              <ul className="flex flex-col gap-2 text-sm">
                {result.matches.map((m, i) => (
                  <li
                    key={i}
                    className="rounded-md border border-border bg-surface p-2 text-ink"
                  >
                    <span className="text-muted">#{i} @{m.index}</span>{" "}
                    <span className="font-bold text-cyan">{m.match}</span>
                    {m.groups.length > 0 && (
                      <span className="text-muted">
                        {" "}
                        groups: [{m.groups.map((g) => g ?? "∅").join(", ")}]
                      </span>
                    )}
                    {m.namedGroups && Object.keys(m.namedGroups).length > 0 && (
                      <span className="text-muted">
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
