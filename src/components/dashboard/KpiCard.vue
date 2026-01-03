<template>
    <v-card class="pa-4 h-100" elevation="2" rounded="lg">
      <div class="d-flex justify-space-between align-start">
        <div>
          <p class="text-subtitle-1 text-medium-emphasis">{{ title }}</p>
          <p class="text-h4 font-weight-bold mt-1">{{ isCurrency ? formatCurrency(value) : value.toLocaleString('pt-BR') }}</p>
        </div>
        <v-avatar :color="color" rounded="lg" size="48">
          <v-icon :icon="icon" size="30"></v-icon>
        </v-avatar>
      </div>
      <div class="d-flex align-center text-caption mt-4" :class="variacao > 0 ? 'text-success' : 'text-error'">
        <v-icon size="small">{{ variacao > 0 ? 'mdi-arrow-up' : 'mdi-arrow-down' }}</v-icon>
        <span class="font-weight-bold">{{ Math.abs(variacao) }}%</span>
        <span class="ml-1 text-medium-emphasis">vs. ano anterior</span>
      </div>
    </v-card>
  </template>
  
  <script setup lang="ts">
  import { useFormatters } from '@/composables/useFormatters';
  const props = defineProps({
    title: { type: String, required: true },
    value: { type: Number, required: true },
    variacao: { type: Number, required: true },
    icon: { type: String, required: true },
    color: { type: String, default: 'primary' },
    isCurrency: { type: Boolean, default: true },
  });
  const { formatCurrency } = useFormatters();
  </script>