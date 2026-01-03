<template>
  <v-container fluid>
    <!-- Título -->
    <v-row class="bg-orange pa-4 mb-4">
      <v-col>
        <h1 class="white--text text-center">DASHBOARD</h1>
      </v-col>
    </v-row>

    <!-- Filtros -->
    <v-row dense>
      <v-col cols="2"><v-select :items="['Todos']" label="ANO" dense outlined /></v-col>
      <v-col cols="2"><v-select :items="['Todos']" label="TRIMESTRE" dense outlined /></v-col>
      <v-col cols="2"><v-select :items="['Todos']" label="MÊS" dense outlined /></v-col>
      <v-col cols="3"><v-select :items="['Programa4']" label="CR" dense outlined /></v-col>
      <v-col cols="3"><v-select :items="['Todos']" label="GRUPO" dense outlined /></v-col>
    </v-row>

    <!-- Receita e Despesa -->
    <v-row>
      <v-col cols="6">
        <v-card class="pa-4 blue lighten-5">
          <h3 class="blue--text">RECEITA</h3>
          <div class="d-flex justify-space-between">
            <div><strong>ORÇADO:</strong> 43,7M</div>
            <div><strong>REALIZADO:</strong> 12,4M</div>
            <div><strong>SALDO:</strong> 31.218.770,45</div>
          </div>
          <apexchart height="300" type="line" :options="receitaOptions" :series="receitaSeries" />
        </v-card>
      </v-col>

      <v-col cols="6">
        <v-card class="pa-4 red lighten-5">
          <h3 class="red--text">DESPESA</h3>
          <div class="d-flex justify-space-between">
            <div><strong>ORÇADO:</strong> 23,2M</div>
            <div><strong>REALIZADO:</strong> 19,4M</div>
            <div><strong>SALDO:</strong> 3.734.135,63</div>
          </div>
          <apexchart height="300" type="line" :options="despesaOptions" :series="despesaSeries" />
        </v-card>
      </v-col>
    </v-row>

    <!-- Gráficos por Trimestre e Grupo -->
    <v-row>
      <v-col cols="3">
        <v-card class="pa-4">
          <h4>RECEITAS POR TRIMESTRE</h4>
          <apexchart height="200" type="bar" :options="trimestreOptions('Receita')" :series="trimestreSeriesReceita" />
        </v-card>
      </v-col>

      <v-col cols="3">
        <v-card class="pa-4">
          <h4>RECEITAS POR GRUPO</h4>
          <apexchart height="200" type="bar" :options="grupoOptions('Receita')" :series="grupoSeriesReceita" />
        </v-card>
      </v-col>

      <v-col cols="3">
        <v-card class="pa-4">
          <h4>DESPESAS POR TRIMESTRE</h4>
          <apexchart height="200" type="line" :options="trimestreOptions('Despesa', true)" :series="trimestreSeriesDespesa" />
        </v-card>
      </v-col>

      <v-col cols="3">
        <v-card class="pa-4">
          <h4>DESPESAS POR GRUPO</h4>
          <apexchart height="200" type="bar" :options="grupoOptions('Despesa')" :series="grupoSeriesDespesa" />
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import ApexChart from 'vue3-apexcharts'

const receitaSeries = [
  {
    name: 'Receita (M)',
    type: 'column',
    data: [1.3, 1.0, 1.2, 1.4, 0.9, 0.8, 1.1, 0.9, 1.0, 0.8, 0.9, 1.0]
  },
  {
    name: '% Realizado',
    type: 'line',
    data: [54, 23, 43, 44, 30, 26, 31, 26, 29, 26, 21, 19]
  }
]

const receitaOptions = {
  chart: { type: 'line', stacked: false },
  stroke: { width: [0, 3] },
  plotOptions: { bar: { columnWidth: '50%' } },
  colors: ['#42A5F5', '#0D47A1'],
  dataLabels: { enabled: true },
  xaxis: {
    categories: ['01','02','03','04','05','06','07','08','09','10','11','12']
  },
  yaxis: [
    { title: { text: 'Milhões (M)' } },
    {
      opposite: true,
      title: { text: '% Realizado' },
      max: 100
    }
  ],
  legend: { position: 'top' }
}

const despesaSeries = [
  {
    name: 'Despesa (M)',
    type: 'column',
    data: [2.1, 2.6, 1.8, 1.9, 2.2, 2.0, 1.5, 1.3, 2.6, 2.8, 1.9, 1.7]
  },
  {
    name: '% Realizado',
    type: 'line',
    data: [120, 250, 160, 130, 180, 140, 90, 60, 250, 280, 120, 100]
  }
]

const despesaOptions = {
  ...receitaOptions,
  colors: ['#ef5350', '#b71c1c'],
  yaxis: [
    { title: { text: 'Milhões (M)' } },
    {
      opposite: true,
      title: { text: '% Realizado' },
      max: 300
    }
  ]
}

// Trimestres
const trimestreSeriesReceita = [{ name: 'Receita', data: [3.9, 2.5, 2.3, 2.0] }]
const trimestreSeriesDespesa = [
  { name: 'Despesa', type: 'column', data: [6.0, 5.8, 4.9, 5.7] },
  { name: '%', type: 'line', data: [120, 110, 100, 90] }
]

const trimestreOptions = (label, isDual = false) => ({
  chart: { type: isDual ? 'line' : 'bar', stacked: false },
  stroke: { width: [0, 2] },
  colors: label === 'Receita' ? ['#42A5F5'] : ['#ef5350', '#b71c1c'],
  dataLabels: { enabled: true },
  xaxis: {
    categories: ['1º TRI', '2º TRI', '3º TRI', '4º TRI']
  },
  yaxis: isDual
    ? [
        { title: { text: label } },
        {
          opposite: true,
          title: { text: '%' },
          max: 140
        }
      ]
    : [{ title: { text: label } }],
  legend: { position: 'top' }
})

// Grupos
const grupoSeriesReceita = [
  {
    name: 'Receita',
    data: [15.1, 16.4, 12.3]
  }
]

const grupoSeriesDespesa = [
  {
    name: 'Despesa',
    data: [8.1, 9.2, 6.3]
  }
]

const grupoOptions = label => ({
  chart: { type: 'bar' },
  plotOptions: {
    bar: {
      horizontal: true,
      barHeight: '50%'
    }
  },
  colors: label === 'Receita' ? ['#42A5F5'] : ['#ef5350'],
  dataLabels: {
    enabled: true,
    formatter: val => `${val}M`
  },
  xaxis: {
    categories: ['Grupo 11', 'Grupo 12', 'Grupo 13']
  },
  legend: { show: false }
})
</script>

<style scoped>
.bg-orange {
  background-color: #fbbc05;
}
</style>
