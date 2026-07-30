import { ToolNav } from "@/components/tool-nav";

export default function ToolsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex justify-center px-4 py-8">
      <main className="w-full max-w-3xl">
        <ToolNav />
        <div className="mt-6">{children}</div>
      </main>
    </div>
  );
}
