import assert from "node:assert";
import { testRegex, buildSegments } from "./regex-utils.ts";
import { evaluateCron } from "./cron-utils.ts";

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

console.log("all lib tests passed");
