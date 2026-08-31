import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function GlassCard({
  children,
  className,
  radius = "3xl",
}: {
  children: ReactNode;
  className?: string;
  radius?: "2xl" | "3xl";
}) {
  return (
    <section
      className={cn(
        "glass-panel relative overflow-hidden p-6",
        radius === "3xl" ? "rounded-3xl" : "rounded-2xl",
        className,
      )}
    >
      {children}
    </section>
  );
}

export function SectionTitle({ children, right }: { children: ReactNode; right?: ReactNode }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <h2 className="font-display text-lg font-bold">{children}</h2>
      {right}
    </div>
  );
}

export function Bar({
  value,
  tone = "brand",
  height = "h-2",
}: {
  value: number;
  tone?: "brand" | "accent2" | "mint" | "amberx" | "rose";
  height?: string;
}) {
  const tones: Record<string, string> = {
    brand: "bar-brand",
    accent2: "bg-gradient-to-r from-accent2 to-mint",
    mint: "bg-gradient-to-r from-mint to-brand",
    amberx: "bg-gradient-to-r from-amberx to-rose",
    rose: "bg-rose",
  };
  return (
    <div
      className={cn(
        "w-full overflow-hidden rounded-full bg-slate-100 ring-1 ring-black/5",
        height,
      )}
    >
      <div
        className={cn("h-full rounded-full transition-[width] duration-700", tones[tone])}
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  );
}

export function Kpi({
  label,
  value,
  hint,
  tone = "muted",
}: {
  label: string;
  value: string;
  hint?: string;
  tone?: "muted" | "mint" | "amberx" | "rose" | "brand";
}) {
  const tones: Record<string, string> = {
    muted: "text-slate-400",
    mint: "text-mint",
    amberx: "text-amberx",
    rose: "text-rose",
    brand: "text-brand",
  };
  return (
    <div className="glass-inset rounded-2xl p-4">
      <div className="text-[11px] text-slate-400">{label}</div>
      <div className="font-display text-2xl font-bold">{value}</div>
      {hint ? <div className={cn("text-[11px] font-medium", tones[tone])}>{hint}</div> : null}
    </div>
  );
}

export function Pills<T extends string>({
  options,
  value,
  onChange,
  size = "md",
}: {
  options: readonly T[];
  value: T;
  onChange: (v: T) => void;
  size?: "sm" | "md";
}) {
  return (
    <div className="flex items-center gap-1 overflow-x-auto rounded-xl border border-white/60 bg-white/40 p-1 font-medium text-slate-500">
      {options.map((o) => (
        <button
          key={o}
          type="button"
          onClick={() => onChange(o)}
          className={cn(
            "shrink-0 rounded-lg transition-colors",
            size === "sm" ? "px-2.5 py-1 text-[12px]" : "px-3 py-1.5 text-[13px]",
            o === value ? "bg-white text-brand shadow-sm" : "text-slate-400 hover:text-slate-600",
          )}
        >
          {o}
        </button>
      ))}
    </div>
  );
}

export function Dot({ tone }: { tone: "mint" | "amberx" | "rose" | "brand" }) {
  const tones = {
    mint: "bg-mint",
    amberx: "bg-amberx",
    rose: "bg-rose",
    brand: "bg-brand",
  } as const;
  return <span className={cn("mt-0.5 size-2.5 shrink-0 rounded-full", tones[tone])} />;
}

export function PageHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div>
      <h1 className="font-display text-2xl font-extrabold tracking-tight">{title}</h1>
      {subtitle ? <p className="mt-1 text-[13px] text-slate-500">{subtitle}</p> : null}
    </div>
  );
}

export function RestrictedNotice() {
  return (
    <GlassCard className="text-center">
      <p className="font-display text-lg font-bold">Área exclusiva do gestor</p>
      <p className="mx-auto mt-2 max-w-md text-[13px] text-slate-500">
        Como consultora, você acompanha sua meta, sua evolução e suas vendas. Metas e resultados são
        configurados pelo gestor da unidade.
      </p>
    </GlassCard>
  );
}
