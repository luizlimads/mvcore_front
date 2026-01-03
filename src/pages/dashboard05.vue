<template>
  <v-app>
    <v-container fluid class="pa-4" style="background-color: #0f172a; color: white;">
      <v-row>
        <!-- Sidebar -->
        <v-col cols="3">
          <v-card class="pa-4" elevation="2" color="#1e293b">
            <h2>Dashboard Finanças Pessoais</h2>
            <v-avatar size="80" class="my-4">
              <img src="https://i.imgur.com/0y0y0y0.png" alt="User" />
            </v-avatar>

            <v-select label="Conta" :items="['All', 'CAIXXXA', 'BUBANK', 'WISA']" v-model="contaSelecionada" dense outlined />

            <div class="mt-4">
              <p>Contas</p>
              <div v-for="c in contas" :key="c.nome" class="d-flex justify-space-between">
                <span>{{ c.nome }}</span>
                <span :class="c.saldo >= 0 ? 'text-green' : 'text-red'">R$ {{ c.saldo }}</span>
              </div>
            </div>

            <v-date-picker v-model="periodo" range class="mt-4" color="deep-purple" />

            <v-select label="Ano" :items="[2022, 2023, 2024]" v-model="anoSelecionado" dense outlined />
            <v-select label="Mês" :items="['All', 'jan', 'fev', 'mar']" v-model="mesSelecionado" dense outlined />

            <v-btn class="mt-4" block outlined color="grey-lighten-1">Limpar filtros</v-btn>
          </v-card>
        </v-col>

        <!-- Dashboard Content -->
        <v-col cols="9">
          <v-row>
            <v-col cols="4">
              <v-card class="pa-4" elevation="2" style="background: linear-gradient(to right, #f97316, #dc2626); color: white;">
                <div>Saldo</div>
                <h2>R$ 4,216</h2>
                <apexchart type="line" height="60" :options="lineMiniOptions" :series="[miniSeries]" />
              </v-card>
            </v-col>
            <v-col cols="4">
              <v-card class="pa-4" elevation="2" color="#1e293b">
                <div>Entradas</div>
                <h2>R$ 20,300</h2>
                <apexchart type="line" height="60" :options="lineMiniOptions" :series="[miniSeries]" />
              </v-card>
            </v-col>
            <v-col cols="4">
              <v-card class="pa-4" elevation="2" color="#1e293b">
                <div>Despesas</div>
                <h2>R$ 16,084</h2>
                <div class="text-grey-lighten-1 text-caption">79.23%</div>
                <apexchart type="line" height="60" :options="lineMiniOptions" :series="[miniSeries]" />
              </v-card>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="6">
              <v-card class="pa-4" elevation="2" color="#1e293b">
                <h4>Top 5 Entradas por categoria</h4>
                <apexchart type="bar" height="250" :options="entradasOptions" :series="entradasSeries" />
              </v-card>
            </v-col>
            <v-col cols="6">
              <v-card class="pa-4" elevation="2" color="#1e293b">
                <h4>Top 5 Despesas por categoria</h4>
                <apexchart type="donut" height="250" :options="despesasOptions" :series="[36.36, 18.18, 18.18, 15.15, 12.12]" />
              </v-card>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12">
              <v-card class="pa-4" elevation="2" color="#1e293b">
                <h4>Evolução mensal despesas vs entradas</h4>
                <apexchart type="bar" height="250" :options="evolucaoOptions" :series="evolucaoSeries" />
              </v-card>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="3" v-for="item in resumoCategorias" :key="item.nome">
              <v-card class="pa-4 d-flex flex-column align-center" elevation="2" color="#1e293b">
                <v-icon size="36">{{ item.icon }}</v-icon>
                <h4>{{ item.nome }}</h4>
                <p class="text-h6">R$ {{ item.valor }}</p>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script setup>
import { ref } from 'vue';

const contaSelecionada = ref('All');
const anoSelecionado = ref(2023);
const mesSelecionado = ref('All');
const periodo = ref({ start: '2023-07-01', end: '2024-12-30' });

const contas = [
  { nome: 'CAIXXXA', saldo: 6616 },
  { nome: 'BUBANK', saldo: -900 },
  { nome: 'WISA', saldo: -1500 },
];

const miniSeries = {
  name: 'Saldo',
  data: [10, 11, 10, 11, 12, 11, 10, 10, 11, 13, 13, 14, 16],
};

const lineMiniOptions = {
  chart: { sparkline: { enabled: true } },
  stroke: { width: 2 },
  colors: ['#ffffff'],
};

const entradasSeries = [
  {
    name: 'Entradas',
    data: [15000, 3000, 3000],
  },
];

const entradasOptions = {
  chart: { toolbar: { show: false } },
  xaxis: { categories: ['Salário', 'Outras Receitas', '13º salário'] },
  colors: ['#38bdf8'],
};

const despesasOptions = {
  labels: ['Supermercado', 'Cartão de crédito', 'Plano de saúde', 'Prestação da casa', 'Presentes'],
  legend: { labels: { colors: ['white'] } },
  colors: ['#ef4444', '#f97316', '#fbbf24', '#3b82f6', '#6366f1'],
};

const evolucaoSeries = [
  {
    name: 'Despesas',
    data: [3000, 2500, 2800, 2200, 3500, 1800],
  },
  {
    name: 'Entradas',
    data: [4000, 3000, 2900, 3000, 3200, 5000],
  },
  {
    name: 'Saldo Acumulado',
    type: 'line',
    data: [1000, 1500, 1600, 2400, 2100, 3200],
  },
];

const evolucaoOptions = {
  chart: { toolbar: { show: false } },
  xaxis: { categories: ['jul', 'ago', 'set', 'out', 'nov', 'dez'], labels: { style: { colors: 'white' } } },
  colors: ['#ef4444', '#22c55e', '#60a5fa'],
  yaxis: { labels: { style: { colors: 'white' } } },
  legend: { labels: { colors: 'white' } },
};

const resumoCategorias = [
  { nome: 'Moradia', valor: 2929, icon: 'mdi-home' },
  { nome: 'Lazer', valor: 900, icon: 'mdi-glass-cocktail' },
  { nome: 'Cartão', valor: 1800, icon: 'mdi-credit-card' },
  { nome: 'Transporte', valor: 1500, icon: 'mdi-car' },
];
</script>

<style scoped>
.text-red {
  color: #ef4444;
}
.text-green {
  color: #22c55e;
}
</style>
