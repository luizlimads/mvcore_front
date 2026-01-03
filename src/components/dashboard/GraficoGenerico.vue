<template>
    <v-card class="pa-4 h-100 d-flex flex-column" elevation="2" rounded="lg">
      <v-card-title class="text-subtitle-1 font-weight-bold">{{ title }}</v-card-title>
      <v-card-subtitle v-if="subtitle">{{ subtitle }}</v-card-subtitle>
      
      <v-card-text class="flex-grow-1">
        <apexchart
          :type="type"
          width="100%"
          height="100%"
          :options="computedChartOptions"
          :series="series"
        />
      </v-card-text>
    </v-card>
  </template>
  
  <script lang="ts" setup>
  import { computed } from 'vue';
  import { useFormatters } from '@/composables/useFormatters';
  import { useTheme } from 'vuetify';
  
  // --- DEFINIÇÃO DOS TIPOS ---
  type ApexChartType = 'line' | 'area' | 'bar' | 'pie' | 'donut' | 'radialBar';
  interface SeriesItem {
    name: string;
    data: number[];
  }
  
  // --- DEFINIÇÃO DAS PROPS ---
  // O componente declara todas as propriedades que ele pode receber do pai.
  const props = defineProps({
    // Título exibido no card
    title: { type: String, required: true },
    subtitle: { type: String, default: '' },
    
    // O tipo do gráfico (bar, line, donut, etc.)
    type: { type: String as PropType<ApexChartType>, default: 'bar' },
    
    // Os dados do gráfico. Aceita os dois formatos principais do ApexCharts.
    series: { type: Array as PropType<SeriesItem[] | number[]>, required: true },
    
    // Usado para o eixo X de gráficos de barra/linha
    categories: { type: Array as PropType<string[]>, default: () => [] },
    
    // Usado para as legendas de gráficos de pizza/donut
    labels: { type: Array as PropType<string[]>, default: () => [] },
  
    // Um objeto para passar qualquer configuração avançada e específica do ApexCharts
    options: { type: Object, default: () => ({}) },
  });
  
  
  // --- LÓGICA INTERNA ---
  const { formatCurrency } = useFormatters();
  const theme = useTheme();
  
  // ✅ O "CÉREBRO" DO COMPONENTE:
  //    Esta propriedade computada monta o objeto de opções final,
  //    mesclando as configurações base, as props individuais e as opções customizadas.
  const computedChartOptions = computed(() => {
    // 1. Opções base, que se aplicam a quase todos os gráficos
    const baseOptions = {
      chart: {
        toolbar: { show: false },
        zoom: { enabled: false },
      },
      dataLabels: { enabled: false },
      legend: {
        position: 'bottom',
        horizontalAlign: 'center',
      },
      // Usa as cores do tema como padrão
      colors: [
        theme.current.value.colors.chart01,
        theme.current.value.colors.chart02,
        theme.current.value.colors.chart03,
        theme.current.value.colors.chart04,
        theme.current.value.colors.chart05,
      ],
    };
  
    // 2. Opções derivadas das props individuais
    const optionsFromProps = {
      chart: { type: props.type },
      xaxis: { categories: props.categories },
      labels: props.labels, // Para gráficos de donut/pizza
      tooltip: {
        y: { formatter: (value: number) => formatCurrency(value) }
      },
    };
  
    // 3. Mescla tudo, dando prioridade para as 'props.options'
    //    Isso permite que o componente pai sobrescreva qualquer configuração.
    return {
      ...baseOptions,
      ...optionsFromProps,
      ...props.options, // Opções customizadas do pai vêm por último
      chart: {
        ...baseOptions.chart,
        ...optionsFromProps.chart,
        ...(props.options as any)?.chart,
      },
      xaxis: {
        ...optionsFromProps.xaxis,
        ...(props.options as any)?.xaxis,
      },
    };
  });
  </script>