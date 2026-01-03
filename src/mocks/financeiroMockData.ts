import { ref } from 'vue';

export function useDashboardData() {
  
  // --- Dados para os 3 Cards de Resumo ---
  const summaryData = ref({
    saldo: {
      valor: 665.00,
      series: [{ data: [30, 25, 35, 30, 45, 40, 60, 55, 75, 90, 80, 100] }]
    },
    entradas: {
      valor: 30582.04,
      series: [{ data: [150, 200, 180, 300, 250, 400, 350, 500, 450, 600, 550, 700] }]
    },
    saidas: {
      valor: 15843.50,
      series: [{ data: [80, 120, 90, 150, 110, 200, 180, 220, 200, 250, 210, 280] }]
    }
  });

  // --- Dados para a Tabela "Resumo por Conta" ---
  const resumoPorConta = ref([
    { id: 1, descricao_conta: "Bradesco - Conta Poupança", saldo: 1150.00 },
    { id: 2, descricao_conta: "Santander - Conta Salário", saldo: 49.10 },
    { id: 3, descricao_conta: "Banco do Brasil - Conta Empresarial", saldo: 13150.55 },
    { id: 4, descricao_conta: "Caixa Econômica - Poupança Fácil", saldo: 450.00 },
    { id: 5, descricao_conta: "Nubank - Conta Digital", saldo: 510.30 },
    { id: 6, descricao_conta: "Inter - Conta Digital PJ", saldo: -3500.10 },
    { id: 7, descricao_conta: "Sicoob - Conta Cooperado", saldo: 3370.00 },
    { id: 8, descricao_conta: "Bradesco - Conta de Investimentos", saldo: 20000.00 },
    { id: 9, descricao_conta: "Itaú - Conta Universitária", saldo: 49.75 },
  ]);

  // --- Dados para o Gráfico de Barras (Balanço Anual) ---
  const balancoAnualSeries = ref([
    { name: 'Receitas', data: [3100, 4000, 2800, 5100, 4200, 10900, 10000, 11000, 9000, 10000, 10500, 11500] },
    { name: 'Despesas', data: [1100, 3200, 4500, 3200, 3400, 5200, 4100, 5500, 6000, 6500, 7000, 6000] },
  ]);
  const balancoAnualCategories = ref(["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"]);

  // --- Dados para os Gráficos de Donut ---
  const despesasPorGrupoSeries = ref([40.0, 33.6, 9.1, 7.6, 5.4, 4.3]);
  const despesasPorGrupoLabels = ref(['Salários', 'Fornecedores', 'Impostos', 'Aluguel', 'Marketing', 'Manutenção']);

  const receitasPorGrupoSeries = ref([65.2, 25.8, 9.0]);
  const receitasPorGrupoLabels = ref(['Venda de Produtos', 'Serviços', 'Rendimentos']);

  return { 
    summaryData,
    resumoPorConta, 
    balancoAnualSeries,
    balancoAnualCategories,
    despesasPorGrupoSeries,
    despesasPorGrupoLabels,
    receitasPorGrupoSeries,
    receitasPorGrupoLabels
  };
}