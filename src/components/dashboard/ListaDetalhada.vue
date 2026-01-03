<template>
    <v-card class="pa-4 h-100" elevation="2" rounded="lg">
      <v-card-title class="text-subtitle-1 font-weight-bold">{{ title }}</v-card-title>
      <v-list lines="one" density="compact">
        <v-list-item
          v-for="item in items"
          :key="item.titulo"
          class="px-0"
        >
          <template #prepend>
            <v-icon :color="item.cor || 'primary'">{{ item.icone || 'mdi-circle-medium' }}</v-icon>
          </template>
          <v-list-item-title>{{ item.titulo }}</v-list-item-title>
          <template #append>
            <span class="font-weight-bold">{{ formatCurrency(item.valor) }}</span>
          </template>
        </v-list-item>
      </v-list>
    </v-card>
  </template>
  <script setup lang="ts">
  import { useFormatters } from '@/composables/useFormatters';
  const props = defineProps<{
    title: string,
    items: { titulo: string, valor: number, icone?: string, cor?: string }[]
  }>();
  const { formatCurrency } = useFormatters();
  </script>