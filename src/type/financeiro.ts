export interface ResumoFinanceiro {
  saldo_atual: number;
  total_entradas: number;
  total_saidas: number;
}

export interface DadosGrafico {
  labels: string[];
  series: number[];
}

export interface DashboardFinanceiro {
  resumo: ResumoFinanceiro;
  receitas_por_categoria: DadosGrafico;
  despesas_por_categoria: DadosGrafico;
  fluxo_caixa_anual: {
    meses: string[];
    receitas: number[];
    despesas: number[];
  };
}