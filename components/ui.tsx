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
      <label className="font-display text-xs font-bold uppercase tracking-wide text-muted">
        {label}
      </label>
      {children}
      {hint && <p className="text-xs text-muted">{hint}</p>}
    </div>
  );
}

const inputClasses =
  "rounded-md border border-border bg-bg px-3 py-2 text-sm text-ink outline-none placeholder:text-muted focus-visible:border-amber focus-visible:ring-2 focus-visible:ring-amber/40 transition-colors";

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
    <p className="border-l-2 border-red bg-red/5 px-3 py-2 text-sm text-red">
      <span className="font-display font-bold">error:</span> {children}
    </p>
  );
}

export function Panel({ children, mono }: { children: ReactNode; mono?: boolean }) {
  return (
    <div
      className={`rounded-md border border-border bg-surface p-3 text-sm text-ink ${
        mono ? "whitespace-pre-wrap break-words" : ""
      }`}
    >
      {children}
    </div>
  );
}

export function PromptLine({ command }: { command: string }) {
  return (
    <div className="overflow-x-auto rounded-md border border-border bg-surface px-3 py-2.5 text-sm whitespace-pre">
      <span className="text-amber">$</span> <span className="text-ink">{command}</span>{" "}
      <span aria-hidden className="cursor-blink text-amber">
        ▍
      </span>
    </div>
  );
}

export function Button(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={`self-start rounded-md border border-amber bg-transparent px-4 py-2 text-sm font-display font-bold text-amber transition-colors hover:bg-amber hover:text-bg disabled:opacity-50 ${
        props.className ?? ""
      }`}
    />
  );
}
