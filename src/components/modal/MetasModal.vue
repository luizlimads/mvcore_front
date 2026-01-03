<template>
    <BaseModal
      v-model="dialogModal"
      title="Gerenciar Metas de Vendas"
      primaryLabel="Salvar Metas"
      :onPrimaryAction="salvarMetas"
    >
      <v-card-text class="mt-4">
        <p class="text-body-2 mb-6 text-primary">
          Ajuste os valores de meta para os meses anteriores e futuros.
        </p>
        <v-row v-for="(meta, index) in metasEditaveis" :key="meta.mes" align="center">
          <v-col cols="5">
            <span class="font-weight-medium text-primary">{{ meta.mes }}</span>
          </v-col>
          <v-col cols="7">
            <v-text-field
              v-model.number="meta.valor"
              type="number"
              variant="outlined"
              density="compact"
              prefix="R$"
              hide-details
            />
          </v-col>
        </v-row>
      </v-card-text>
    </BaseModal>
  </template>
  
  <script setup lang="ts">
  import { ref, watch } from 'vue';
  import { useSnackbarStore } from '@/stores';
  import { SYSTEM_MESSAGES } from '@/constants/messages';
  
  // Definição das props que o componente recebe
  const props = defineProps<{
    modelValue: boolean;
    metas: { mes: string; valor: number }[];
  }>();
  
  // Definição dos eventos que o componente emite
  const emit = defineEmits(['update:modelValue', 'salvar']);
  
  const snackbar = useSnackbarStore();
  
  // Sincroniza o estado de visibilidade do modal com o componente pai
  const dialogModal = computed({
    get: () => props.modelValue,
    set: (value) => emit('update:modelValue', value),
  });
  
  // Cria uma cópia local e editável das metas para não alterar a prop diretamente
  const metasEditaveis = ref<{ mes: string; valor: number }[]>([]);
  
  // Observa mudanças nas props e atualiza a cópia local
  watch(() => props.metas, (novasMetas) => {
    // Usamos structuredClone para uma cópia profunda e segura dos dados
    metasEditaveis.value = structuredClone(novasMetas);
  }, { immediate: true, deep: true });
  
  
  // Função chamada ao clicar no botão de salvar
  function salvarMetas() {
    // Emite um evento 'salvar' com os dados atualizados
    emit('salvar', metasEditaveis.value);
    snackbar.showSnackbar(SYSTEM_MESSAGES.SUCCESS.OPERATION, 'success');
    dialogModal.value = false;
  }
  </script>
  