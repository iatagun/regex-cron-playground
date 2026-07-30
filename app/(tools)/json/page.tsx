"use client";

import { useMemo, useState } from "react";
import { analyzeJson } from "@/lib/json-utils";
import { ErrorBanner, Field, Panel, TextArea } from "@/components/ui";

export default function JsonPage() {
  const [input, setInput] = useState('{\n  "hello": "world",\n  "list": [1, 2, 3]\n}');
  const result = useMemo(() => analyzeJson(input), [input]);

  return (
    <div className="flex flex-col gap-6">
      <Field label="JSON girdisi">
        <TextArea value={input} onChange={(e) => setInput(e.target.value)} className="min-h-40" />
      </Field>

      {!result.valid ? (
        <ErrorBanner>{result.error}</ErrorBanner>
      ) : (
        <>
          <Field label="Formatlanmış">
            <Panel mono>{result.formatted}</Panel>
          </Field>
          <Field label="Minified">
            <Panel mono>{result.minified}</Panel>
          </Field>
        </>
      )}
    </div>
  );
}
