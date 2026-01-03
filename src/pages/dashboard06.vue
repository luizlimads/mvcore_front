<template>
  <v-container fluid>
    <v-row>
      <!-- Meses com Maiores Despesas -->
      <v-col cols="12" md="6">
        <apexchart type="bar" height="300" :options="barOptions" :series="barSeries" />
      </v-col>

      <!-- Evolução das Despesas -->
      <v-col cols="12" md="6">
        <apexchart type="bar" height="300" :options="evolucaoDespesasOptions" :series="evolucaoDespesasSeries" />
      </v-col>

      <!-- Top 5 Despesas -->
      <v-col cols="12" md="6">
        <apexchart type="bar" height="300" :options="topDespesasOptions" :series="topDespesasSeries" />
      </v-col>

      <!-- Meta de Investimento (Gauge) -->
      <v-col cols="12" md="6">
        <apexchart type="radialBar" height="300" :options="gaugeOptions" :series="[90.1]" />
      </v-col>

      <!-- Evolução dos Lucros -->
      <v-col cols="12" md="6">
        <apexchart type="line" height="300" :options="lucrosOptions" :series="lucrosSeries" />
      </v-col>

      <!-- Evolução da Renda -->
      <v-col cols="12" md="6">
        <apexchart type="bar" height="300" :options="rendaOptions" :series="rendaSeries" />
      </v-col>

      <!-- TreeMap de Despesas -->
      <v-col cols="12">
        <apexchart type="treemap" height="400" :options="treeOptions" :series="treeSeries" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import ApexCharts from 'vue3-apexcharts'

const barOptions = {
  chart: { type: 'bar', stacked: true },
  plotOptions: {
    bar: {
      horizontal: true,
    }
  },
  xaxis: {
    categories: ['dez/22', 'mai/22', 'mar/21', 'jul/22', 'dez/21']
  },
  title: {
    text: 'Meses com Maiores Despesas'
  }
}

const barSeries = [
  { name: 'Carro', data: [2000, 1500, 2500, 3000, 1800] },
  { name: 'Compras', data: [1200, 1800, 2000, 1500, 1600] },
  { name: 'Contas', data: [1000, 1300, 900, 1100, 1200] },
  { name: 'Pet', data: [800, 950, 1000, 700, 900] },
  { name: 'Saúde', data: [1500, 2000, 1800, 1700, 1400] },
  { name: 'Transporte', data: [3000, 2500, 2800, 2900, 2700] },
]

const evolucaoDespesasOptions = {
  chart: { type: 'bar' },
  xaxis: {
    categories: [...Array(24).keys()].map(i => {
      const months = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez']
      return months[i % 12] + '/' + (i < 12 ? '2021' : '2022')
    })
  },
  title: {
    text: 'Evolução das Despesas'
  }
}

const evolucaoDespesasSeries = [
  {
    name: 'Despesas',
    data: Array.from({ length: 24 }, () => Math.floor(4000 + Math.random() * 4000))
  }
]

const topDespesasOptions = {
  chart: { type: 'bar' },
  plotOptions: {
    bar: {
      horizontal: true,
    }
  },
  xaxis: {
    categories: ['Transporte Público', 'Investimentos', 'Hortifruti', 'Exames', 'Transporte Aplicativo']
  },
  title: { text: 'Top 5 Despesas' }
}

const topDespesasSeries = [
  {
    name: 'Valor (R$)',
    data: [19517, 17300, 15503, 10692, 9965]
  }
]

const gaugeOptions = {
  chart: {
    type: 'radialBar'
  },
  plotOptions: {
    radialBar: {
      hollow: { size: '70%' },
      dataLabels: {
        name: { show: false },
        value: {
          formatter: (val) => `${val}%`
        }
      }
    }
  },
  labels: ['Meta de Investimento']
}

const lucrosOptions = {
  chart: { type: 'line' },
  xaxis: {
    categories: evolucaoDespesasOptions.xaxis.categories
  },
  title: { text: 'Evolução dos Lucros' }
}

const lucrosSeries = [
  {
    name: 'Lucros',
    data: Array.from({ length: 24 }, () => Math.floor(Math.random() * 8000 - 2000)) // Pode incluir negativos
  }
]

const rendaOptions = {
  chart: { type: 'bar', stacked: true },
  xaxis: {
    categories: evolucaoDespesasOptions.xaxis.categories
  },
  title: { text: 'Evolução da Renda' }
}

const rendaSeries = [
  {
    name: 'Salário',
    data: Array.from({ length: 24 }, () => 6000 + Math.floor(Math.random() * 1000))
  },
  {
    name: 'Extra',
    data: Array.from({ length: 24 }, () => Math.floor(Math.random() * 3000))
  }
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
