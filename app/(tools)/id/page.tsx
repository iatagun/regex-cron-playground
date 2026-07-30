"use client";

import { useEffect, useState } from "react";
import { generateUuid, parseDateToTimestamp, parseTimestamp } from "@/lib/id-utils";
import { Button, ErrorBanner, Field, Panel, PromptLine, TextInput } from "@/components/ui";

// crypto.randomUUID() / Date.now() differ between server and client render,
// so this seed is generated client-side only (post-hydration) to avoid a hydration mismatch.
function seedNow() {
  return {
    uuid: generateUuid(),
    timestampInput: String(Math.floor(Date.now() / 1000)),
    dateInput: new Date().toISOString(),
  };
}

export default function IdPage() {
  const [seed, setSeed] = useState<ReturnType<typeof seedNow> | null>(null);
  const [uuidOverride, setUuidOverride] = useState<string | null>(null);
  const [timestampInput, setTimestampInput] = useState<string | null>(null);
  const [dateInput, setDateInput] = useState<string | null>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time client-only seed, values are non-deterministic (random/current time)
    setSeed(seedNow());
  }, []);

  const uuid = uuidOverride ?? seed?.uuid ?? null;
  const timestamp = timestampInput ?? seed?.timestampInput ?? null;
  const date = dateInput ?? seed?.dateInput ?? null;

  const timestampResult = parseTimestamp(timestamp ?? "");
  const dateResult = parseDateToTimestamp(date ?? "");

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-3">
        <PromptLine command="uuidgen" />
        <Panel mono>{uuid ?? "…"}</Panel>
        <Button onClick={() => setUuidOverride(generateUuid())}>Yeni UUID üret</Button>
      </div>

      <div className="flex flex-col gap-3">
        <PromptLine command={`date -d @${timestamp || "0"} --iso-8601=seconds`} />
        <Field label="Unix timestamp (saniye veya milisaniye)">
          <TextInput value={timestamp ?? ""} onChange={(e) => setTimestampInput(e.target.value)} />
        </Field>
        {timestampResult.valid ? (
          <Panel mono>
            ISO: {timestampResult.iso}
            {"\n"}UTC: {timestampResult.utc}
            {"\n"}Yerel: {timestampResult.local}
          </Panel>
        ) : (
          <ErrorBanner>{timestampResult.error}</ErrorBanner>
        )}
      </div>

      <div className="flex flex-col gap-3">
        <PromptLine command={`date -d '${date ?? ""}' +%s`} />
        <Field label="Tarih (ISO 8601)">
          <TextInput value={date ?? ""} onChange={(e) => setDateInput(e.target.value)} />
        </Field>
        {dateResult.valid ? (
          <Panel mono>
            Saniye: {dateResult.seconds}
            {"\n"}Milisaniye: {dateResult.milliseconds}
          </Panel>
        ) : (
          <ErrorBanner>{dateResult.error}</ErrorBanner>
        )}
      </div>
    </div>
  );
}
