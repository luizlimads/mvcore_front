<template>
  <BaseCard
    :title="title"
    :subtitle="subtitle">
    <apexchart
      :type="type"
      height="350"
      :options="computedChartOptions"
      :series="series"
    />
  </BaseCard>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useFormatters } from '@/composables/useFormatters';

type ApexChartType = 'line' | 'area' | 'bar' | 'pie' | 'donut' | 'radialBar' | 'scatter' | 'bubble' | 'heatmap' | 'candlestick' | 'radar' | 'polarArea';

const { formatCurrency } = useFormatters();

// --- DEFINIÇÃO DAS PROPS ---
// O componente agora declara as propriedades que espera receber do pai.

// Interface para tipar uma única série de dados
interface SeriesItem {
  name: string;
  data: number[];
}

// Interface para todas as props do componente
interface Props {
  series: SeriesItem[];
  categories: string[];
  title?: string; // Prop opcional para o título
  subtitle?: string; // Prop opcional para o subtítulo
  type?: ApexChartType;
}

// Usamos `withDefaults` para definir valores padrão para as props opcionais
const props = withDefaults(defineProps<Props>(), {
  title: 'Entradas e Despesas',
  subtitle: 'Análise dos últimos 12 meses',
  type: 'area',
});

// --- OPÇÕES DO GRÁFICO ---
// As opções de ESTILO do gráfico permanecem aqui, pois fazem parte da sua apresentação.
// No entanto, as opções que dependem de DADOS (como as categorias do eixo X)
// agora serão mescladas usando uma propriedade computada.

const baseChartOptions = {
  chart: {
    height: 350,
    toolbar: { show: false },
    zoom: {
      enabled: false
    }
  },
  colors: ['#67a9cf', '#ef8a62'],
  dataLabels: { enabled: false },
  stroke: { curve: 'smooth', width: 2 },
  fill: {
    type: 'gradient',
    gradient: {
      shadeIntensity: 1,
      opacityFrom: 1,
      opacityTo: 1,
      stops: [0, 90, 100],
    },
  },
  yaxis: {
    labels: {
      formatter: formatCurrency,
    },
  },
  
  // ✅ 4. ADAPTAÇÃO DO TOOLTIP
  // Fazemos o mesmo para o tooltip, garantindo consistência.
  tooltip: {
    x: { format: 'dd MMM yyyy' },
    y: {
      formatter: formatCurrency,
    },
  },
  legend: {
    position: 'top',
    horizontalAlign: 'right',
  },
};

const computedChartOptions = computed(() => ({
  ...baseChartOptions,
  chart: {
    ...baseChartOptions.chart, // Mantém outras configurações do 'chart' (height, toolbar)
    type: props.type, // Define o tipo do gráfico com base na prop
  },
  xaxis: {
    type: 'datetime',
    categories: props.categories, // Usa as categorias recebidas via prop
    labels: {
      format: 'MMM yy',
    },
  },
}));

</script>

