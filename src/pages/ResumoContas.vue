<template>
    <v-card elevation="2" rounded="lg">
      <v-card-title>Resumo por Conta</v-card-title>
      <v-card-subtitle>Balanço de entradas e saídas no período selecionado</v-card-subtitle>
      
      <v-data-table
        :headers="headers"
        :items="itemsComSaldo"
        item-value="id"
        class="elevation-0"
        hide-default-footer
      >
        <template v-slot:item.total_entradas="{ value }">
          <span class="text-success">{{ formatCurrency(value) }}</span>
        </template>
  
        <template v-slot:item.total_saidas="{ value }">
          <span class="text-error">{{ formatCurrency(value) }}</span>
        </template>
  
        <template v-slot:item.saldo="{ value }">
          <span class="font-weight-bold" :class="getSaldoColor(value)">
            {{ formatCurrency(value) }}
          </span>
        </template>
      </v-data-table>
    </v-card>
  </template>
  
  <script lang="ts" setup>  
  // --- Interface e Props ---
  // Define a estrutura de um único item do resumo
  interface ResumoItem {
    id: string;
    descricao_conta: string;
    total_entradas: number;
    total_saidas: number;
  }
  
  // Define as props que o componente espera receber do pai
  const props = defineProps({
    items: {
      type: Array as PropType<ResumoItem[]>,
      required: true
    }
  });
  
  
  // --- Lógica do Componente ---
  
  // Cabeçalhos da tabela
  const headers = [
    { title: 'Descrição da Conta', key: 'descricao_conta', sortable: true },
    { title: 'Saldo', key: 'saldo', align: 'end', sortable: true },
  ] as const;
  
  
  // Propriedade computada para adicionar o campo 'saldo' a cada item
  const itemsComSaldo = computed(() => {
    return props.items.map(item => ({
      ...item,
      saldo: item.total_entradas - item.total_saidas
    }));
  });
  
  // Funções auxiliares de formatação e estilo
  function formatCurrency(value: number): string {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }
  
  function getSaldoColor(saldo: number): string {
    if (saldo > 0) return 'text-success';
    if (saldo < 0) return 'text-error';
    return 'text-grey';
  }
  </script>