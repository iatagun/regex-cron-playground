import { diffWords, diffLines } from "diff";

export type DiffMode = "words" | "lines";
export type DiffPart = { value: string; added?: boolean; removed?: boolean };

export function computeDiff(a: string, b: string, mode: DiffMode): DiffPart[] {
  return mode === "lines" ? diffLines(a, b) : diffWords(a, b);
}
