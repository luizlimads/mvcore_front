import { ref } from 'vue';

export function useLojaData() {
  // --- Dados de Resumo ---
  const totalNetWorth = ref(278378);
  const spendingsMes = ref({ valor: 9228, seriesData: [10, 40, 15, 60, 30, 80, 50] });
  const incomeMes = ref({ valor: 24050, seriesData: [30, 20, 50, 40, 70, 60, 90] });

  // --- Listas de Categorias ---
  const spendingsPorCategoria = ref([
    { titulo: 'Moradia', valor: 3452, icone: 'mdi-home', cor: 'purple' },
    { titulo: 'Pessoal', valor: 2200, icone: 'mdi-account', cor: 'pink' },
    { titulo: 'Transporte', valor: 2190, icone: 'mdi-car', cor: 'orange' },
  ]);
  const despesasComPets = ref([
    { titulo: 'Veterinário Rotina', valor: 140 },
    { titulo: 'Ração', valor: 950 },
    { titulo: 'Petiscos', valor: 231 },
    { titulo: 'Hospedagem', valor: 65 },
  ]);

  // --- Gráficos Principais ---
  const fonteDeRendaSeries = ref([{ name: 'Valor', data: [2100, 950, 8000, 13000] }]);
  const fonteDeRendaCategories = ref(['E-commerce', 'Google Adsense', 'Loja Física', 'Salário']);

  const balancoMensalSeries = ref([
    { name: 'Receitas', data: [15000, 17000, 19500, 18000, 22000, 20239, 25000, 23000, 26000, 28000, 30582, 29000] },
    { name: 'Despesas', data: [12000, 11000, 14000, 15000, 16000, 20239, 18000, 17000, 19000, 21000, 15843, 22000] },
  ]);
  const balancoMensalCategories = ref(['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']);

  const ativosDonutSeries = ref([15700, 22500, 120000, 135000]);
  const ativosDonutLabels = ref(['Ouro', 'Ações', 'Armazém', 'Terreno']);
  
  // --- Meta de Progresso ---
  const metaDeRenda = ref({ atual: 24050, meta: 39276 });

  return { 
    totalNetWorth, spendingsMes, incomeMes, spendingsPorCategoria, despesasComPets,
    fonteDeRendaSeries, fonteDeRendaCategories, balancoMensalSeries, balancoMensalCategories,
    ativosDonutSeries, ativosDonutLabels, metaDeRenda
  };
}