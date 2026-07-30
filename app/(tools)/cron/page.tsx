"use client";

import { useMemo, useState } from "react";
import { evaluateCron } from "@/lib/cron-utils";
import { ErrorBanner, Field, Panel, PromptLine, TextInput } from "@/components/ui";

export default function CronPage() {
  const [expression, setExpression] = useState("*/15 9-17 * * 1-5");
  const result = useMemo(() => evaluateCron(expression, 5), [expression]);

  return (
    <div className="flex flex-col gap-6">
      <PromptLine command={`crontab -l  #  ${expression}  run-your-script.sh`} />

      <Field label="Cron ifadesi" hint="dakika saat gün(ay) ay gün(hafta) — örn: */5 * * * *">
        <TextInput value={expression} onChange={(e) => setExpression(e.target.value)} />
      </Field>

      {!result.valid ? (
        <ErrorBanner>{result.error}</ErrorBanner>
      ) : (
        <>
          <Panel>{result.description}</Panel>
          <Field label="Sonraki çalışma zamanları">
            <ol className="flex flex-col gap-1 text-sm">
              {result.nextRuns.map((t, i) => (
                <li key={i} className="rounded-md border border-border bg-surface px-3 py-1.5 text-ink">
                  {t}
                </li>
              ))}
            </ol>
          </Field>
        </>
      )}
    </div>
  );
}
