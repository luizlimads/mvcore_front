<template>
    <v-row>
      <v-col cols="12" lg="9">
        <v-row>
          <v-col cols="12" md="4">
            <SummaryCard title="Total Net Worth" :value="totalNetWorth" :series="[]" :chartOptions="{}" class="bg-red-darken-1 text-white" />
          </v-col>
          <v-col cols="12" md="4">
            <SummaryCard title="Spendings" :value="spendingsMes.valor" :series="[{ data: spendingsMes.seriesData }]" :chartOptions="sparklineOptions" />
          </v-col>
          <v-col cols="12" md="4">
            <SummaryCard title="Income" :value="incomeMes.valor" :series="[{ data: incomeMes.seriesData }]" :chartOptions="{...sparklineOptions, colors:['#00E396']}" />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="5">
            <GraficoGenerico
              title="Income Source"
              type="bar"
              :series="fonteDeRendaSeries"
              :options="{ plotOptions: { bar: { horizontal: true, distributed: true } }, xaxis: { categories: fonteDeRendaCategories }, legend: { show: false } }"
            />
          </v-col>
          <v-col cols="12" md="7">
            <GraficoGenerico
              title="Income & Expenses"
              type="line"
              :series="balancoMensalSeries"
              :categories="balancoMensalCategories"
              :options="{ stroke: { curve: 'smooth' } }"
            />
          </v-col>
        </v-row>
      </v-col>

      <v-col cols="12" lg="3">
        <v-row>
          <v-col cols="12">
            <ListaDetalhada title="Spendings" :items="spendingsPorCategoria" />
          </v-col>
          <v-col cols="12">
            <MetaProgresso title="Income Goal" subtitle="Progress to month" :valor-atual="metaDeRenda.atual" :valor-meta="metaDeRenda.meta" />
          </v-col>
          
        </v-row>
      </v-col>
    </v-row>
    
    <v-row>
        <v-col cols="12" md="8">
            <GraficoGenerico title="Assets" type="donut" :series="ativosDonutSeries" :options="{ labels: ativosDonutLabels }" />
        </v-col>
        <v-col cols="12" md="4">
            <ListaDetalhada title="Expenses for My Dogs and Cats" :items="despesasComPets" />
        </v-col>
    </v-row>

</template>

<script setup lang="ts">
import { ref } from 'vue';
import { storeToRefs } from 'pinia';

import SummaryCard from '@/components/dashboard/SummaryCard.vue';
import ListaDetalhada from '@/components/dashboard/ListaDetalhada.vue';
import MetaProgresso from '@/components/dashboard/MetaProgresso.vue';
import GraficoGenerico from '@/components/dashboard/GraficoGenerico.vue';

import { useLojaData } from '@/mocks/lojaMockData';
import { useLancamentoStore } from '@/stores';

const lancamentoDataStore = useLancamentoStore();
const { entradas } = storeToRefs(lancamentoDataStore);


const {
  totalNetWorth, spendingsMes, incomeMes, spendingsPorCategoria, despesasComPets,
  fonteDeRendaSeries, fonteDeRendaCategories, balancoMensalSeries, balancoMensalCategories,
  ativosDonutSeries, ativosDonutLabels, metaDeRenda
} = useLojaData();

// Opções base para os sparklines
const sparklineOptions = ref({
    chart: { type: 'line', sparkline: { enabled: true } },
    stroke: { curve: 'smooth', width: 2.5 },
    tooltip: { enabled: false },
    colors: ['#FF4560']
});

onMounted(() => {
    lancamentoDataStore.fetchAllLancamentos(false,"2025-01-01","2025-02-10");
});

</script>