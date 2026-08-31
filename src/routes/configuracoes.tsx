import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { GlassCard, PageHeader, RestrictedNotice, SectionTitle } from "@/components/ui-kit";
import { CONSULTORAS, UNIDADE } from "@/lib/mock-data";
import { useApp } from "@/lib/app-context";

export const Route = createFileRoute("/configuracoes")({
  head: () => ({
    meta: [
      { title: "Configurações — Egali Vila Mariana" },
      {
        name: "description",
        content: "Dados da unidade, acessos das consultoras e preferências do painel comercial.",
      },
      { property: "og:title", content: "Configurações — Egali Vila Mariana" },
      { property: "og:description", content: "Unidade, equipe e acessos do painel." },
    ],
  }),
  component: Configuracoes,
});

function Configuracoes() {
  const { perfil } = useApp();

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
        <PageHeader title="Configurações" subtitle="Dados da unidade e acessos da equipe." />
      </GlassCard>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
        <GlassCard>
          <SectionTitle>Unidade</SectionTitle>
          <div className="mt-4 space-y-3">
            <label className="glass-inset flex items-center gap-3 rounded-2xl p-3">
              <span className="flex-1 text-[13px] font-medium text-slate-600">Nome da unidade</span>
              <input
                defaultValue={UNIDADE.nome}
                className="w-56 rounded-xl border border-white/70 bg-white px-3 py-2 text-right text-sm font-medium outline-none focus:ring-2 focus:ring-brand/30"
              />
            </label>
            <label className="glass-inset flex items-center gap-3 rounded-2xl p-3">
              <span className="flex-1 text-[13px] font-medium text-slate-600">Período padrão</span>
              <select className="rounded-xl border border-white/70 bg-white px-3 py-2 text-sm font-medium">
                <option>Mês</option>
                <option>Ciclo</option>
                <option>Semana</option>
              </select>
            </label>
            <label className="glass-inset flex items-center gap-3 rounded-2xl p-3">
              <span className="flex-1 text-[13px] font-medium text-slate-600">
                Dias úteis no mês
              </span>
              <input
                type="number"
                defaultValue={22}
                className="w-24 rounded-xl border border-white/70 bg-white px-3 py-2 text-right font-display text-sm font-bold outline-none focus:ring-2 focus:ring-brand/30"
              />
            </label>
          </div>
        </GlassCard>

        <GlassCard>
          <SectionTitle>Acessos</SectionTitle>
          <div className="mt-4 space-y-3">
            <div className="glass-inset flex items-center justify-between rounded-2xl p-3">
              <div className="min-w-0">
                <div className="font-display font-bold">Ricardo Alves</div>
                <div className="text-[12px] text-slate-400">Gestor da unidade</div>
              </div>
              <span className="rounded-lg bg-brand/10 px-2.5 py-1 text-[11px] font-semibold text-brand">
                Gestor
              </span>
            </div>
            {CONSULTORAS.map((c) => (
              <div key={c.id} className="glass-inset flex items-center justify-between rounded-2xl p-3">
                <div className="min-w-0">
                  <div className="font-display font-bold">{c.nome}</div>
                  <div className="text-[12px] text-slate-400">Consultora comercial</div>
                </div>
                <span className="rounded-lg bg-slate-100 px-2.5 py-1 text-[11px] font-semibold text-slate-500">
                  Consultora
                </span>
              </div>
            ))}
          </div>
          <p className="mt-4 text-[12px] text-slate-400">
            Consultoras visualizam apenas a própria performance e não podem editar metas ou
            resultados.
          </p>
        </GlassCard>
      </div>
    </AppShell>
  );
}
