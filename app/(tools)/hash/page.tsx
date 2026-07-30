"use client";

import { useEffect, useState } from "react";
import { computeHash, HASH_ALGORITHMS, type HashAlgorithm } from "@/lib/hash-utils";
import { Field, Panel, PromptLine, TextArea } from "@/components/ui";

const SHASUM_FLAG: Record<HashAlgorithm, string> = {
  "SHA-1": "1",
  "SHA-256": "256",
  "SHA-384": "384",
  "SHA-512": "512",
};

export default function HashPage() {
  const [input, setInput] = useState("hello");
  const [algorithm, setAlgorithm] = useState<HashAlgorithm>("SHA-256");
  const [digest, setDigest] = useState("");

  useEffect(() => {
    let cancelled = false;
    computeHash(input, algorithm).then((d) => {
      if (!cancelled) setDigest(d);
    });
    return () => {
      cancelled = true;
    };
  }, [input, algorithm]);

  return (
    <div className="flex flex-col gap-6">
      <PromptLine command={`echo -n '${input}' | shasum -a ${SHASUM_FLAG[algorithm]}`} />

      <Field label="Metin">
        <TextArea value={input} onChange={(e) => setInput(e.target.value)} />
      </Field>

      <Field label="Algoritma">
        <select
          value={algorithm}
          onChange={(e) => setAlgorithm(e.target.value as HashAlgorithm)}
          className="w-fit rounded-md border border-border bg-bg px-3 py-2 text-sm text-ink outline-none focus-visible:border-amber focus-visible:ring-2 focus-visible:ring-amber/40"
        >
          {HASH_ALGORITHMS.map((a) => (
            <option key={a} value={a}>
              {a}
            </option>
          ))}
        </select>
      </Field>

      <Field label="Hash">
        <Panel mono>{digest}</Panel>
      </Field>
    </div>
  );
}
