import type { ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutGrid,
  Gauge,
  Users,
  Receipt,
  Target,
  FileText,
  RefreshCw,
  Settings,
} from "lucide-react";
import avatarGestor from "@/assets/avatar-gestor.jpg";
import { useApp, PERIODOS, type Perfil } from "@/lib/app-context";
import { UNIDADE } from "@/lib/mock-data";
import { Pills } from "@/components/ui-kit";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/", label: "Dashboard", icon: LayoutGrid, gestorOnly: true },
  { to: "/minha-performance", label: "Minha Performance", icon: Gauge, gestorOnly: false },
  { to: "/equipe", label: "Equipe", icon: Users, gestorOnly: true },
  { to: "/vendas", label: "Vendas", icon: Receipt, gestorOnly: false },
  { to: "/metas", label: "Metas", icon: Target, gestorOnly: true },
  { to: "/relatorios", label: "Relatórios", icon: FileText, gestorOnly: true },
  { to: "/atualizar-resultados", label: "Atualizar Resultados", icon: RefreshCw, gestorOnly: true },
  { to: "/configuracoes", label: "Configurações", icon: Settings, gestorOnly: true },
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  const { perfil, setPerfil, periodo, setPeriodo, usuario } = useApp();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const itens = NAV.filter((n) => perfil === "Gestor" || !n.gestorOnly);

  return (
    <div className="min-h-screen w-full text-ink">
      <div className="pointer-events-none fixed -top-32 -left-24 size-[520px] rounded-full bg-brand/20 blur-3xl" />
      <div className="pointer-events-none fixed -bottom-40 right-0 size-[560px] rounded-full bg-accent2/20 blur-3xl" />
      <div className="pointer-events-none fixed top-1/3 left-1/2 size-[420px] rounded-full bg-indigo-300/20 blur-3xl" />

      <div className="relative mx-auto max-w-[1440px] px-4 py-5 lg:px-8">
        <header className="glass-panel flex flex-wrap items-center gap-4 rounded-2xl p-3">
          <div className="flex min-w-0 items-center gap-3 pr-2">
            <div className="grid size-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-brand to-accent2 font-display text-lg font-bold text-white shadow-md">
              E
            </div>
            <div className="min-w-0">
              <div className="truncate font-display text-[15px] font-bold leading-tight">
                {UNIDADE.nome}
              </div>
              <div className="text-[11px] font-medium text-slate-400">
                Gestão Comercial · {UNIDADE.periodoLabel}
              </div>
            </div>
          </div>

          <Pills options={PERIODOS} value={periodo} onChange={setPeriodo} />

          <div className="ml-auto flex items-center gap-3">
            <button
              type="button"
              onClick={() => setPerfil(perfil === "Gestor" ? "Consultora" : ("Gestor" as Perfil))}
              className="rounded-lg border border-brand/20 bg-brand/10 px-2.5 py-1 text-[11px] font-semibold text-brand transition-colors hover:bg-brand/15"
              title="Alternar tipo de acesso"
            >
              {perfil}
            </button>
            <div className="hidden text-right sm:block">
              <div className="text-[13px] font-semibold leading-tight">{usuario.nome}</div>
              <div className="text-[11px] text-slate-400">{usuario.cargo}</div>
            </div>
            <img
              src={avatarGestor}
              alt={`Foto de ${usuario.nome}`}
              width={512}
              height={512}
              loading="lazy"
              className="size-10 rounded-full object-cover outline-1 -outline-offset-1 outline-black/5"
            />
          </div>
        </header>

        <div className="mt-5 flex flex-col gap-5 lg:flex-row">
          <aside className="order-2 w-full shrink-0 lg:order-1 lg:w-60">
            <nav className="glass-panel sticky top-5 rounded-2xl p-3">
              <div className="hidden px-3 pb-2 pt-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400 lg:block">
                Navegação
              </div>
              <div className="flex gap-1 overflow-x-auto lg:block lg:overflow-visible">
                {itens.map((item) => {
                  const active = pathname === item.to;
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.to}
                      to={item.to}
                      className={cn(
                        "flex shrink-0 items-center gap-3 rounded-xl px-3 py-2.5 text-[14px] transition-colors lg:mt-1 lg:w-full",
                        active
                          ? "bg-gradient-to-r from-brand to-accent2 font-semibold text-white shadow-md"
                          : "font-medium text-slate-500 hover:bg-white/60",
                      )}
                    >
                      <span
                        className={cn(
                          "grid size-6 shrink-0 place-items-center rounded-md",
                          active ? "bg-white/20" : "bg-slate-100",
                        )}
                      >
                        <Icon className="size-3.5" />
                      </span>
                      <span className="whitespace-nowrap">{item.label}</span>
                    </Link>
                  );
                })}
              </div>
            </nav>
          </aside>

          <main className="order-1 min-w-0 flex-1 space-y-5 lg:order-2">{children}</main>
        </div>
      </div>
    </div>
  );
}
