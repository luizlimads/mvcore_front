<template>
  <BaseCard title="Filtrar por Período">
    <v-row dense>
      <v-col cols="12" md="6">
        <v-menu
          v-model="menuInicio"
          :close-on-content-click="false"
          transition="scale-transition"
          offset-y
        >
          <template v-slot:activator="{ props }">
            <v-text-field
              v-model="formattedDataInicial"
              label="Data Início"
              prepend-inner-icon="mdi-calendar"
              readonly
              v-bind="props"
              variant="outlined"
              density="compact"
              hide-details
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="dataInicial"
            @update:model-value="menuInicio = false"
            hide-header
            color="primary"
          ></v-date-picker>
        </v-menu>
      </v-col>

      <v-col cols="12" md="6">
        <v-menu
          v-model="menuFim"
          :close-on-content-click="false"
          transition="scale-transition"
          offset-y
        >
          <template v-slot:activator="{ props }">
            <v-text-field
              v-model="formattedDataFinal"
              label="Data Fim"
              prepend-inner-icon="mdi-calendar"
              readonly
              v-bind="props"
              variant="outlined"
              density="compact"
              hide-details
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="dataFinal"
            @update:model-value="menuFim = false"
            :min="dataInicial"
            hide-header
            color="primary"
          ></v-date-picker>
        </v-menu>
      </v-col>
    </v-row>

    <v-btn
      @click="aplicarFiltro"
      :disabled="!isRangeValid"
      color="primary"
      block
      class="mt-4"
    >
      Aplicar Filtro
    </v-btn>
  </BaseCard>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import dayjs from 'dayjs'; // Dayjs é ótimo para formatação de datas

// Estado dos Menus e Datas
const menuInicio = ref(false);
const menuFim = ref(false);
const dataInicial = ref<Date | null>(null);
const dataFinal = ref<Date | null>(null);

const emit = defineEmits(['update:periodo']);

// Formata as datas para exibição no formato brasileiro
const formattedDataInicial = computed(() => {
  return dataInicial.value ? dayjs(dataInicial.value).format('DD/MM/YYYY') : '';
});

const formattedDataFinal = computed(() => {
  return dataFinal.value ? dayjs(dataFinal.value).format('DD/MM/YYYY') : '';
});

// Valida se ambas as datas foram selecionadas para habilitar o botão
const isRangeValid = computed(() => !!dataInicial.value && !!dataFinal.value);

// Função chamada pelo botão para emitir o evento
function aplicarFiltro() {
  if (!isRangeValid.value) return;

  // Garante que as datas estão no formato YYYY-MM-DD para a API
  const payload = {
    data_inicial: dayjs(dataInicial.value).format('YYYY-MM-DD'),
    data_final: dayjs(dataFinal.value).format('YYYY-MM-DD'),
  };

  console.log('Período selecionado:', payload);

  // Emite o evento para o componente pai
  emit('update:periodo', payload);
}
</script>