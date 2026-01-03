<template>
  <v-container fluid class="bg-grey-lighten-4 pa-4">
    <v-row>
      <v-col cols="12">
        <FiltroAvancado />
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" lg="6">
        <v-card class="pa-2 rounded-lg" elevation="0">
          <h2 class="text-h5 font-weight-bold text-grey-darken-2 pa-3">RECEITA</h2>
          
          <v-row dense>
            <v-col v-for="kpi in kpiReceita" :key="kpi.title" cols="12" md="4">
              <KPICard v-bind="kpi" />
            </v-col>
          </v-row>

          <v-row dense class="mt-2">
            <v-col cols="12">
              <ChartCard title="RECEITAS POR MÊS">
                <ReceitasDespesasChart
                  :series="receitaMes.series"
                  :options="receitaMes.options"
                  height="250px"
                />
              </ChartCard>
            </v-col>
            <v-col cols="12" md="6">
              <ChartCard title="RECEITAS POR TRIMESTRE">
                 <ReceitasDespesasChart
                  :series="receitaTrimestre.series"
                  :options="receitaTrimestre.options"
                  height="200px"
                />
              </ChartCard>
            </v-col>
            <v-col cols="12" md="6">
              <ChartCard title="RECEITAS POR GRUPO">
                <ReceitasDespesasChart
                  :series="receitaGrupo.series"
                  :options="receitaGrupo.options"
                  height="200px"
                />
              </ChartCard>
            </v-col>
          </v-row>
        </v-card>
      </v-col>

      <v-col cols="12" lg="6">
        <v-card class="pa-2 rounded-lg" color="red-darken-4">
          <h2 class="text-h5 font-weight-bold white--text pa-3">DESPESA</h2>
          
          <v-row dense>
            <v-col v-for="kpi in kpiDespesa" :key="kpi.title" cols="12" md="4">
              <KPICard v-bind="kpi" :dark-theme="true" />
            </v-col>
          </v-row>
          
          <v-row dense class="mt-2">
            <v-col cols="12">
              <ChartCard title="DESPESAS POR MÊS" dark-theme>
                <ReceitasDespesasChart
                  :series="despesaMes.series"
                  :options="despesaMes.options"
                  height="250px"
                />
              </ChartCard>
            </v-col>
            <v-col cols="12" md="6">
              <ChartCard title="DESPESAS POR TRIMESTRE" dark-theme>
                 <ReceitasDespesasChart
                  :series="despesaTrimestre.series"
                  :options="despesaTrimestre.options"
                  height="200px"
                />
              </ChartCard>
            </v-col>
            <v-col cols="12" md="6">
              <ChartCard title="DESPESAS POR GRUPO" dark-theme>
                <ReceitasDespesasChart
                  :series="despesaGrupo.series"
                  :options="despesaGrupo.options"
                  height="200px"
                />
              </ChartCard>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { h, ref, computed, defineComponent, resolveComponent } from 'vue';
import type { ApexOptions } from 'apexcharts';
import { useFormatters } from '@/composables/useFormatters'; // Supondo que você tenha este composable

// ===================================================================================
//  SETUP PRINCIPAL E DADOS MOCKADOS
// ===================================================================================

const { formatCurrency } = useFormatters();

// --- Dados Mockados para os KPIs ---
const kpiReceita = ref([
  { title: 'ORÇADO', value: '43,7M', progress: 0, color: '#E0E0E0' },
  { title: 'REALIZADO', value: '12,4M', progress: 0, color: '#E0E0E0' },
  { title: 'SALDO', value: '31.218.770,45', progress: 28.8, color: '#29B6F6' },
]);
const kpiDespesa = ref([
  { title: 'ORÇADO', value: '23,2M', progress: 0, color: '#E0E0E0' },
  { title: 'REALIZADO', value: '19,4M', progress: 0, color: '#E0E0E0' },
  { title: 'SALDO', value: '3.734.135,03', progress: 82.9, color: '#EF5350' },
]);

// --- Dados e Opções para os Gráficos ---
const baseChartOptions: ApexOptions = {
  chart: { toolbar: { show: false }, background: 'transparent' },
  dataLabels: { enabled: false },
  grid: { show: false },
  tooltip: { theme: 'light' },
};

