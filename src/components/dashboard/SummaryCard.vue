<template>
  <v-card class="pa-2 h-100" elevation="2" rounded="lg">
    <v-card-title class="text-subtitle-1 text-grey-darken-1">{{ title }}</v-card-title>
    <v-card-text>
      <div class="d-flex align-center justify-space-between">
        <span class="text-h4 font-weight-bold">{{ formatCurrency(value) }}</span>
        
        <div v-if="props.series && props.series.length > 0" style="width: 100px;">
          <apexchart :options="chartOptions" :series="series" height="60" />
        </div>

      </div>
    </v-card-text>
  </v-card>
</template>
  
<script setup lang="ts">
  import { computed } from 'vue';
  import { useFormatters } from '@/composables/useFormatters';

  const props = defineProps<{
    title: string;
    value: number;
    series?: any[];
    chartOptions?: object;
  }>();

  const { formatCurrency } = useFormatters();
  
</script>