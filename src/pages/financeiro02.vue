<template>
  <v-container fluid>
    <v-row >
      <v-col >
        <FiltroPeriodo 
        @update:periodo="onPeriodoChange" />
      </v-col>
      <v-col
        v-for="card in processedSummaryCards"
        :key="card.id"
      >
        <SummaryCard v-bind="card" />
      </v-col>
    </v-row>


    <v-row >
      <v-col>
        <ResumoContas :items="dadosDoResumo"></ResumoContas>
      </v-col>      
      <v-col>
        <ReceitasDespesasChart
        title="Despesa operacional por grupos"
        :series="seriesDDespesas"
        :options="despesasDOptions"
        class="h-100"
        />
      </v-col>      
      <v-col>
        <ReceitasDespesasChart
        title="Despesa operacional por grupos"
        :series="seriesDDespesas"
        :options="despesasDOptions"
        class="h-100"
        />
      </v-col>
    </v-row>
    
    <v-row >
      <v-col>
        <ReceitasDespesasChart
            title="Receita operacional por grupos"
            :series="seriesReceitas"
            :categories="categoriasReceitas"
            :options="receitasOptions"
            
          />
      </v-col>
      <v-col>
        <ReceitasDespesasChart
            title="Despesa operacional por grupos"
            :series="seriesDespesas"
            :categories="categoriasDespesas"
            :options="despesasOptions"
          />
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" lg="7">
        <ReceitasDespesasChart
            title="Receitas e despesas"
            :series="financialSeries"
            :categories="financialCategories"
            :options="receitasEDespesasOptions"
          />
      </v-col>      
      <v-col cols="12" lg="5">
        <TableComparative class="h-100"/>
      </v-col>
    </v-row>


  </v-container>
</template>