const receitaMes = computed(() => ({
  series: [{ name: 'Receita', data: [1.5, 2.1, 1.8, 2.5, 2.3, 2.8, 2.6, 3.1, 2.9, 3.4, 3.2, 3.8].map(v => v * 1000000) }],
  options: { ...baseChartOptions, chart: { type: 'bar' as const }, colors: ['#29B6F6'], xaxis: { categories: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'] }, tooltip: { y: { formatter: (val:number) => formatCurrency(val) } } }
}));
const receitaTrimestre = computed(() => ({
  series: [{ name: 'Receita', data: [10.1, 11.5, 10.8, 11.2].map(v => v * 1000000) }],
  options: { ...baseChartOptions, chart: { type: 'bar' as const }, colors: ['#29B6F6'], xaxis: { categories: ['1º Tri', '2º Tri', '3º Tri', '4º Tri'] }, tooltip: { y: { formatter: (val:number) => formatCurrency(val) } } }
}));
const receitaGrupo = computed(() => ({
  series: [{ name: 'Receita', data: [4.5, 4.5, 3.2].map(v => v * 1000000) }],
  options: { ...baseChartOptions, chart: { type: 'bar' as const }, colors: ['#29B6F6'], plotOptions: { bar: { horizontal: true, borderRadius: 4 } }, xaxis: { categories: ['Grupo 13', 'Grupo 12', 'Grupo 11'] }, tooltip: { y: { formatter: (val:number) => formatCurrency(val) } } }
}));

const despesaOptions = { ...baseChartOptions, theme: { mode: 'dark' }, tooltip: { theme: 'dark' } };
const despesaMes = computed(() => ({
  series: [{ name: 'Despesa', data: [1.2, 2.4, 1.5, 1.9, 1.7, 2.2, 1.8, 2.5, 2.1, 1.7, 2.0, 1.6].map(v => v * 1000000) }],
  options: { ...despesaOptions, chart: { type: 'bar' as const }, colors: ['#FFFFFF'], xaxis: { categories: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'], labels: { style: { colors: '#FFF' } } }, yaxis: { labels: { style: { colors: '#FFF' } } }, tooltip: { y: { formatter: (val:number) => formatCurrency(val) } } }
}));
const despesaTrimestre = computed(() => ({
  series: [{ name: 'Despesa', data: [4.5, 5.0, 4.8, 5.2].map(v => v * 1000000) }],
  options: { ...despesaOptions, chart: { type: 'area' as const }, colors: ['#FFFFFF'], stroke: { curve: 'smooth' }, xaxis: { categories: ['1º Tri', '2º Tri', '3º Tri', '4º Tri'], labels: { style: { colors: '#FFF' } } }, yaxis: { labels: { style: { colors: '#FFF' } } }, tooltip: { y: { formatter: (val:number) => formatCurrency(val) } } }
}));
const despesaGrupo = computed(() => ({
  series: [{ name: 'Despesa', data: [4.0, 3.5, 3.8].map(v => v * 1000000) }],
  options: { ...despesaOptions, chart: { type: 'bar' as const }, colors: ['#FFFFFF'], plotOptions: { bar: { horizontal: true, borderRadius: 4 } }, xaxis: { categories: ['Grupo 11', 'Grupo 12', 'Grupo 13'], labels: { style: { colors: '#FFF' } } }, yaxis: { labels: { style: { colors: '#FFF' } } }, tooltip: { y: { formatter: (val:number) => formatCurrency(val) } } }
}));


// ===================================================================================
//  DEFINIÇÃO DOS NOVOS COMPONENTES
// ===================================================================================

// Componente para a Barra de Filtros
const FiltroAvancado = defineComponent({
  setup() {
    const itens = {
      ano: ['TODOS', '2025', '2024'],
      trimestre: ['TODOS', '1º Trimestre', '2º Trimestre', '3º Trimestre', '4º Trimestre'],
      mes: ['TODOS', 'Janeiro', 'Fevereiro', 'Março'],
      cr: ['Programa4', 'Programa3', 'Programa2', 'Programa1'],
      grupo: ['TODOS', 'Grupo 11', 'Grupo 12', 'Grupo 13'],
    };
    return () => h(resolveComponent('v-card'), { class: 'pa-2 rounded-lg', elevation: 2 }, () => 
      h(resolveComponent('v-row'), { dense: true }, 
        Object.entries(itens).map(([label, options]) => 
          h(resolveComponent('v-col'), { cols: 12, sm: 4, md: 'auto' }, () => 
            h(resolveComponent('v-select'), {
              label: label.toUpperCase(),
              items: options,
              variant: 'solo',
              density: 'compact',
              'hide-details': true,
              modelValue: options[0]
            })
          )
        )
      )
    );
  },
});

// Componente para os Cards de KPI (ORÇADO, REALIZADO, SALDO)
const KPICard = defineComponent({
  props: {
    title: String,
    value: String,
    progress: Number,
    color: String,
    darkTheme: Boolean
  },
  setup(props) {
    const textColor = props.darkTheme ? 'white' : 'grey-darken-3';
    return () => h(resolveComponent('v-card'), { class: 'pa-3', elevation: 2, color: props.darkTheme ? 'transparent' : 'white' }, () => [
      h('p', { class: `text-caption font-weight-bold text-${textColor}` }, props.title),
      h('p', { class: `text-h5 font-weight-black text-${textColor}` }, props.value),
      1 > 0 && h(resolveComponent('v-progress-linear'), {
        modelValue: props.progress,
        color: props.color,
        height: 6,
        rounded: true,
        class: 'mt-2'
      })
    ]);
  }
});

// Componente Wrapper para os Gráficos
const ChartCard = defineComponent({
  props: {
    title: String,
    darkTheme: Boolean
  },
  setup(props, { slots }) {
    return () => h(resolveComponent('v-card'), { class: 'pa-2 h-100', elevation: 2, color: props.darkTheme ? 'transparent' : 'white' }, () => [
      h('p', { class: `text-subtitle-1 font-weight-bold pa-2 ${props.darkTheme ? 'white--text' : 'text-grey-darken-3'}` }, props.title),
      slots.default && slots.default()
    ]);
  }
});

</script>

<style scoped>
/* Estilização para o texto branco no tema escuro dos cards de despesa */
.white--text {
  color: white !important;
}
</style>