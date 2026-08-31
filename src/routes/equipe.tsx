import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  Bar as RBar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { AppShell } from "@/components/AppShell";
import { Bar, GlassCard, PageHeader, Pills, RestrictedNotice, SectionTitle } from "@/components/ui-kit";
import { CONSULTORAS, fmt, pct } from "@/lib/mock-data";
import { useApp } from "@/lib/app-context";

export const Route = createFileRoute("/equipe")({
  head: () => ({
    meta: [
      { title: "Equipe — Egali Vila Mariana" },
      {
        name: "description",
        content: "Ranking das consultoras com meta, realizado, atingimento e pontos por venda.",
      },
      { property: "og:title", content: "Equipe — Egali Vila Mariana" },
      { property: "og:description", content: "Ranking e comparativo meta x realizado da equipe." },
    ],
  }),
  component: Equipe,
});

const FILTROS = ["Todas", "Acima da meta", "Próximas da meta", "Abaixo da meta"] as const;

function Equipe() {
  const { perfil } = useApp();
  const [filtro, setFiltro] = useState<(typeof FILTROS)[number]>("Todas");

  if (perfil === "Consultora") {
    return (
      <AppShell>
        <RestrictedNotice />
      </AppShell>
    );
  }

  const lista = CONSULTORAS.filter((c) => {
    const p = pct(c.realizado, c.meta);
    if (filtro === "Acima da meta") return p >= 100;
    if (filtro === "Próximas da meta") return p >= 75 && p < 100;
    if (filtro === "Abaixo da meta") return p < 75;
    return true;
  }).sort((a, b) => pct(b.realizado, b.meta) - pct(a.realizado, a.meta));

  const chartData = CONSULTORAS.map((c) => ({
    nome: c.nome,
    Meta: c.meta,
    Realizado: c.realizado,
  }));

  return (
    <AppShell>
      <GlassCard>
        <PageHeader
          title="Performance das consultoras"
          subtitle="Ranking por atingimento de meta no período selecionado."
        />
        <div className="mt-4">
          <Pills options={FILTROS} value={filtro} onChange={setFiltro} size="sm" />
        </div>

        <div className="mt-4 space-y-3">
          {lista.map((c, i) => {
            const p = pct(c.realizado, c.meta);
            const faltantes = Math.max(0, c.meta - c.realizado);
            return (
              <div key={c.id} className="glass-inset flex items-center gap-4 rounded-2xl p-4">
                <span className="w-5 shrink-0 text-center font-display text-sm font-bold text-slate-400">
                  {i + 1}
                </span>
                <div
                  className={`grid size-11 shrink-0 place-items-center rounded-xl font-display font-bold ${
                    c.cor === "brand"
                      ? "bg-brand/10 text-brand"
                      : c.cor === "accent2"
                        ? "bg-accent2/10 text-accent2"
                        : "bg-mint/10 text-mint"
                  }`}
                >
                  {c.inicial}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="truncate font-display font-bold">{c.nome}</span>
                    <span className="font-display text-sm font-bold text-brand">
                      {fmt(p, 1)}%
                    </span>
                  </div>
                  <div className="mt-1.5">
                    <Bar value={p} tone={c.cor} />
                  </div>
                  <div className="mt-1.5 flex flex-wrap gap-x-4 gap-y-0.5 text-[11px] text-slate-400">
                    <span>
                      <b className="text-slate-600">{fmt(c.realizado)}</b> / {fmt(c.meta)} pts
                    </span>
                    <span>
                      <b className="text-slate-600">{c.vendas}</b> vendas
                    </span>
                    <span>
                      <b className="text-slate-600">{fmt(c.realizado / c.vendas, 1)}</b> pts/venda
                    </span>
                    {faltantes > 0 ? (
                      <span className="text-rose">
                        <b>{fmt(faltantes)}</b> pts faltantes
                      </span>
                    ) : (
                      <span className="text-mint">Meta batida</span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </GlassCard>

      <GlassCard>
        <SectionTitle>Meta x Realizado</SectionTitle>
        <div className="mt-4 h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
              <CartesianGrid stroke="oklch(0.929 0.013 255.508)" strokeDasharray="3 3" />
              <XAxis dataKey="nome" tickLine={false} axisLine={false} fontSize={11} />
              <YAxis tickLine={false} axisLine={false} fontSize={11} />
              <Tooltip
                contentStyle={{
                  borderRadius: 12,
                  border: "1px solid var(--glass-border)",
                  fontSize: 12,
                }}
              />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <RBar dataKey="Meta" fill="oklch(0.929 0.013 255.508)" radius={[8, 8, 0, 0]} />
              <RBar dataKey="Realizado" fill="var(--brand)" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </GlassCard>
    </AppShell>
  );
}
