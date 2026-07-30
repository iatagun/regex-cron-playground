"use client";

import { useMemo, useState } from "react";
import { computeDiff, type DiffMode } from "@/lib/diff-utils";
import { Field, Panel, PromptLine, TextArea } from "@/components/ui";

export default function DiffPage() {
  const [mode, setMode] = useState<DiffMode>("words");
  const [textA, setTextA] = useState("the quick brown fox jumps over the lazy dog");
  const [textB, setTextB] = useState("the quick red fox jumps over the sleepy dog");

  const parts = useMemo(() => computeDiff(textA, textB, mode), [textA, textB, mode]);

  return (
    <div className="flex flex-col gap-6">
      <PromptLine command='diff <(echo "$A") <(echo "$B")' />

      <div className="flex w-fit overflow-hidden rounded-md border border-border">
        {(["words", "lines"] as const).map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={`px-3 py-1.5 font-display text-xs font-bold uppercase tracking-wide transition-colors ${
              mode === m ? "bg-amber text-bg" : "text-muted hover:text-ink"
            }`}
          >
            {m === "words" ? "Kelime" : "Satır"}
          </button>
        ))}
      </div>

      <Field label="Metin A">
        <TextArea value={textA} onChange={(e) => setTextA(e.target.value)} />
      </Field>
      <Field label="Metin B">
        <TextArea value={textB} onChange={(e) => setTextB(e.target.value)} />
      </Field>

      <Field label="Fark">
        <Panel mono>
          {parts.map((p, i) => {
            if (p.added) {
              return (
                <mark key={i} className="rounded bg-green/20 px-0.5 text-green">
                  {p.value}
                </mark>
              );
            }
            if (p.removed) {
              return (
                <mark key={i} className="rounded bg-red/20 px-0.5 text-red line-through">
                  {p.value}
                </mark>
              );
            }
            return <span key={i}>{p.value}</span>;
          })}
        </Panel>
      </Field>
    </div>
  );
}
