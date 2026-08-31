import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { FileDown, FileSpreadsheet } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { GlassCard, PageHeader, Pills, RestrictedNotice } from "@/components/ui-kit";
import { RELATORIOS } from "@/lib/mock-data";
import { PERIODOS, useApp } from "@/lib/app-context";

export const Route = createFileRoute("/relatorios")({
  head: () => ({
    meta: [
      { title: "Relatórios — Egali Vila Mariana" },
      {
        name: "description",
        content:
          "Gere relatórios de performance, vendas, pontuação, meta x realizado e ranking de consultoras.",
      },
      { property: "og:title", content: "Relatórios — Egali Vila Mariana" },
      { property: "og:description", content: "Relatórios comerciais por período em PDF ou Excel." },
    ],
  }),
  component: Relatorios,
});

function Relatorios() {
  const { perfil, periodo, setPeriodo } = useApp();
  const [selecionado, setSelecionado] = useState(RELATORIOS[0]!.titulo);

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
        <PageHeader title="Relatórios" subtitle="Escolha o relatório e o período para exportar." />
        <div className="mt-4">
          <Pills options={PERIODOS} value={periodo} onChange={setPeriodo} size="sm" />
        </div>
      </GlassCard>

      <GlassCard>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {RELATORIOS.map((r) => (
            <button
              key={r.titulo}
              type="button"
              onClick={() => setSelecionado(r.titulo)}
              className={`glass-inset rounded-2xl p-4 text-left transition-shadow hover:shadow-sm ${
                selecionado === r.titulo ? "ring-2 ring-brand/30" : ""
              }`}
            >
              <div className="font-display font-bold">{r.titulo}</div>
              <p className="mt-1 text-[12px] text-slate-500">{r.descricao}</p>
            </button>
          ))}
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-3">
          <span className="text-[13px] text-slate-500">
            Selecionado: <b className="text-ink">{selecionado}</b> · {periodo}
          </span>
          <div className="ml-auto flex gap-3">
            <button
              type="button"
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-brand to-accent2 px-4 py-2.5 text-[13px] font-semibold text-white shadow-md transition-opacity hover:opacity-95"
            >
              <FileDown className="size-4" /> Exportar PDF
            </button>
            <button
              type="button"
              className="flex items-center gap-2 rounded-xl border border-white/70 bg-white/70 px-4 py-2.5 text-[13px] font-semibold text-slate-600 transition-colors hover:bg-white"
            >
              <FileSpreadsheet className="size-4" /> Exportar Excel
            </button>
          </div>
        </div>
      </GlassCard>
    </AppShell>
  );
}
