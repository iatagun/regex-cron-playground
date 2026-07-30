"use client";

import { useMemo, useState } from "react";
import { evaluateCron } from "@/lib/cron-utils";
import { ErrorBanner, Field, Panel, TextInput } from "@/components/ui";

export default function CronPage() {
  const [expression, setExpression] = useState("*/15 9-17 * * 1-5");
  const result = useMemo(() => evaluateCron(expression, 5), [expression]);

  return (
    <div className="flex flex-col gap-6">
      <Field label="Cron ifadesi" hint="dakika saat gün(ay) ay gün(hafta) — örn: */5 * * * *">
        <TextInput value={expression} onChange={(e) => setExpression(e.target.value)} />
      </Field>

      {!result.valid ? (
        <ErrorBanner>{result.error}</ErrorBanner>
      ) : (
        <>
          <Panel>{result.description}</Panel>
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
