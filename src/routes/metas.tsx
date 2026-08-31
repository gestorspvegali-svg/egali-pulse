import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ChevronDown } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { Bar, GlassCard, PageHeader, RestrictedNotice, SectionTitle } from "@/components/ui-kit";
import { CONSULTORAS, METAS_HIERARQUIA, fmt, pct } from "@/lib/mock-data";
import { useApp } from "@/lib/app-context";

export const Route = createFileRoute("/metas")({
  head: () => ({
    meta: [
      { title: "Metas — Egali Vila Mariana" },
      {
        name: "description",
        content:
          "Configure metas anuais, semestrais, de ciclo, mensais e semanais da unidade e das consultoras.",
      },
      { property: "og:title", content: "Metas — Egali Vila Mariana" },
      { property: "og:description", content: "Hierarquia de metas: ano, semestre, ciclo, mês, semana." },
    ],
  }),
  component: Metas,
});

const NIVEIS = ["Meta anual", "Meta semestral", "Meta do ciclo", "Meta mensal", "Meta semanal"];
const VALORES_UNIDADE = [30000, 15000, 7500, 2500, 580];
const VALORES_INDIVIDUAIS = [9600, 4800, 2400, 800, 185];

function Metas() {
  const { perfil } = useApp();
  const [selecionada, setSelecionada] = useState(CONSULTORAS[0]!.id);

  if (perfil === "Consultora") {
    return (
      <AppShell>
        <RestrictedNotice />
      </AppShell>
    );
  }

  return (
    <AppShell>
      <GlassCard>
        <PageHeader
          title="Metas"
          subtitle="Defina as metas da unidade e de cada consultora. As metas menores compõem a meta maior."
        />
      </GlassCard>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
        <GlassCard>
          <SectionTitle>Metas da unidade</SectionTitle>
          <div className="mt-4 space-y-3">
            {NIVEIS.map((n, i) => (
              <label key={n} className="glass-inset flex items-center gap-3 rounded-2xl p-3">
                <span className="flex-1 text-[13px] font-medium text-slate-600">{n}</span>
                <input
                  type="number"
                  defaultValue={VALORES_UNIDADE[i]}
                  className="w-32 rounded-xl border border-white/70 bg-white px-3 py-2 text-right font-display text-sm font-bold outline-none focus:ring-2 focus:ring-brand/30"
                />
                <span className="text-[11px] text-slate-400">pts</span>
              </label>
            ))}
          </div>
        </GlassCard>

        <GlassCard>
          <SectionTitle
            right={
              <select
                value={selecionada}
                onChange={(e) => setSelecionada(e.target.value)}
                className="rounded-xl border border-white/60 bg-white/60 px-3 py-1.5 text-[12px] font-medium text-slate-600"
              >
                {CONSULTORAS.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.nome}
                  </option>
                ))}
              </select>
            }
          >
            Metas individuais
          </SectionTitle>
          <div className="mt-4 space-y-3">
            {NIVEIS.map((n, i) => (
              <label
                key={n}
                className="glass-inset flex items-center gap-3 rounded-2xl p-3"
              >
                <span className="flex-1 text-[13px] font-medium text-slate-600">{n}</span>
                <input
                  type="number"
                  defaultValue={VALORES_INDIVIDUAIS[i]}
                  className="w-32 rounded-xl border border-white/70 bg-white px-3 py-2 text-right font-display text-sm font-bold outline-none focus:ring-2 focus:ring-brand/30"
                />
                <span className="text-[11px] text-slate-400">pts</span>
              </label>
            ))}
          </div>
        </GlassCard>
      </div>

      <GlassCard>
        <SectionTitle>Hierarquia de metas</SectionTitle>
        <div className="mt-4 space-y-1">
          {METAS_HIERARQUIA.map((m, i) => {
            const p = pct(m.realizado, m.meta);
            return (
              <div key={m.nivel}>
                <div className="glass-inset rounded-2xl p-4">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <div>
                      <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                        {m.nivel}
                      </span>
                      <span className="ml-2 font-display font-bold">{m.periodo}</span>
                    </div>
                    <span className="text-[13px] text-slate-500">
                      <b className="text-ink">{fmt(m.realizado)}</b> / {fmt(m.meta)} pts ·{" "}
                      <b className="text-brand">{fmt(p, 1)}%</b>
                    </span>
                  </div>
                  <div className="mt-2">
                    <Bar value={p} />
                  </div>
                </div>
                {i < METAS_HIERARQUIA.length - 1 ? (
                  <div className="flex justify-center py-1 text-slate-300">
                    <ChevronDown className="size-4" />
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </GlassCard>
    </AppShell>
  );
}
