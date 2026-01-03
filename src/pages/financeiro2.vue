<template>
  <v-container fluid>

    <v-row>
      <v-col cols="12" md="4">
        <SummaryCard title="Saldo" :value="summaryData.saldo.valor" :series="summaryData.saldo.series" :chartOptions="sparklineOptions" />
      </v-col>
      <v-col cols="12" md="4">
        <SummaryCard title="Entradas" :value="summaryData.entradas.valor" :series="summaryData.entradas.series" :chartOptions="{...sparklineOptions, colors:['#00E396']}" />
      </v-col>
      <v-col cols="12" md="4">
        <SummaryCard title="Saídas" :value="summaryData.saidas.valor" :series="summaryData.saidas.series" :chartOptions="{...sparklineOptions, colors:['#FF4560']}" />
      </v-col>
    </v-row>

    <v-row class="mt-4">
      <v-col cols="12" lg="8">
        <GraficoGenerico
          title="Balanço Anual"
          type="bar"
          :series="balancoAnualSeries"
          :categories="balancoAnualCategories"
          :options="barChartOptions"
        />
      </v-col>
      <v-col cols="12" lg="4">
        <ResumoContas :items="resumoPorConta" />
      </v-col>
    </v-row>

    <v-row class="mt-4">
        <v-col cols="12" md="6">
            <GraficoGenerico
                title="Composição das Receitas"
                type="donut"
                :series="receitasPorGrupoSeries"
                :options="{ labels: receitasPorGrupoLabels, legend: { position: 'bottom' } }"
            />
        </v-col>
        <v-col cols="12" md="6">
            <GraficoGenerico
                title="Composição das Despesas"
                type="donut"
                :series="despesasPorGrupoSeries"
                :options="{ labels: despesasPorGrupoLabels, legend: { position: 'bottom' } }"
            />
        </v-col>
    </v-row>

  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useDashboardData } from '@/mocks/financeiroMockData';

// Importa os componentes
import SummaryCard from '@/components/dashboard/SummaryCard.vue';
import ResumoContas from '@/components/dashboard/ResumoContas.vue';
import GraficoGenerico from '@/components/dashboard/GraficoGenerico.vue'; // Supondo que você o tenha

// Pega todos os dados simulados do nosso arquivo de mock
const {
  summaryData,
  resumoPorConta,
  balancoAnualSeries,
  balancoAnualCategories,
  despesasPorGrupoSeries,
  despesasPorGrupoLabels,
  receitasPorGrupoSeries,
  receitasPorGrupoLabels,
} = useDashboardData();

// --- Opções de configuração para os gráficos ---
const sparklineOptions = ref({
    chart: { type: 'line', sparkline: { enabled: true } },
    stroke: { curve: 'smooth', width: 2.5 },
    tooltip: { enabled: false }
});

const barChartOptions = ref({
    chart: { stacked: true, toolbar: { show: false } },
    plotOptions: { bar: { horizontal: false, columnWidth: '50%' } },
    legend: { position: 'top', horizontalAlign: 'right' },
    xaxis: { type: 'category' }
});

</script>