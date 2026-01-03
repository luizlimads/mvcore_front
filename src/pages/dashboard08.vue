<template>
  <v-app>
    <v-main>
      <v-container fluid class="bg-secondary">
        <v-row>
          <v-col cols="12">
            <h1 class="text-h4 mb-4">📊 Dashboard Financeiro</h1>
          </v-col>

          <!-- 1. Saldo Acumulado -->
          <v-col cols="12" md="6">
            <apexchart type="line" height="300" :options="saldoOptions" :series="saldoSeries" />
          </v-col>

          <!-- 2. Receita vs Despesa Mensal -->
          <v-col cols="12" md="6">
            <apexchart type="bar" height="300" :options="receitaDespesaOptions" :series="receitaDespesaSeries" />
          </v-col>

          <!-- 3. Despesa por Categoria -->
          <v-col cols="12" md="4">
            <apexchart type="pie" height="300" :options="categoriaDespesaOptions" :series="categoriaDespesaSeries" />
          </v-col>

          <!-- 4. Fornecedores Mais Pagos -->
          <v-col cols="12" md="4">
            <apexchart type="bar" height="300" :options="fornecedoresOptions" :series="fornecedoresSeries" />
          </v-col>

          <!-- 5. Principais Fontes de Receita -->
          <v-col cols="12" md="4">
            <apexchart type="bar" height="300" :options="clientesOptions" :series="clientesSeries" />
          </v-col>

          <!-- 6. Fluxo de Caixa -->
          <v-col cols="12" md="6">
            <apexchart type="area" height="300" :options="fluxoOptions" :series="fluxoSeries" />
          </v-col>

          <!-- 7. Heatmap de Movimentações -->
          <v-col cols="12" md="6">
            <apexchart type="heatmap" height="300" :options="heatmapOptions" :series="heatmapSeries" />
          </v-col>

          <!-- 8. Comparativo por Conta Bancária -->
          <v-col cols="12">
            <apexchart type="bar" height="300" :options="contasOptions" :series="contasSeries" />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import ApexCharts from 'vue3-apexcharts'

const saldoOptions = {
  chart: { id: 'saldo-line' },
  xaxis: { categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'] },
  title: { text: 'Saldo Acumulado' }
}
const saldoSeries = [{ name: 'Saldo', data: [1000, 2300, 2800, 3500, 4200, 5000] }]

const receitaDespesaOptions = {
  chart: { id: 'receita-despesa' },
  xaxis: { categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'] },
  title: { text: 'Receita vs Despesa' },
}
const receitaDespesaSeries = [
  { name: 'Receita', data: [3000, 3200, 3100, 3500, 3700, 4000] },
  { name: 'Despesa', data: [2000, 2500, 2800, 3000, 3200, 3500] }
]

const categoriaDespesaOptions = {
  labels: ['Salários', 'Aluguel', 'Marketing', 'TI'],
  title: { text: 'Despesas por Categoria' },
}
const categoriaDespesaSeries = [3000, 2000, 1500, 1000]

const fornecedoresOptions = {
  chart: { id: 'fornecedores' },
  xaxis: { categories: ['Fornecedor A', 'Fornecedor B', 'Fornecedor C'] },
  title: { text: 'Fornecedores Mais Pagos' },
}
const fornecedoresSeries = [{ name: 'Valor', data: [4000, 3500, 2000] }]

const clientesOptions = {
  chart: { id: 'clientes' },
  xaxis: { categories: ['Venda 1', 'Venda 2', 'Venda 3'] },
  title: { text: 'Principais Receitas por Venda' },
}
const clientesSeries = [{ name: 'Valor', data: [5000, 4200, 3100] }]

const fluxoOptions = {
  chart: { id: 'fluxo' },
  xaxis: { categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'] },
  title: { text: 'Fluxo de Caixa' },
}
const fluxoSeries = [
  { name: 'Entradas', data: [3000, 3200, 3100, 3500, 3700, 4000] },
  { name: 'Saídas', data: [2000, 2500, 2800, 3000, 3200, 3500] }
]

const heatmapOptions = {
  chart: { id: 'heatmap' },
  title: { text: 'Movimentação por Dia' },
}
const heatmapSeries = Array.from({ length: 7 }, (_, i) => ({
  name: `Semana ${i + 1}`,
  data: Array.from({ length: 7 }, (_, j) => ({
    x: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'][j],
    y: Math.floor(Math.random() * 1000),
  })),
}))

const contasOptions = {
  chart: { id: 'contas' },
  xaxis: { categories: ['Conta 1', 'Conta 2', 'Conta 3'] },
  title: { text: 'Comparativo por Conta Bancária' },
}
const contasSeries = [
  { name: 'Receita', data: [5000, 4200, 3000] },
  { name: 'Despesa', data: [3000, 2800, 2500] }
]
</script>
