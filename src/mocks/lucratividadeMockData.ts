import { ref, reactive } from 'vue';

// 1. KPIs (Key Performance Indicators)
export const kpi = reactive({
  lucroBruto: 45750.80,
  custoProdutos: 74249.20,
  margemLucro: 0.3812 // (lucro / vendas)
});

// 2. Séries temporais para os gráficos
export const lucroMensalSeries = ref([
  { name: 'Lucro Bruto', data: [15200, 18500, 17100, 21300, 24500, 29800, 32100, 35400, 31200, 38600, 41200, 45750] }
]);

export const vendasVsCustosSeries = ref([
  { name: 'Vendas (Líquido)', data: [45000, 52000, 50000, 58000, 65000, 75000, 81000, 89000, 85000, 99000, 110000, 120000] },
  { name: 'Custo dos Produtos', data: [29800, 33500, 32900, 36700, 40500, 45200, 48900, 53600, 53800, 60400, 68800, 74250] }
]);

export const produtosRentaveisSeries = ref([
  { name: 'Lucro Gerado', data: [8500, 7900, 7200, 6800, 6500, 5900, 5100, 4800, 4500, 4100] }
]);

// 3. Categorias (rótulos) para os eixos dos gráficos
export const mesesDoAno = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

export const top10Produtos = [
  'Produto A', 'Produto B', 'Produto C', 'Produto D', 'Produto E',
  'Produto F', 'Produto G', 'Produto H', 'Produto I', 'Produto J'
];