<template>
  <div class="dashboard-container">
    <div class="sidebar">
      <MetricCard label="MARGEM EBITDA" value="23%" color="gradient-blue" />
      <MetricCard label="MARGEM BRUTA" value="65%" color="gradient-green" />
      <MetricCard label="ENDIVIDAMENTO GERAL" value="105%" color="gradient-pink" />
      <MetricCard label="ABATIMENTOS E DEDUÇÕES" value="R$ 958,00" color="gradient-orange" />
    </div>

    <div class="main-content">
      <div class="toolbar">
        <div class="title">Exemplo</div>
        <div class="nav-buttons">
          <button>INICIO</button>
          <button>PARAMETRIZAÇÃO</button>
          <button class="active">DASHBOARD</button>
          <button>RELATÓRIOS</button>
          <button>INFORMAÇÕES</button>
          <button>INSTRUÇÕES</button>
        </div>
      </div>

      <div class="grid-content">
        <div class="panel full">
          <h3>ANÁLISE DE RESULTADOS</h3>
          <apexchart type="bar" height="250" :options="barOptions" :series="barSeries" />
        </div>
        <div class="panel small">
          <h3>MARGEM LÍQUIDA</h3>
          <apexchart type="radialBar" height="250" :options="liquidaOptions" :series="[18]" />
        </div>
        <div class="panel full">
          <h3>EVOLUÇÃO DA RECEITA</h3>
          <apexchart type="area" height="250" :options="areaOptions" :series="areaSeries" />
        </div>
        <div class="panel small">
          <h3>LUCRATIVIDADE</h3>
          <apexchart type="donut" height="250" :options="donutOptions" :series="[18, 34, 47]" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ApexCharts from 'vue3-apexcharts';
import { ref } from 'vue';

const barOptions = {
  chart: { type: 'bar', stacked: true },
  colors: ['#00C9A7', '#FF5B7F'],
  xaxis: { categories: ['JAN','FEV','MAR','ABR','MAI','JUN','JUL','AGO','SET','OUT','NOV','DEZ'] },
  stroke: { show: true, width: [0, 0, 2], colors: ['#FFC107'] },
  series: [],
};

const barSeries = [
  { name: 'Receitas', data: [10, 11, 10, 12, 11, 10, 12, 11, 11, 10, 10, 12] },
  { name: 'Gastos', data: [5, 6, 5, 7, 6, 6, 7, 6, 6, 5, 6, 7] },
  {
    name: 'Lucro',
    type: 'line',
    data: [5, 5, 5, 5, 5, 4, 5, 5, 5, 5, 4, 5],
  },
];

const liquidaOptions = {
  chart: { type: 'radialBar' },
  plotOptions: {
    radialBar: {
      dataLabels: {
        name: { show: false },
        value: {
          fontSize: '22px',
          fontWeight: 600,
          color: '#666',
        },
      },
    },
  },
  colors: ['#00BFFF'],
};

const areaOptions = {
  chart: { type: 'area' },
  colors: ['#00C9A7'],
  xaxis: { categories: ['JAN','FEV','MAR','ABR','MAI','JUN','JUL','AGO','SET','OUT','NOV','DEZ'] },
  stroke: { curve: 'smooth' },
};

const areaSeries = [
  { name: 'Receita', data: [10, 12, 13, 12, 10, 9, 14, 15, 13, 12, 11, 16] },
];

const donutOptions = {
  chart: { type: 'donut' },
  labels: ['18%', '34%', '47%'],
  colors: ['#00C49F', '#FF6188', '#FFC107'],
  legend: { show: false },
};
</script>

<style scoped>
.dashboard-container {
  display: flex;
  flex-direction: row;
  font-family: 'Segoe UI', sans-serif;
}
.sidebar {
  width: 220px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  background: #f5f5f5;
}
.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
}
.toolbar {
  background: #18468B;
  color: white;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.toolbar .nav-buttons button {
  background: transparent;
  border: 1px solid white;
  padding: 0.5rem 1rem;
  margin-left: 0.5rem;
  color: white;
  border-radius: 4px;
  font-weight: bold;
}
.toolbar .nav-buttons .active {
  background: white;
  color: #18468B;
}
.grid-content {
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-gap: 1rem;
  padding: 1rem;
}
.panel {
  background: white;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.05);
}
.full {
  grid-column: span 1;
}
.small {
  grid-column: span 1;
}
.gradient-blue {
  background: linear-gradient(180deg, #00BFFF, #007BFF);
  color: white;
}
.gradient-green {
  background: linear-gradient(180deg, #00FFB3, #00C49F);
  color: white;
}
.gradient-pink {
  background: linear-gradient(180deg, #FF7EB3, #FF5B7F);
  color: white;
}
.gradient-orange {
  background: linear-gradient(180deg, #FFD580, #FFA500);
  color: white;
}
</style>
