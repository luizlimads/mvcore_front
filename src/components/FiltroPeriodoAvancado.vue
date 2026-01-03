<template>
  <v-sheet rounded="lg" class="pa-4" color="transparent">
    <div class="text-h6 font-weight-bold mb-4">Filtros</div>

    <v-form @submit.prevent="handleBusca">
      <v-label class="text-subtitle-2 font-weight-bold mb-2">Período A</v-label>
      <VueDatePicker
        v-model="periodoA"
        range
        locale="pt-BR"
        format="dd/MM/yy"
        :enable-time-picker="false"
        auto-apply
        placeholder="Selecione o Período A"
        class="mb-4"
        :min-date="minDate" :max-date="maxDate"
        :start-date="maxDate"
        prevent-min-max-navigation

      />
      
      <v-btn
        type="submit"
        color="white"
        variant="flat"
        block
        class="mt-6"
        prepend-icon="mdi-magnify"
      >
        Buscar
      </v-btn>
    </v-form>
    
  </v-sheet>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
const emit = defineEmits(['buscar']);


const disabledDates = computed(() => {
  const today = new Date();

  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)

  const afterTomorrow = new Date(tomorrow);
  afterTomorrow.setDate(tomorrow.getDate() + 1);

  return [tomorrow, afterTomorrow]
})


const periodoA = ref<[Date, Date]>();

function formatarDataParaAPI(data: Date): string {
  return data.toISOString().split('T')[0];
}

function handleBusca() {
  if (periodoA.value) {
    const periodos = {
      periodoA: {
        data_inicial: formatarDataParaAPI(periodoA.value[0]),
        data_final: formatarDataParaAPI(periodoA.value[1]),
      }
    };
    emit('buscar', periodos);
  } else {
    // Opcional: Adicionar um alerta/snackbar para o usuário
    alert('Por favor, selecione os dois períodos para realizar a busca.');
  }
}

const minDate = ref(new Date(2025, 0, 10)); // Mês é 0-indexado, então janeiro é 0
const maxDate = ref(new Date(2025, 2, 16)); // Mês é 0-indexado, então março é 2

// Define valores iniciais para os filtros
onMounted(() => {
});
</script>

<style>

</style>