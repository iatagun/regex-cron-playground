import { CronExpressionParser } from "cron-parser";
import cronstrue from "cronstrue";

export type CronResult =
  | { valid: true; description: string; nextRuns: string[] }
  | { valid: false; error: string };

export function evaluateCron(expression: string, count = 5): CronResult {
  const trimmed = expression.trim();
  if (!trimmed) {
    return { valid: false, error: "Cron ifadesi boş olamaz." };
  }

  let description: string;
  try {
    description = cronstrue.toString(trimmed);
  } catch (e) {
    return { valid: false, error: e instanceof Error ? e.message : "Geçersiz cron ifadesi." };
  }

  try {
    const interval = CronExpressionParser.parse(trimmed);
    const nextRuns: string[] = [];
    for (let i = 0; i < count; i++) {
      nextRuns.push(interval.next().toDate().toLocaleString("tr-TR"));
    }
    return { valid: true, description, nextRuns };
  } catch (e) {
    return { valid: false, error: e instanceof Error ? e.message : "Geçersiz cron ifadesi." };
  }
}
