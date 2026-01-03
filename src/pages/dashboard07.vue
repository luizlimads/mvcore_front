<template>
  <v-container fluid>
    <v-row>
      <!-- Cards Informativos -->
      <v-col cols="12" md="2">
        <v-card color="blue lighten-4" class="pa-3 mb-4">
          <div class="text-h6 font-weight-bold">Saldo</div>
          <div class="text-h5">R$ 665,00</div>
        </v-card>
        <v-card color="green lighten-4" class="pa-3 mb-4">
          <div class="text-h6 font-weight-bold">Entradas</div>
          <div class="text-h5">R$ 1000,00</div>
        </v-card>
        <v-card color="red lighten-4" class="pa-3 mb-4">
          <div class="text-h6 font-weight-bold">Saídas</div>
          <div class="text-h5">R$ 335,00</div>
        </v-card>
        <v-card color="deep-purple lighten-4" class="pa-3">
          <div class="text-h6 font-weight-bold">Contas</div>
          <p>Caixa: R$ 10,00</p>
          <p>Banco: R$ 600,00</p>
          <p>Itaú: R$ 55,00</p>
        </v-card>
      </v-col>

      <!-- Gráficos de barras horizontais empilhadas -->
      <v-col cols="12" md="10">
        <apexchart type="bar" height="300" :options="stackedBarOptions" :series="stackedBarSeries" />
        <apexchart type="bar" height="300" :options="stackedBarOptions2" :series="stackedBarSeries" />
      </v-col>

      <!-- Receita e Despesa Operacional por Grupo -->
      <v-col cols="12" md="6">
        <apexchart type="bar" height="300" :options="receitaGrupoOptions" :series="receitaGrupoSeries" />
      </v-col>

      <v-col cols="12" md="6">
        <apexchart type="bar" height="300" :options="despesaGrupoOptions" :series="despesaGrupoSeries" />
      </v-col>

      <!-- Gráfico de Área: Receita vs Despesa -->
      <v-col cols="12" md="8">
        <apexchart type="area" height="300" :options="areaOptions" :series="areaSeries" />
      </v-col>

      <!-- Tabela Entradas e Saídas -->
      <v-col cols="12" md="4">
        <v-card>
          <v-card-title>Entradas e Saídas</v-card-title>
          <v-data-table :headers="tableHeaders" :items="tableItems" dense />
        </v-card>
      </v-col>

      <!-- TreeMap -->
      <v-col cols="12">
        <apexchart type="treemap" height="400" :options="treeOptions" :series="treeSeries" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import ApexCharts from 'vue3-apexcharts'

const stackedBarOptions = {
  chart: { stacked: true },
  plotOptions: { bar: { horizontal: true } },
  xaxis: {
    categories: ['dez/22', 'mai/22', 'mar/21', 'jul/22', 'dez/21']
  },
  title: { text: 'Despesas por Mês (Stacked)' }
}

const stackedBarOptions2 = { ...stackedBarOptions }

const stackedBarSeries = [
  { name: 'Carro', data: [2000, 1800, 1500, 1700, 1600] },
  { name: 'Compras', data: [1200, 1100, 1000, 900, 950] },
  { name: 'Contas', data: [800, 850, 870, 890, 860] },
  { name: 'Pet', data: [600, 550, 500, 520, 510] },
  { name: 'Saúde', data: [1500, 1400, 1300, 1350, 1320] },
  { name: 'Transporte', data: [3000, 3100, 2900, 2950, 2800] }
]

const receitaGrupoOptions = {
  chart: { type: 'bar' },
  xaxis: { categories: ['Atividades', 'Financiamento', 'Investimento', 'Marketing', 'Outros'] },
  title: { text: 'Receita operacional por grupos' }
}

const receitaGrupoSeries = [
  { name: 'Receita', data: [5000, 12000, 15000, 3000, 1000] }
]

const despesaGrupoOptions = {
  ...receitaGrupoOptions,
  title: { text: 'Despesa operacional por grupos' }
}

const despesaGrupoSeries = [
  { name: 'Despesa', data: [3000, 10000, 13000, 5000, 1500] }
]

const areaOptions = {
  chart: { type: 'area' },
  xaxis: {
    type: 'datetime',
    categories: [
      '2024-01-01', '2024-02-01', '2024-03-01', '2024-04-01',
      '2024-05-01', '2024-06-01', '2024-07-01'
    ]
  },
  title: { text: 'Receitas e Despesas' }
}

const areaSeries = [
  { name: 'Receita', data: [5000, 7000, 8000, 9000, 10000, 11000, 10500] },
  { name: 'Despesa', data: [2000, 3000, 4000, 5000, 6000, 7000, 7500] }
]

const tableHeaders = [
  { text: 'Descrição', value: 'descricao' },
  { text: 'Período A', value: 'a' },
  { text: 'Período B', value: 'b' },
  { text: 'Variação', value: 'variacao' }
]

const tableItems = [
  { descricao: 'salário', a: 'R$ 995,00', b: 'R$ 1.112,00', variacao: '+11.7%' },
  { descricao: 'despesas Pessoais', a: 'R$ 250,00', b: 'R$ 290,00', variacao: '+16.0%' },
  { descricao: 'transporte', a: 'R$ 800,00', b: 'R$ 950,00', variacao: '+18.8%' },
  { descricao: 'entradas', a: 'R$ 1.000,00', b: 'R$ 1.100,00', variacao: '+10.0%' },
  { descricao: 'outras Despesas', a: 'R$ 50,00', b: 'R$ 100,00', variacao: '+100.0%' }
]

const treeOptions = {
  chart: { type: 'treemap' },
  title: { text: 'Resumo de Despesas' },
  legend: { show: false }
}

const treeSeries = [
  {
    data: [
      { x: 'Transporte Público', y: 19517 },
      { x: 'Transporte Aplicativo', y: 9965 },
      { x: 'Hortifruti', y: 15503 },
      { x: 'Farmácia', y: 9871 },
      { x: 'Exames', y: 10692 },
      { x: 'Consultas médicas', y: 9065 },
      { x: 'Plano de saúde', y: 4258 },
      { x: 'IPTU', y: 5108 },
      { x: 'Telefone', y: 5045 },
      { x: 'Gás', y: 3615 },
      { x: 'Água', y: 3332 },
      { x: 'Energia', y: 1860 },
      { x: 'Internet', y: 2102 },
      { x: 'Remédios', y: 8980 },
      { x: 'Ração', y: 3381 },
      { x: 'Brinquedos', y: 7177 },
      { x: 'Seguro', y: 5154 },
      { x: 'Limp.', y: 7980 }
    ]
  }
]
</script>
