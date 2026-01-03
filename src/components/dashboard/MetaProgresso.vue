<template>
    <v-card class="pa-4 h-100" elevation="2" rounded="lg">
      <div class="d-flex justify-space-between align-center mb-2">
        <span class="text-subtitle-1 font-weight-bold">{{ title }}</span>
        <v-icon color="success">mdi-flag-checkered</v-icon>
      </div>
      <p class="text-caption text-medium-emphasis">{{ subtitle }}</p>
      <v-progress-linear
        :model-value="progresso"
        color="success"
        height="10"
        rounded
        class="my-4"
      ></v-progress-linear>
      <div class="d-flex justify-space-between text-caption">
        <span>{{ formatCurrency(valorAtual) }}</span>
        <span>{{ formatCurrency(valorMeta) }}</span>
      </div>
    </v-card>
  </template>
  
  <script setup lang="ts">
  import { computed } from 'vue';
  import { useFormatters } from '@/composables/useFormatters';
  
  const props = defineProps<{
    title: string,
    subtitle: string,
    valorAtual: number,
    valorMeta: number
  }>();
  
  const { formatCurrency } = useFormatters();
  const progresso = computed(() => (props.valorAtual / props.valorMeta) * 100);
  </script>