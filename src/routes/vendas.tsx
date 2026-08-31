import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { GlassCard, Kpi, PageHeader, Pills } from "@/components/ui-kit";
import { CONSULTORAS, DESTINOS, VENDAS, fmt } from "@/lib/mock-data";
import { useApp } from "@/lib/app-context";

export const Route = createFileRoute("/vendas")({
  head: () => ({
    meta: [
      { title: "Vendas — Egali Vila Mariana" },
      {
        name: "description",
        content: "Vendas consolidadas da unidade com pontos, valores, destinos e status.",
      },
      { property: "og:title", content: "Vendas — Egali Vila Mariana" },
      { property: "og:description", content: "Tabela de vendas consolidadas com filtros." },
    ],
  }),
  component: Vendas,
});

const STATUS = ["Todos", "Confirmada", "Em análise", "Cancelada"] as const;

function Vendas() {
  const { perfil } = useApp();
  const [status, setStatus] = useState<(typeof STATUS)[number]>("Todos");
  const [destino, setDestino] = useState<string>("Todos");
  const [consultora, setConsultora] = useState<string>(
    perfil === "Consultora" ? "Carol" : "Todas",
  );

  const lista = useMemo(
    () =>
      VENDAS.filter((v) => {
        if (perfil === "Consultora" && v.consultora !== "Carol") return false;
        if (status !== "Todos" && v.status !== status) return false;
        if (destino !== "Todos" && v.destino !== destino) return false;
        if (consultora !== "Todas" && v.consultora !== consultora) return false;
        return true;
      }),
    [status, destino, consultora, perfil],
  );

  const totalPontos = lista.reduce((s, v) => s + v.pontos, 0);
  const media = lista.length ? totalPontos / lista.length : 0;

  return (
    <AppShell>
      <GlassCard>
        <PageHeader
          title={perfil === "Consultora" ? "Minhas vendas" : "Vendas consolidadas"}
          subtitle="Somente identificadores internos e nomes genéricos de venda."
        />
        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
          <Kpi label="Total de vendas" value={`${lista.length}`} />
          <Kpi label="Total de pontos" value={fmt(totalPontos)} />
          <Kpi label="Média de pontos por venda" value={fmt(media, 1)} />
        </div>
      </GlassCard>

      <GlassCard>
        <div className="flex flex-wrap items-center gap-3">
          <Pills options={STATUS} value={status} onChange={setStatus} size="sm" />
          <select
            value={destino}
            onChange={(e) => setDestino(e.target.value)}
            className="rounded-xl border border-white/60 bg-white/60 px-3 py-1.5 text-[12px] font-medium text-slate-600"
          >
            {DESTINOS.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
          {perfil === "Gestor" ? (
            <select
              value={consultora}
              onChange={(e) => setConsultora(e.target.value)}
              className="rounded-xl border border-white/60 bg-white/60 px-3 py-1.5 text-[12px] font-medium text-slate-600"
            >
              <option value="Todas">Todas as consultoras</option>
              {CONSULTORAS.map((c) => (
                <option key={c.id} value={c.nome}>
                  {c.nome}
                </option>
              ))}
            </select>
          ) : null}
        </div>

        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[820px] border-separate border-spacing-y-2 text-left text-[13px]">
            <thead>
              <tr className="text-[11px] uppercase tracking-[0.12em] text-slate-400">
                <th className="px-3 pb-1 font-semibold">Data</th>
                <th className="px-3 pb-1 font-semibold">Consultora</th>
                <th className="px-3 pb-1 font-semibold">Venda</th>
                <th className="px-3 pb-1 font-semibold">Pontos</th>
                <th className="px-3 pb-1 font-semibold">Valor</th>
                <th className="px-3 pb-1 font-semibold">Destino</th>
                <th className="px-3 pb-1 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {lista.map((v) => (
                <tr key={v.id} className="glass-inset">
                  <td className="rounded-l-2xl px-3 py-3 text-slate-500">{v.data}</td>
                  <td className="px-3 py-3 font-medium">{v.consultora}</td>
                  <td className="px-3 py-3">
                    <span className="font-medium">{v.venda}</span>
                    <span className="ml-2 text-[11px] text-slate-400">{v.id}</span>
                  </td>
                  <td className="px-3 py-3 font-display font-bold">{v.pontos}</td>
                  <td className="px-3 py-3 text-slate-600">
                    R$ {v.valor.toLocaleString("pt-BR")}
                  </td>
                  <td className="px-3 py-3 text-slate-600">{v.destino}</td>
                  <td className="rounded-r-2xl px-3 py-3">
                    <span
                      className={`rounded-lg px-2 py-1 text-[11px] font-semibold ${
                        v.status === "Confirmada"
                          ? "bg-mint/10 text-mint"
                          : v.status === "Em análise"
                            ? "bg-amberx/10 text-amber-700"
                            : "bg-rose/10 text-rose"
                      }`}
                    >
                      {v.status}
                    </span>
                  </td>
                </tr>
              ))}
              {lista.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-3 py-8 text-center text-slate-400">
                    Nenhuma venda encontrada com os filtros atuais.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </AppShell>
  );
}
