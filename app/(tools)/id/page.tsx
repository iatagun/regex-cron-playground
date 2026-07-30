"use client";

import { useState } from "react";
import { generateUuid, parseDateToTimestamp, parseTimestamp } from "@/lib/id-utils";
import { Button, ErrorBanner, Field, Panel, TextInput } from "@/components/ui";

export default function IdPage() {
  const [uuid, setUuid] = useState(() => generateUuid());
  const [timestampInput, setTimestampInput] = useState(() =>
    String(Math.floor(Date.now() / 1000))
  );
  const [dateInput, setDateInput] = useState(() => new Date().toISOString());

  const timestampResult = parseTimestamp(timestampInput);
  const dateResult = parseDateToTimestamp(dateInput);

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-3">
        <h2 className="text-sm font-medium text-zinc-600 dark:text-zinc-400">UUID v4</h2>
        <Panel mono>{uuid}</Panel>
        <Button onClick={() => setUuid(generateUuid())}>Yeni UUID üret</Button>
      </div>

      <div className="flex flex-col gap-3">
        <h2 className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
          Timestamp → Tarih
        </h2>
        <Field label="Unix timestamp (saniye veya milisaniye)">
          <TextInput
            value={timestampInput}
            onChange={(e) => setTimestampInput(e.target.value)}
          />
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
        <h2 className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
          Tarih → Timestamp
        </h2>
        <Field label="Tarih (ISO 8601)">
          <TextInput value={dateInput} onChange={(e) => setDateInput(e.target.value)} />
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