<script setup lang="ts">
  import { ref, computed, onMounted } from 'vue';
  import { useTheme } from 'vuetify';
  
  import { useFormatters } from '@/composables/useFormatters';
  import { useAlertStore, useSnackbarStore } from '@/stores'
  import type { Lancamento } from '@/type';

  
  import SummaryCard from '@/components/SummaryCard.vue';
  import ReceitasDespesasChart from '@/components/charts/financeiro/ReceitasDespesasChart.vue';
  import TableComparative from '@/components/TableComparative.vue';
  import ResumoContas from './ResumoContas.vue';
  
  const alertDataStore = useAlertStore()
  const snackbarDataStore = useSnackbarStore()
  
  
  const { formatCurrency } = useFormatters();
  const error = ref<string | null>(null);
  const lancamentos = ref<Lancamento[]>([]);
  const lancamentosDeCredito = ref<number[]>([]);
  const lancamentosDeDebito = ref<number[]>([]);
  
  const alertMessage = computed(() => alertDataStore.message)
  
  if (alertMessage.value.length > 0) {
    snackbarDataStore.showSnackbar(alertMessage.value, 'warning');
    alertDataStore.clearMessage()
  }

  const handleLancamento = async () => {
    try {
      error.value = null;

      lancamentosDeCredito.value = lancamentos.value
      .filter(lanc => lanc.tipo === 'Crédito')
      .map(lanc => lanc.valor);

      lancamentosDeDebito.value = lancamentos.value
      .filter(lanc => lanc.tipo === 'Débito')
      .map(lanc => lanc.valor);

    } catch (e) {
      error.value = 'Falha na autenticação. Verifique suas credenciais.';
    }
  };

  onMounted(() => {
    handleLancamento();
  });

  const sparklineBaseOptions = {
    chart: {
      type: 'line',
      sparkline: { enabled: true },
      background: 'transparent',
    },
    stroke: { curve: 'smooth', width: 2.5 },
    tooltip: { enabled: false },
  };

  function onPeriodoChange(novoPeriodo: { data_inicial: string, data_final: string }) {
    console.log('Novo período recebido na página:', novoPeriodo);
  }

  const theme = useTheme();
  const summaryCardsData = ref([
    {
      id: 1,
      title: 'Saldo',
      cardId: 'saldo-card',
      chartOptions: { ...sparklineBaseOptions, colors: [theme.current.value.colors.primary] },
      series: [{ name: 'Saldo', data: [30, 25, 35, 30, 45, 40, 60, 55, 75, 90, 80, 100] }]
    },
    {
      id: 2,
      title: 'Entradas',
      cardId: 'entradas-card',
      chartOptions: { ...sparklineBaseOptions, colors: [theme.current.value.colors.chart01] },
      series: [{ name: 'Entradas', data: lancamentosDeCredito }]
    },
    {
      id: 3,
      title: 'Saídas',
      cardId: 'despesas-card',
      secondaryText: '79 23%',
      chartOptions: { ...sparklineBaseOptions, colors: [theme.current.value.colors.chart02] },
      series: [{ name: 'Saidas', data: lancamentosDeDebito }]
    }
  ]);

  const processedSummaryCards = computed(() => {
    return summaryCardsData.value.map(card => {
      const sumOfSeries = card.series[0].data.reduce((total, currentValue) => total + currentValue, 0);
      return {
        ...card,
        value: formatCurrency(sumOfSeries)
      };
    });
  });

  // DADOS FICTICIOS SERIE TEMPORAL ANO
  const financialSeries = ref([
    {
      name: 'Receitas',
      data: [3100, 4000, 2800, 5100, 4200, 10900, 10000, 11000, 9000, 10000, 10500, 11500],
    },
    {
      name: 'Despesas',
      data: [1100, 3200, 4500, 3200, 3400, 5200, 4100, 5500, 6000, 6500, 7000, 6000],
    },
  ]);

  const financialCategories = ref([
    "2024-01-01", "2024-02-01", "2024-03-01",
    "2024-04-01", "2024-05-01", "2024-06-01",
    "2024-07-01", "2024-08-01", "2024-09-01",
    "2024-10-01", "2024-11-01", "2024-12-01"
  ]);

  const receitasEDespesasOptions = ref({
    chart: {
      type: 'area',
    },
    colors: [theme.current.value.colors.chart01,theme.current.value.colors.chart02],
    fill:{
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 90, 100]

      }
    }
  });

  // DADOS FICTICIOS DESPESA MES
  const seriesReceitas = ref([
    {
      name: 'Receitas',
      data: [5000, 18500, 22000, 3500, 4200, 1800]
    }
  ]);

  const categoriasReceitas = ref([
  'Aluguel', 
  'Salários', 
  'Fornecedores', 
  'Marketing', 
  'Impostos', 
  'Manutenção'
  ]);

  const receitasOptions = ref({
    chart: {
      type: 'bar',
    },
    colors: [theme.current.value.colors.chart01],
  });


  // DADOS FICTICIOS DESPESA MES
  const seriesDespesas = ref([
    {
      name: 'Despesas',
      data: [5000, 18500, 22000, 3500, 4200, 1800]
    }
  ]);

  const categoriasDespesas = ref([
  'Aluguel', 
  'Salários', 
  'Fornecedores', 
  'Marketing', 
  'Impostos', 
  'Manutenção'
  ]);

  const despesasOptions = ref({
    chart: {
      type: 'bar',
    },
    colors: [theme.current.value.colors.chart02],
  });
  
  // DADOS FICTICIOS DESPESA DONUT
  const seriesDDespesas = computed(() => {
    return seriesDespesas.value[0]?.data || []; 
  });
  const despesasDOptions = computed(() => ({
    chart: { type: 'donut' },
    labels: categoriasReceitas.value,
    legend: { position: 'right',      floating: false  },
    tooltip: {
      y: { formatter: (value: number) => formatCurrency(value) }
    },
    dataLabels: {
      enabled: true,
      formatter: (value: number) => `${value.toFixed(1)}%`,
    },
    responsive: [{
      breakpoint: 500,
      options: {
        chart: { width: '80%' },
        legend: { position: 'bottom' }
      }
    }]
  }));
  
  // DADOS FICTICIOS RESUMO CONTAS
  
  const dadosContas = ref([
  {
    id: "a20cbc4a-9fc0-4294-8340-e62948326f84",
    descricao_conta: "Itaú - Conta Principal",
    entradas: [
      { descricao: 'Salário', valor: 7500 },
      { descricao: 'Vendas Online', valor: 2350.50 },
      { descricao: 'Rendimentos', valor: 120.75 },
      { descricao: 'Vendas Online', valor: 850.25 },
    ],
    saidas: [
      { descricao: 'Aluguel', valor: 2500 },
      { descricao: 'Supermercado', valor: 1800 },
      { descricao: 'Internet/Telefone', valor: 350 },
      { descricao: 'Transporte', valor: 450 },
      { descricao: 'Supermercado', valor: 600 },
    ]
  },
  {
    id: "f1e2d3c4-5b6a-4e8d-9f0a-1b2c3d4e5f6a",
    descricao_conta: "Nubank - Cartão de Crédito",
    entradas: [
      { descricao: 'Pagamento Fatura', valor: 4500 },
    ],
    saidas: [
      { descricao: 'Restaurantes', valor: 850 },
      { descricao: 'Assinaturas', valor: 150 },
      { descricao: 'Compras Online', valor: 2200 },
      { descricao: 'Lazer', valor: 600 },
      { descricao: 'Restaurantes', valor: 400 },
    ]
  }
]);
  
  const dadosDoResumo = ref([
  {
    "id": "9818bc34-7e74-435c-addc-f7e394a26801",
    "descricao_conta": "Bradesco - Conta Poupança",
    "total_entradas": 1500.00,
    "total_saidas": 350.00
  },
  {
    "id": "1da7b56a-4c2f-4e0d-9d2a-8c9f7b1e3a4f",
    "descricao_conta": "Santander - Conta Salário",
    "total_entradas": 8800.00,
    "total_saidas": 8750.90
  },
  {
    "id": "b8e9c2d1-5a6b-4f8c-9a0e-7d6f5c4b3a2e",
    "descricao_conta": "Banco do Brasil - Conta Empresarial",
    "total_entradas": 85300.75,
    "total_saidas": 72150.20
  },
  {
    "id": "c3d4e5f6-7a8b-4c9d-8e1f-2a3b4c5d6e7f",
    "descricao_conta": "Caixa Econômica - Poupança Fácil",
    "total_entradas": 500.00,
    "total_saidas": 50.00
  },
  {
    "id": "f1e2d3c4-5b6a-4e8d-9f0a-1b2c3d4e5f6a",
    "descricao_conta": "Nubank - Conta Digital",
    "total_entradas": 12400.30,
    "total_saidas": 11890.00
  },
  {
    "id": "a7b8c9d0-1e2f-4a5b-8c6d-7e8f9a0b1c2d",
    "descricao_conta": "Inter - Conta Digital PJ",
    "total_entradas": 45000.00,
    "total_saidas": 48500.10
  },
  {
    "id": "e3f4a5b6-c7d8-4e9f-8a0b-1c2d3e4f5a6b",
    "descricao_conta": "Sicoob - Conta Cooperado",
    "total_entradas": 9870.00,
    "total_saidas": 6500.00
  },
  {
    "id": "d9e8f7a6-b5c4-4d3e-a2b1-c0d9e8f7a6b5",
    "descricao_conta": "Bradesco - Conta de Investimentos",
    "total_entradas": 35000.00,
    "total_saidas": 15000.00
  },
  {
    "id": "c1d0e9f8-a7b6-4c5d-8e3f-2a1b0c9d8e7f",
    "descricao_conta": "Itaú - Conta Universitária",
    "total_entradas": 1200.50,
    "total_saidas": 1150.75
  }]);

  const simulatedTitle = ref('Comparativo de Variação Anual (R$)');
  const simulatedCategories = ref([
    'Vendas',
    'Recebimento Crediário',
    'Fornecedores',
    'Taxas de Meios de Pag.',
    'Despesas Financeiras',
  ]);

  const simulatedSeries = ref([
    {
      name: 'Ano Atual',
      data: [
        2093740,  // Vendas
        10885104, // Recebimento Crediário
        5621570,  // Fornecedores
        2314620,  // Taxas de Meios de Pag.
        800660,   // Despesas Financeiras
      ],
    },
    {
      name: 'Ano Anterior',
      // O TRUQUE: Estes são os valores do ano anterior, mas multiplicados por -1.
      // Isso faz com que as barras cresçam para o lado oposto no gráfico.
      data: [
        -1320629,   // Vendas
        -11401534,  // Recebimento Crediário
        -15050447,  // Fornecedores
        -22959425,  // Taxas de Meios de Pag.
        -686434,    // Despesas Financeiras
      ],
    },
  ]);

  const financialData = ref({
  "saidas": {
    "despesasFinanceiras": {
      "taxaAdm": 20.00,
      "totalDespesasFinanceiras":20
    },
    "fornecedores": 20.00,
    "outrasDespesas": 20.00,
    "totalSaidas": 60.00
  },
  "entradas": {
    "receitaVendas": {
      "vendas": 20.00,
      "recebimentoCrediario": 20.00,
      "totalReceitaVendas":40
    },
    "totalEntradas": 40.00
  }
});
</script>