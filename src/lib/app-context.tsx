import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

export type Perfil = "Gestor" | "Consultora";
export type Periodo = "Hoje" | "Semana" | "Mês" | "Ciclo" | "Semestre" | "Ano";

export const PERIODOS: Periodo[] = ["Hoje", "Semana", "Mês", "Ciclo", "Semestre", "Ano"];

type AppState = {
  perfil: Perfil;
  setPerfil: (p: Perfil) => void;
  periodo: Periodo;
  setPeriodo: (p: Periodo) => void;
  usuario: { nome: string; cargo: string };
};

const AppContext = createContext<AppState | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [perfil, setPerfil] = useState<Perfil>("Gestor");
  const [periodo, setPeriodo] = useState<Periodo>("Mês");

  const value = useMemo<AppState>(
    () => ({
      perfil,
      setPerfil,
      periodo,
      setPeriodo,
      usuario:
        perfil === "Gestor"
          ? { nome: "Ricardo Alves", cargo: "Gestor da unidade" }
          : { nome: "Carol", cargo: "Consultora comercial" },
    }),
    [perfil, periodo],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp deve ser usado dentro de AppProvider");
  return ctx;
}
