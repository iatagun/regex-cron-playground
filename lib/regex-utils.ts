export type RegexMatch = {
  match: string;
  index: number;
  groups: (string | undefined)[];
  namedGroups?: Record<string, string>;
};

export type RegexResult =
  | { valid: true; matches: RegexMatch[] }
  | { valid: false; error: string };

const MAX_MATCHES = 500;

export function testRegex(pattern: string, flags: string, input: string): RegexResult {
  if (!pattern) {
    return { valid: true, matches: [] };
  }

  const globalFlags = flags.includes("g") ? flags : flags + "g";
  let regex: RegExp;
  try {
    regex = new RegExp(pattern, globalFlags);
  } catch (e) {
    return { valid: false, error: e instanceof Error ? e.message : "Geçersiz regex." };
  }

  const matches: RegexMatch[] = [];
  for (const m of input.matchAll(regex)) {
    matches.push({
      match: m[0],
      index: m.index,
      groups: m.slice(1),
      namedGroups: m.groups,
    });
    if (matches.length >= MAX_MATCHES) break;
  }

  return { valid: true, matches };
}

export type Segment = { text: string; isMatch: boolean };

export function buildSegments(input: string, matches: RegexMatch[]): Segment[] {
  const segments: Segment[] = [];
  let cursor = 0;
  for (const m of matches) {
    if (m.index > cursor) {
      segments.push({ text: input.slice(cursor, m.index), isMatch: false });
    }
    if (m.match.length > 0) {
      segments.push({ text: m.match, isMatch: true });
      cursor = m.index + m.match.length;
    } else {
      cursor = m.index;
    }
  }
  if (cursor < input.length) {
    segments.push({ text: input.slice(cursor), isMatch: false });
  }
  return segments;
}
