import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { GlassCard, PageHeader, RestrictedNotice, SectionTitle } from "@/components/ui-kit";
import { CONSULTORAS, UNIDADE } from "@/lib/mock-data";
import { useApp } from "@/lib/app-context";

export const Route = createFileRoute("/atualizar-resultados")({
  head: () => ({
    meta: [
      { title: "Atualizar resultados — Egali Vila Mariana" },
      {
        name: "description",
        content: "Lançamento manual de pontos e vendas da unidade e das consultoras por período.",
      },
      { property: "og:title", content: "Atualizar resultados — Egali Vila Mariana" },
      { property: "og:description", content: "Lançamento manual dos números do período." },
    ],
  }),
  component: Atualizar,
});

function Atualizar() {
  const { perfil } = useApp();
  const [salvo, setSalvo] = useState(false);
  const [ultima, setUltima] = useState(UNIDADE.ultimaAtualizacao);

  if (perfil === "Consultora") {
    return (
      <AppShell>
        <RestrictedNotice />
      </AppShell>
    );
  }

  const salvar = () => {
    const agora = new Date();
    setUltima(
      `${agora.toLocaleDateString("pt-BR")} às ${agora.toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
      })}`,
    );
    setSalvo(true);
  };

  return (
    <AppShell>
      <GlassCard>
        <PageHeader
          title="Atualizar resultados"
          subtitle="Insira manualmente os números do período. Nenhuma integração automática nesta versão."
        />
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <label className="text-[13px] font-medium text-slate-500">Período</label>
          <select className="rounded-xl border border-white/60 bg-white/60 px-3 py-2 text-[13px] font-medium text-slate-600">
            <option>Agosto 2026</option>
            <option>Julho 2026</option>
            <option>Junho 2026</option>
          </select>
          <span className="text-[12px] text-slate-400">Última atualização: {ultima}</span>
        </div>
      </GlassCard>

      <GlassCard>
        <SectionTitle>Unidade</SectionTitle>
        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <label className="glass-inset flex items-center gap-3 rounded-2xl p-3">
            <span className="flex-1 text-[13px] font-medium text-slate-600">Pontos realizados</span>
            <input
              type="number"
              defaultValue={UNIDADE.realizado}
              className="w-32 rounded-xl border border-white/70 bg-white px-3 py-2 text-right font-display text-sm font-bold outline-none focus:ring-2 focus:ring-brand/30"
            />
          </label>
          <label className="glass-inset flex items-center gap-3 rounded-2xl p-3">
            <span className="flex-1 text-[13px] font-medium text-slate-600">Número de vendas</span>
            <input
              type="number"
              defaultValue={UNIDADE.vendas}
              className="w-32 rounded-xl border border-white/70 bg-white px-3 py-2 text-right font-display text-sm font-bold outline-none focus:ring-2 focus:ring-brand/30"
            />
          </label>
        </div>
      </GlassCard>

      <GlassCard>
        <SectionTitle>Consultoras</SectionTitle>
        <div className="mt-4 space-y-3">
          {CONSULTORAS.map((c) => (
            <div
              key={c.id}
              className="glass-inset grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-2xl p-3 sm:flex sm:justify-between"
            >
              <div className="flex min-w-0 items-center gap-3">
                <div
                  className={`grid size-10 shrink-0 place-items-center rounded-xl font-display font-bold ${
                    c.cor === "brand"
                      ? "bg-brand/10 text-brand"
                      : c.cor === "accent2"
                        ? "bg-accent2/10 text-accent2"
                        : "bg-mint/10 text-mint"
                  }`}
                >
                  {c.inicial}
                </div>
                <span className="truncate font-display font-bold">{c.nome}</span>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <label className="flex items-center gap-2">
                  <span className="text-[12px] text-slate-500">Pontos</span>
                  <input
                    type="number"
                    defaultValue={c.realizado}
                    className="w-24 rounded-xl border border-white/70 bg-white px-3 py-2 text-right font-display text-sm font-bold outline-none focus:ring-2 focus:ring-brand/30"
                  />
                </label>
                <label className="flex items-center gap-2">
                  <span className="text-[12px] text-slate-500">Vendas</span>
                  <input
                    type="number"
                    defaultValue={c.vendas}
                    className="w-20 rounded-xl border border-white/70 bg-white px-3 py-2 text-right font-display text-sm font-bold outline-none focus:ring-2 focus:ring-brand/30"
                  />
                </label>
              </div>
            </div>
          ))}
        </div>

        {salvo ? (
          <div className="mt-5 flex items-center gap-2 rounded-2xl bg-mint/10 px-4 py-3 text-[13px] font-medium text-mint ring-1 ring-mint/20">
            <Check className="size-4" /> Resultados atualizados com sucesso
          </div>
        ) : null}

        <button
          type="button"
          onClick={salvar}
          className="mt-5 w-full rounded-2xl bg-gradient-to-r from-brand to-accent2 px-6 py-4 font-display text-base font-bold text-white shadow-md transition-opacity hover:opacity-95"
        >
          Salvar atualização
        </button>
      </GlassCard>
    </AppShell>
  );
}
