"use client";

import { useMemo, useState } from "react";
import {
  decodeBase64,
  decodeUrlComponent,
  encodeBase64,
  encodeUrlComponent,
} from "@/lib/base64-utils";
import { ErrorBanner, Field, Panel, PromptLine, TextArea } from "@/components/ui";

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

  const command =
    mode === "base64"
      ? `echo -n '${input}' | base64`
      : `jq -rn --arg s '${input}' '$s|@uri'`;

  return (
    <div className="flex flex-col gap-6">
      <PromptLine command={command} />

      <div className="flex w-fit overflow-hidden rounded-md border border-border">
        {(["base64", "url"] as const).map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={`px-3 py-1.5 font-display text-xs font-bold uppercase tracking-wide transition-colors ${
              mode === m ? "bg-amber text-bg" : "text-muted hover:text-ink"
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
