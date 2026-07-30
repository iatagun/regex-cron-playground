"use client";

import { useMemo, useState } from "react";
import { computeDiff, type DiffMode } from "@/lib/diff-utils";
import { Field, Panel, TextArea } from "@/components/ui";

export default function DiffPage() {
  const [mode, setMode] = useState<DiffMode>("words");
  const [textA, setTextA] = useState("the quick brown fox jumps over the lazy dog");
  const [textB, setTextB] = useState("the quick red fox jumps over the sleepy dog");

  const parts = useMemo(() => computeDiff(textA, textB, mode), [textA, textB, mode]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex gap-1 rounded-lg bg-zinc-200 p-1 dark:bg-zinc-800 w-fit">
        {(["words", "lines"] as const).map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
              mode === m
                ? "bg-white text-zinc-900 shadow dark:bg-zinc-950 dark:text-zinc-50"
                : "text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
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
                <mark key={i} className="rounded bg-green-200 px-0.5 dark:bg-green-500/40">
                  {p.value}
                </mark>
              );
            }
            if (p.removed) {
              return (
                <mark
                  key={i}
                  className="rounded bg-red-200 px-0.5 line-through dark:bg-red-500/40"
                >
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
