<template>
  <v-container fluid class="pa-4" style="background-color: white;">
    <v-row>
      <v-col cols="4">
        <v-sheet class="pa-4" color="#fff3e0" rounded>
          <h3 class="orange--text">R$ 2,2 Mi</h3>
          <span>Despesa</span>
        </v-sheet>
      </v-col>
      <v-col cols="4">
        <v-sheet class="pa-4" color="#e8f5e9" rounded>
          <h3 class="text-success">R$ 9,7 Mi</h3>
          <span>Receita</span>
        </v-sheet>
      </v-col>
      <v-col cols="4">
        <v-sheet class="pa-4" color="#e3f2fd" rounded>
          <h3 class="text-success">18,6%</h3>
          <span>% Lucro</span>
        </v-sheet>
      </v-col>
    </v-row>

    <v-row class="mt-4">
      <v-col cols="6">
        <v-card class="pa-4" outlined>
          <h4 class="text-orange">Despesa Operacional Mensal</h4>
          <apexchart type="bar" height="200" :options="barChartOptions" :series="barChartSeries" />
        </v-card>
      </v-col>
      <v-col cols="6">
        <v-card class="pa-4" outlined>
          <h4 class="text-blue">Receita Operacional Mensal</h4>
          <apexchart type="bar" height="200" :options="revenueChartOptions" :series="revenueChartSeries" />
        </v-card>
      </v-col>
    </v-row>

    <v-row class="mt-4">
      <v-col cols="6">
        <v-card class="pa-4" outlined>
          <h4>Margem por Fornecedor</h4>
          <apexchart type="bar" height="200" :options="supplierMarginOptions" :series="supplierMarginSeries" />
        </v-card>
      </v-col>
      <v-col cols="6">
        <v-card class="pa-4" outlined>
          <h4>Receita por Linha de Produto</h4>
          <apexchart type="donut" height="200" :options="productLineOptions" :series="productLineSeries" />
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue';

const barChartOptions = {
  chart: {
    toolbar: { show: false },
  },
  xaxis: {
    categories: ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'],
  },
  colors: ['#f05a28'],
};

const barChartSeries = [
  {
    name: 'Despesa',
    data: [0.1, 0.12, 0.13, 0.14, 0.15, 0.16, 0.17, 0.18, 0.6, 0.3, 0.25, 0.2],
  },
];

const revenueChartOptions = {
  chart: {
    toolbar: { show: false },
  },
  xaxis: {
    categories: ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'],
  },
  colors: ['#002060'],
};

const revenueChartSeries = [
  {
    name: 'Receita',
    data: [0.5, 0.55, 0.6, 0.62, 0.7, 0.75, 0.85, 0.9, 1.0, 1.0, 0.95, 0.4],
  },
];

const supplierMarginOptions = {
  chart: {
    toolbar: { show: false },
  },
  plotOptions: {
    bar: {
      horizontal: true,
    },
  },
  xaxis: {
    categories: ['Moinho Dois Irmãos', 'Santa Rosa Alimentos', 'Kappa Bebidas', 'King Coffee', 'Atacado Doces'],
  },
  colors: ['#002060'],
};

const supplierMarginSeries = [
  {
    name: 'Margem',
    data: [1.9, 1.0, 0.5, 0.4, 0.2],
  },
];

const productLineOptions = {
  labels: ['Alimentos', 'Bebidas'],
  colors: ['#002060', '#f05a28'],
  legend: { position: 'bottom' },
};

const productLineSeries = [8.8, 0.9];
</script>

<style scoped>
.text-orange {
  color: #f05a28;
}
.text-blue {
  color: #002060;
}
</style>
