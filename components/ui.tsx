import type { InputHTMLAttributes, LabelHTMLAttributes, ReactNode, TextareaHTMLAttributes } from "react";

export function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: ReactNode;
} & LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-zinc-600 dark:text-zinc-400">{label}</label>
      {children}
      {hint && <p className="text-xs text-zinc-400">{hint}</p>}
    </div>
  );
}

const inputClasses =
  "rounded-lg border border-zinc-300 bg-white px-3 py-2 font-mono text-sm outline-none dark:border-zinc-700 dark:bg-zinc-900";

export function TextInput({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return <input spellCheck={false} className={`${inputClasses} ${className ?? ""}`} {...props} />;
}

export function TextArea({ className, ...props }: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      spellCheck={false}
      className={`min-h-28 ${inputClasses} ${className ?? ""}`}
      {...props}
    />
  );
}

export function ErrorBanner({ children }: { children: ReactNode }) {
  return (
    <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700 dark:bg-red-950 dark:text-red-400">
      {children}
    </p>
  );
}

export function Panel({ children, mono }: { children: ReactNode; mono?: boolean }) {
  return (
    <div
      className={`rounded-lg border border-zinc-300 bg-white p-3 text-sm dark:border-zinc-700 dark:bg-zinc-900 ${
        mono ? "font-mono whitespace-pre-wrap break-words" : ""
      }`}
    >
      {children}
    </div>
  );
}

export function Button(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={`self-start rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-700 disabled:opacity-50 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-300 ${
        props.className ?? ""
      }`}
    />
  );
}
