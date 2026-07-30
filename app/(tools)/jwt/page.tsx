"use client";

import { useMemo, useState } from "react";
import { decodeJwt } from "@/lib/jwt-utils";
import { ErrorBanner, Field, Panel, PromptLine, TextArea } from "@/components/ui";

const SAMPLE_JWT =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";

export default function JwtPage() {
  const [token, setToken] = useState(SAMPLE_JWT);
  const result = useMemo(() => decodeJwt(token), [token]);
  const payloadSegment = token.trim().split(".")[1] ?? "";

  return (
    <div className="flex flex-col gap-6">
      <PromptLine command={`echo '${payloadSegment}' | base64 -d | jq .`} />

      <Field label="JWT" hint="İmza doğrulanmaz, sadece header ve payload çözülür.">
        <TextArea value={token} onChange={(e) => setToken(e.target.value)} />
      </Field>

      {!result.valid ? (
        <ErrorBanner>{result.error}</ErrorBanner>
      ) : (
        <>
          <Field label="Header">
            <Panel mono>{JSON.stringify(result.header, null, 2)}</Panel>
          </Field>
          <Field label="Payload">
            <Panel mono>{JSON.stringify(result.payload, null, 2)}</Panel>
          </Field>
          <Field label="Signature (doğrulanmadı)">
            <Panel mono>{result.signature}</Panel>
          </Field>
        </>
      )}
    </div>
  );
}
