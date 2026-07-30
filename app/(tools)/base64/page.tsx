"use client";

import { useMemo, useState } from "react";
import {
  decodeBase64,
  decodeUrlComponent,
  encodeBase64,
  encodeUrlComponent,
} from "@/lib/base64-utils";
import { ErrorBanner, Field, Panel, TextArea } from "@/components/ui";

type Mode = "base64" | "url";

export default function Base64Page() {
  const [mode, setMode] = useState<Mode>("base64");
  const [input, setInput] = useState("Merhaba dünya!");

  const encoded = useMemo(
    () => (mode === "base64" ? encodeBase64(input) : encodeUrlComponent(input)),
    [mode, input]
  );
  const decoded = useMemo(
    () => (mode === "base64" ? decodeBase64(input) : decodeUrlComponent(input)),
    [mode, input]
  );

  return (
    <div className="flex flex-col gap-6">
      <div className="flex gap-1 rounded-lg bg-zinc-200 p-1 dark:bg-zinc-800 w-fit">
        {(["base64", "url"] as const).map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
              mode === m
                ? "bg-white text-zinc-900 shadow dark:bg-zinc-950 dark:text-zinc-50"
                : "text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
            }`}
          >
            {m === "base64" ? "Base64" : "URL"}
          </button>
        ))}
      </div>

      <Field label="Metin">
        <TextArea value={input} onChange={(e) => setInput(e.target.value)} />
      </Field>

      <Field label="Kodlanmış (encode)">
        <Panel mono>{encoded}</Panel>
      </Field>

      <Field label={`Çözülmüş (girdiyi ${mode === "base64" ? "Base64" : "URL-encoded"} kabul edip decode et)`}>
        {decoded.valid ? <Panel mono>{decoded.output}</Panel> : <ErrorBanner>{decoded.error}</ErrorBanner>}
      </Field>
    </div>
  );
}
