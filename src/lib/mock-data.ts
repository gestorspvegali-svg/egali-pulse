export type Consultora = {
  id: string;
  nome: string;
  inicial: string;
  meta: number;
  realizado: number;
  vendas: number;
  cor: "brand" | "accent2" | "mint";
};

export const UNIDADE = {
  nome: "Egali Vila Mariana",
  periodoLabel: "Agosto 2026",
  meta: 2500,
  realizado: 1845,
  vendas: 32,
  diasDecorridos: 40,
  diasRestantes: 8,
  metaDiaria: 52.5,
  mediaDiaria: 46.1,
  projecao: 2410,
  ultimaAtualizacao: "30/08/2026 às 18:42",
};

export const CONSULTORAS: Consultora[] = [
  { id: "carol", nome: "Carol", inicial: "C", meta: 800, realizado: 620, vendas: 11, cor: "brand" },
  {
    id: "jessica",
    nome: "Jessica",
    inicial: "J",
    meta: 800,
    realizado: 580,
    vendas: 10,
    cor: "accent2",
  },
  { id: "amanda", nome: "Amanda", inicial: "A", meta: 900, realizado: 900, vendas: 15, cor: "mint" },
];

export const pct = (r: number, m: number) => (m > 0 ? (r / m) * 100 : 0);
export const fmt = (n: number, casas = 0) =>
  n.toLocaleString("pt-BR", { minimumFractionDigits: casas, maximumFractionDigits: casas });

export const evolucao = [
  { dia: "01", pts: 60 },
  { dia: "05", pts: 145 },
  { dia: "08", pts: 210 },
  { dia: "12", pts: 305 },
  { dia: "16", pts: 402 },
  { dia: "20", pts: 498 },
  { dia: "24", pts: 565 },
  { dia: "28", pts: 620 },
];

export type Venda = {
  id: string;
  data: string;
  consultora: string;
  venda: string;
  pontos: number;
  valor: number;
  destino: string;
  status: "Confirmada" | "Em análise" | "Cancelada";
};

export const VENDAS: Venda[] = [
  {
    id: "VN-2081",
    data: "28/08/2026",
    consultora: "Carol",
    venda: "Curso + Alojamento",
    pontos: 72,
    valor: 28400,
    destino: "Canadá",
    status: "Confirmada",
  },
  {
    id: "VN-2080",
    data: "27/08/2026",
    consultora: "Amanda",
    venda: "High School",
    pontos: 95,
    valor: 41200,
    destino: "Estados Unidos",
    status: "Confirmada",
  },
  {
    id: "VN-2079",
    data: "26/08/2026",
    consultora: "Jessica",
    venda: "Curso de Inglês",
    pontos: 48,
    valor: 17600,
    destino: "Irlanda",
    status: "Em análise",
  },
  {
    id: "VN-2078",
    data: "25/08/2026",
    consultora: "Carol",
    venda: "Intercâmbio Universitário",
    pontos: 61,
    valor: 23100,
    destino: "Austrália",
    status: "Confirmada",
  },
  {
    id: "VN-2077",
    data: "22/08/2026",
    consultora: "Jessica",
    venda: "Curso + Trabalho",
    pontos: 58,
    valor: 21900,
    destino: "Canadá",
    status: "Confirmada",
  },
  {
    id: "VN-2076",
    data: "20/08/2026",
    consultora: "Amanda",
    venda: "Curso de Espanhol",
    pontos: 40,
    valor: 12800,
    destino: "Espanha",
    status: "Cancelada",
  },
  {
    id: "VN-2075",
    data: "18/08/2026",
    consultora: "Carol",
    venda: "Curso + Alojamento",
    pontos: 66,
    valor: 25300,
    destino: "Malta",
    status: "Confirmada",
  },
  {
    id: "VN-2074",
    data: "15/08/2026",
    consultora: "Jessica",
    venda: "High School",
    pontos: 88,
    valor: 39500,
    destino: "Estados Unidos",
    status: "Confirmada",
  },
];

export const DESTINOS = [
  "Todos",
  ...Array.from(new Set(VENDAS.map((v) => v.destino))),
] as string[];

export const METAS_HIERARQUIA = [
  { nivel: "Ano", periodo: "2026", meta: 30000, realizado: 19420 },
  { nivel: "Semestre", periodo: "2º semestre", meta: 15000, realizado: 7310 },
  { nivel: "Ciclo", periodo: "Ciclo 4", meta: 7500, realizado: 5120 },
  { nivel: "Mês", periodo: "Agosto 2026", meta: 2500, realizado: 1845 },
  { nivel: "Semana", periodo: "Semana 35", meta: 580, realizado: 402 },
];

export const RELATORIOS = [
  {
    titulo: "Performance da unidade",
    descricao: "Visão consolidada de meta, realizado e ritmo da unidade.",
  },
  {
    titulo: "Performance individual",
    descricao: "Resultados de cada consultora no período selecionado.",
  },
  { titulo: "Vendas", descricao: "Lista de vendas consolidadas com pontos e valores." },
  { titulo: "Pontuação", descricao: "Distribuição de pontos por venda, destino e período." },
  { titulo: "Meta x Realizado", descricao: "Comparativo entre o planejado e o executado." },
  { titulo: "Comparativo de períodos", descricao: "Evolução entre ciclos, meses e semestres." },
  { titulo: "Ranking de consultoras", descricao: "Classificação por atingimento de meta." },
];

export const CONSULTORA_ATUAL: Consultora = CONSULTORAS[0]!;
