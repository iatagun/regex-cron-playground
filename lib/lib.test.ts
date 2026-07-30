import assert from "node:assert";
import { testRegex, buildSegments } from "./regex-utils.ts";
import { evaluateCron } from "./cron-utils.ts";
import { analyzeJson } from "./json-utils.ts";
import { encodeBase64, decodeBase64, encodeUrlComponent, decodeUrlComponent } from "./base64-utils.ts";
import { generateUuid, parseTimestamp, parseDateToTimestamp } from "./id-utils.ts";
import { decodeJwt } from "./jwt-utils.ts";
import { computeDiff } from "./diff-utils.ts";
import { computeHash } from "./hash-utils.ts";

// regex: basic matches + groups
{
  const r = testRegex("(\\w+)@(\\w+)", "", "a@b c@d");
  assert.strictEqual(r.valid, true);
  if (r.valid) {
    assert.strictEqual(r.matches.length, 2);
    assert.strictEqual(r.matches[0].match, "a@b");
    assert.deepStrictEqual(r.matches[0].groups, ["a", "b"]);
  }
}

// regex: invalid pattern reports error, not throw
{
  const r = testRegex("(unclosed", "", "abc");
  assert.strictEqual(r.valid, false);
}

// regex: zero-length match doesn't infinite loop, segments cover full input
{
  const r = testRegex("x*", "", "abc");
  assert.strictEqual(r.valid, true);
  if (r.valid) {
    const segments = buildSegments("abc", r.matches);
    assert.strictEqual(segments.map((s) => s.text).join(""), "abc");
  }
}

// cron: valid expression
{
  const c = evaluateCron("*/5 * * * *", 3);
  assert.strictEqual(c.valid, true);
  if (c.valid) {
    assert.strictEqual(c.nextRuns.length, 3);
    assert.ok(c.description.toLowerCase().includes("5"));
  }
}

// cron: invalid expression reports error, not throw
{
  const c = evaluateCron("not a cron");
  assert.strictEqual(c.valid, false);
}

// json: valid input formats and minifies
{
  const r = analyzeJson('{"a":1,"b":[1,2]}');
  assert.strictEqual(r.valid, true);
  if (r.valid) {
    assert.strictEqual(r.minified, '{"a":1,"b":[1,2]}');
    assert.ok(r.formatted.includes("\n"));
  }
}

// json: invalid input reports error, not throw
{
  const r = analyzeJson("{a: 1}");
  assert.strictEqual(r.valid, false);
}

// base64: unicode-safe round trip
{
  const original = "merhaba dünya 🎉";
  const encoded = encodeBase64(original);
  const decoded = decodeBase64(encoded);
  assert.strictEqual(decoded.valid, true);
  if (decoded.valid) assert.strictEqual(decoded.output, original);
}

// base64: invalid input reports error, not throw
{
  const r = decodeBase64("not valid base64!!!");
  assert.strictEqual(r.valid, false);
}

// url component: round trip
{
  const original = "a b&c=d";
  const encoded = encodeUrlComponent(original);
  const decoded = decodeUrlComponent(encoded);
  assert.strictEqual(decoded.valid, true);
  if (decoded.valid) assert.strictEqual(decoded.output, original);
}

// url component: malformed input reports error, not throw
{
  const r = decodeUrlComponent("%");
  assert.strictEqual(r.valid, false);
}

// id: uuid v4 format
{
  const id = generateUuid();
  assert.match(id, /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i);
}

// id: timestamp parsing (seconds vs invalid)
{
  const r = parseTimestamp("0");
  assert.strictEqual(r.valid, true);
  if (r.valid) assert.strictEqual(r.iso, "1970-01-01T00:00:00.000Z");

  const bad = parseTimestamp("not-a-number");
  assert.strictEqual(bad.valid, false);
}

// id: date -> timestamp
{
  const r = parseDateToTimestamp("1970-01-01T00:00:00Z");
  assert.strictEqual(r.valid, true);
  if (r.valid) {
    assert.strictEqual(r.seconds, 0);
    assert.strictEqual(r.milliseconds, 0);
  }

  const bad = parseDateToTimestamp("not a date");
  assert.strictEqual(bad.valid, false);
}

// jwt: decodes header/payload without verifying signature
{
  const base64url = (obj: unknown) =>
    btoa(JSON.stringify(obj)).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
  const token = `${base64url({ alg: "HS256", typ: "JWT" })}.${base64url({ sub: "123" })}.fakesig`;

  const r = decodeJwt(token);
  assert.strictEqual(r.valid, true);
  if (r.valid) {
    assert.deepStrictEqual(r.header, { alg: "HS256", typ: "JWT" });
    assert.deepStrictEqual(r.payload, { sub: "123" });
  }

  const bad = decodeJwt("only.two");
  assert.strictEqual(bad.valid, false);
}

// diff: flags added/removed words
{
  const parts = computeDiff("the cat sat", "the dog sat", "words");
  assert.ok(parts.some((p) => p.removed && p.value.includes("cat")));
  assert.ok(parts.some((p) => p.added && p.value.includes("dog")));
}

// hash: known SHA-256 digest for "hello"
{
  const digest = await computeHash("hello", "SHA-256");
  assert.strictEqual(
    digest,
    "2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824"
  );
}

console.log("all lib tests passed");
