import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { Bar, Dot, GlassCard, Kpi, Pills, SectionTitle } from "@/components/ui-kit";
import { CONSULTORAS, UNIDADE, evolucao, fmt, pct } from "@/lib/mock-data";
import { useApp } from "@/lib/app-context";
import { useState } from "react";
import { Sparkles } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dashboard da unidade — Egali Vila Mariana" },
      {
        name: "description",
        content:
          "Acompanhe meta, realizado, ritmo e insights da unidade Egali Vila Mariana em um painel visual.",
      },
      { property: "og:title", content: "Dashboard da unidade — Egali Vila Mariana" },
      {
        property: "og:description",
        content: "Meta, realizado, ritmo e performance das consultoras em tempo real.",
      },
    ],
  }),
  component: Dashboard,
});

const FILTROS = ["Todas", "Acima", "Próximas", "Abaixo"] as const;

function Dashboard() {
  const { perfil } = useApp();
  const [filtro, setFiltro] = useState<(typeof FILTROS)[number]>("Todas");
  const atingimento = pct(UNIDADE.realizado, UNIDADE.meta);
  const faltam = UNIDADE.meta - UNIDADE.realizado;
  const ptsPorVenda = UNIDADE.realizado / UNIDADE.vendas;

  const lista = CONSULTORAS.filter((c) => {
    const p = pct(c.realizado, c.meta);
    if (filtro === "Acima") return p >= 100;
    if (filtro === "Próximas") return p >= 75 && p < 100;
    if (filtro === "Abaixo") return p < 75;
    return true;
  });

  return (
    <AppShell>
      {perfil === "Consultora" ? null : null}
      <GlassCard className="bg-white/60">
        <div className="pointer-events-none absolute -right-16 -top-16 size-56 rounded-full bg-accent2/20 blur-2xl" />
        <div className="relative flex flex-wrap items-end justify-between gap-6">
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
              Meta da unidade · {UNIDADE.periodoLabel}
            </div>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="font-display text-5xl font-extrabold tracking-tight">
                {fmt(UNIDADE.realizado)}
              </span>
              <span className="text-lg font-medium text-slate-400">/ {fmt(UNIDADE.meta)} pts</span>
            </div>
            <div className="mt-4 w-full max-w-xl">
              <div className="mb-1.5 flex justify-between text-[13px] font-medium text-slate-500">
                <span>
                  Atingimento{" "}
                  <span className="font-display text-base font-bold text-brand">
                    {fmt(atingimento, 1)}%
                  </span>
                </span>
                <span>
                  Faltam <span className="font-semibold text-ink">{fmt(faltam)} pts</span>
                </span>
              </div>
              <Bar value={atingimento} height="h-3" />
            </div>
          </div>

          <div className="w-full max-w-xs rounded-2xl border border-white/70 bg-white/70 p-4 backdrop-blur">
            <div className="flex items-center justify-between">
              <span className="text-[13px] font-semibold">Ritmo da unidade</span>
              <span className="size-2.5 rounded-full bg-amberx ring-4 ring-amberx/20" />
            </div>
            <div className="mt-3 grid grid-cols-2 gap-3">
              <div>
                <div className="text-[11px] text-slate-400">Meta diária</div>
                <div className="font-display text-xl font-bold">{fmt(UNIDADE.metaDiaria, 1)}</div>
              </div>
              <div>
                <div className="text-[11px] text-slate-400">Média atual</div>
                <div className="font-display text-xl font-bold">
                  {fmt(UNIDADE.mediaDiaria, 1)}{" "}
                  <span className="text-xs font-medium text-slate-400">/dia</span>
                </div>
              </div>
            </div>
            <div className="mt-3 rounded-xl bg-amberx/10 px-3 py-2 text-[12px] leading-snug text-amber-700 ring-1 ring-amber-500/15">
              Para bater a meta, a unidade precisa aumentar o ritmo em ~14%.
            </div>
          </div>
        </div>

        <div className="relative mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
          <Kpi label="Total de vendas" value={fmt(UNIDADE.vendas)} hint="▲ 8% vs anterior" tone="mint" />
          <Kpi
            label="Pontos por venda"
            value={fmt(ptsPorVenda, 1)}
            hint="▲ 2,4 pts"
            tone="mint"
          />
          <Kpi
            label="Média diária"
            value={fmt(UNIDADE.mediaDiaria, 1)}
            hint="▼ abaixo do alvo"
            tone="amberx"
          />
          <Kpi
            label="Projeção de fechamento"
            value={fmt(UNIDADE.projecao)}
            hint={`▼ ${fmt(UNIDADE.meta - UNIDADE.projecao)} pts da meta`}
            tone="rose"
          />
        </div>
      </GlassCard>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
        <GlassCard className="xl:col-span-2">
          <SectionTitle
            right={<Pills options={FILTROS} value={filtro} onChange={setFiltro} size="sm" />}
          >
            Performance das consultoras
          </SectionTitle>

          <div className="mt-4 space-y-3">
            {lista.map((c) => {
              const p = pct(c.realizado, c.meta);
              const faltantes = Math.max(0, c.meta - c.realizado);
              return (
                <div key={c.id} className="glass-inset flex items-center gap-4 rounded-2xl p-4">
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
                      <span
                        className={`font-display text-sm font-bold ${
                          c.cor === "brand"
                            ? "text-brand"
                            : c.cor === "accent2"
                              ? "text-accent2"
                              : "text-mint"
                        }`}
                      >
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
                          <b>{fmt(faltantes)}</b> faltantes
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
          <SectionTitle
            right={
              <span className="rounded-lg bg-white/60 px-2 py-1 text-[11px] font-medium text-slate-400">
                pts acumulados
              </span>
            }
          >
            Evolução da unidade
          </SectionTitle>
          <div className="mt-4 flex h-40 items-end gap-2">
            {evolucao.map((d, i) => (
              <div key={d.dia} className="flex flex-1 flex-col items-center gap-1.5">
                <div
                  className={`w-full rounded-t-lg ${
                    i === evolucao.length - 1
                      ? "bg-gradient-to-t from-brand to-accent2"
                      : "bg-brand/40"
                  }`}
                  style={{ height: `${(d.pts / 700) * 100}%` }}
                />
                <span
                  className={`text-[9px] ${i === evolucao.length - 1 ? "font-semibold text-brand" : "text-slate-400"}`}
                >
                  {d.dia}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-center justify-between rounded-xl bg-white/60 px-3 py-2 text-[12px]">
            <span className="text-slate-400">Vendas até hoje</span>
            <span className="font-display font-bold">
              {UNIDADE.vendas} <span className="text-[11px] text-mint">▲ 32%</span>
            </span>
          </div>
        </GlassCard>
      </div>

      <GlassCard>
        <div className="flex items-center gap-2">
          <span className="grid size-7 place-items-center rounded-lg bg-brand/10 text-brand">
            <Sparkles className="size-4" />
          </span>
          <h2 className="font-display text-lg font-bold">Insights da semana</h2>
        </div>
        <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
          <div className="glass-inset flex items-start gap-3 rounded-2xl p-3">
            <Dot tone="mint" />
            <p className="text-[13px] leading-snug text-slate-600">
              <b className="text-ink">Amanda</b> já bateu a meta e está{" "}
              <b className="text-mint">8% acima</b> do ritmo da unidade.
            </p>
          </div>
          <div className="glass-inset flex items-start gap-3 rounded-2xl p-3">
            <Dot tone="amberx" />
            <p className="text-[13px] leading-snug text-slate-600">
              <b className="text-ink">Jessica</b> precisa aumentar a média de pontos por venda para
              atingir a meta.
            </p>
          </div>
          <div className="glass-inset flex items-start gap-3 rounded-2xl p-3">
            <Dot tone="rose" />
            <p className="text-[13px] leading-snug text-slate-600">
              A unidade precisa realizar <b className="text-rose">{fmt(faltam)} pts</b> nos próximos{" "}
              {UNIDADE.diasRestantes} dias.
            </p>
          </div>
          <div className="glass-inset flex items-start gap-3 rounded-2xl p-3">
            <Dot tone="brand" />
            <p className="text-[13px] leading-snug text-slate-600">
              🎯 <b className="text-ink">Carol</b> está a cerca de <b>3 vendas</b> de fechar a meta.
            </p>
          </div>
        </div>
      </GlassCard>
    </AppShell>
  );
}
