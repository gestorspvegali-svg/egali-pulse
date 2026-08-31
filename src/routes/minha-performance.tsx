import { createFileRoute } from "@tanstack/react-router";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { AppShell } from "@/components/AppShell";
import { Bar, GlassCard, Kpi, SectionTitle } from "@/components/ui-kit";
import { CONSULTORAS, UNIDADE, evolucao, fmt, pct } from "@/lib/mock-data";

export const Route = createFileRoute("/minha-performance")({
  head: () => ({
    meta: [
      { title: "Minha Performance — Egali Vila Mariana" },
      {
        name: "description",
        content:
          "Veja sua meta, quanto falta, seu ritmo diário e quantas vendas você precisa para bater a meta.",
      },
      { property: "og:title", content: "Minha Performance — Egali Vila Mariana" },
      {
        property: "og:description",
        content: "Meta pessoal, evolução e indicadores da consultora.",
      },
    ],
  }),
  component: MinhaPerformance,
});

function MinhaPerformance() {
  const eu = CONSULTORAS[0];
  const p = pct(eu.realizado, eu.meta);
  const faltam = eu.meta - eu.realizado;
  const ptsPorVenda = eu.realizado / eu.vendas;
  const vendasNecessarias = Math.ceil(faltam / ptsPorVenda);
  const metaDiaria = faltam / UNIDADE.diasRestantes;
  const mediaAtual = eu.realizado / UNIDADE.diasDecorridos;
  const projecao = Math.round(eu.realizado + mediaAtual * UNIDADE.diasRestantes);

  return (
    <AppShell>
      <GlassCard className="bg-white/60">
        <div className="pointer-events-none absolute -right-16 -top-16 size-56 rounded-full bg-accent2/20 blur-2xl" />
        <div className="relative">
          <h1 className="font-display text-2xl font-extrabold tracking-tight">
            Olá, {eu.nome} 👋
          </h1>
          <p className="mt-1 text-[13px] text-slate-500">
            Veja como está sua performance neste período.
          </p>

          <div className="mt-6 flex flex-wrap items-end justify-between gap-6">
            <div className="min-w-0">
              <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                Minha meta · {UNIDADE.periodoLabel}
              </div>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="font-display text-5xl font-extrabold tracking-tight">
                  {fmt(eu.realizado)}
                </span>
                <span className="text-lg font-medium text-slate-400">/ {fmt(eu.meta)} pts</span>
              </div>
              <div className="mt-4 w-full max-w-xl">
                <div className="mb-1.5 flex justify-between text-[13px] font-medium text-slate-500">
                  <span>
                    Atingimento{" "}
                    <span className="font-display text-base font-bold text-brand">
                      {fmt(p, 1)}%
                    </span>
                  </span>
                  <span>
                    Faltam <span className="font-semibold text-ink">{fmt(faltam)} pts</span>
                  </span>
                </div>
                <Bar value={p} height="h-3" />
              </div>
            </div>

            <div className="w-full max-w-xs rounded-2xl border border-white/70 bg-white/70 p-4">
              <div className="text-[13px] font-semibold">O que preciso fazer?</div>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="font-display text-4xl font-extrabold text-brand">
                  {vendasNecessarias}
                </span>
                <span className="text-sm font-medium text-slate-500">vendas</span>
              </div>
              <p className="mt-2 text-[12px] leading-snug text-slate-500">
                Com sua média atual de <b className="text-ink">{fmt(ptsPorVenda, 1)} pts</b> por
                venda, você precisa de aproximadamente {vendasNecessarias} vendas para atingir sua
                meta.
              </p>
            </div>
          </div>
        </div>
      </GlassCard>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
        <GlassCard>
          <SectionTitle>Meu ritmo</SectionTitle>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <Kpi label="Meta diária necessária" value={`${fmt(metaDiaria, 1)} pts`} />
            <Kpi label="Média atual" value={`${fmt(mediaAtual, 1)} pts`} />
            <Kpi label="Dias restantes" value={`${UNIDADE.diasRestantes}`} />
            <Kpi
              label="Projeção de fechamento"
              value={fmt(projecao)}
              hint={projecao >= eu.meta ? "▲ acima da meta" : "▼ abaixo da meta"}
              tone={projecao >= eu.meta ? "mint" : "rose"}
            />
          </div>
        </GlassCard>

        <GlassCard className="xl:col-span-2">
          <SectionTitle
            right={
              <span className="rounded-lg bg-white/60 px-2 py-1 text-[11px] font-medium text-slate-400">
                pts acumulados
              </span>
            }
          >
            Minha evolução
          </SectionTitle>
          <div className="mt-4 h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={evolucao} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
                <CartesianGrid stroke="oklch(0.929 0.013 255.508)" strokeDasharray="3 3" />
                <XAxis dataKey="dia" tickLine={false} axisLine={false} fontSize={11} />
                <YAxis tickLine={false} axisLine={false} fontSize={11} />
                <Tooltip
                  contentStyle={{
                    borderRadius: 12,
                    border: "1px solid var(--glass-border)",
                    fontSize: 12,
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="pts"
                  stroke="var(--brand)"
                  strokeWidth={2.5}
                  dot={{ r: 3, fill: "var(--brand)" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>
      </div>

      <GlassCard>
        <SectionTitle>Meus indicadores</SectionTitle>
        <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-5">
          <Kpi label="Total de vendas" value={`${eu.vendas}`} hint="▲ 2 vs período anterior" tone="mint" />
          <Kpi label="Pontos" value={fmt(eu.realizado)} hint="▲ 12%" tone="mint" />
          <Kpi label="Pontos por venda" value={fmt(ptsPorVenda, 1)} hint="▲ 1,8 pts" tone="mint" />
          <Kpi label="Ticket médio" value="R$ 24.180" hint="▼ 3%" tone="rose" />
          <Kpi label="Evolução vs anterior" value="+9,4%" hint="crescimento" tone="brand" />
        </div>
      </GlassCard>
    </AppShell>
  );
}
