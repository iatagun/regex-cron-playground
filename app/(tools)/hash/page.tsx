"use client";

import { useEffect, useState } from "react";
import { computeHash, HASH_ALGORITHMS, type HashAlgorithm } from "@/lib/hash-utils";
import { Field, Panel, TextArea } from "@/components/ui";

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
      <Field label="Metin">
        <TextArea value={input} onChange={(e) => setInput(e.target.value)} />
      </Field>

      <Field label="Algoritma">
        <select
          value={algorithm}
          onChange={(e) => setAlgorithm(e.target.value as HashAlgorithm)}
          className="w-fit rounded-lg border border-zinc-300 bg-white px-3 py-2 font-mono text-sm outline-none dark:border-zinc-700 dark:bg-zinc-900"
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
