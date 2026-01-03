<template>
    <v-card class="pa-2 h-100" elevation="2" rounded="lg">
      <v-card-title>Resumo por Conta</v-card-title>
      <v-card-subtitle>Balanço no período selecionado</v-card-subtitle>
      <v-data-table
        :headers="headers"
        :items="items"
        density="compact"
        hide-default-footer
      >
        <template v-slot:item.saldo="{ value }">
          <v-chip :color="value > 0 ? 'success' : 'error'" size="small" label>
            {{ formatCurrency(value) }}
          </v-chip>
        </template>
      </v-data-table>
    </v-card>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import { useFormatters } from '@/composables/useFormatters';
  
  const props = defineProps<{ items: any[] }>();
  const { formatCurrency } = useFormatters();
  
  const headers = ref([
    { title: 'Descrição da Conta', key: 'descricao_conta' },
    { title: 'Saldo', key: 'saldo', align: 'end' },
  ] as const);
  </script>