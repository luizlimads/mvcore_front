<!-- pages/FinanceiroDashboard.vue -->
<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" md="6">
        <BaseCard>
          <apexchart
            type="bar"
            height="250"
            :options="receitaDespesaOptions"
            :series="receitaDespesaSeries"
          />
        </BaseCard>
      </v-col>

      <v-col cols="12" md="6">
        <BaseCard>
          <apexchart
            type="area"
            height="250"
            :options="saldoOptions"
            :series="saldoSeries"
          />
        </BaseCard>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { getFinanceiroResumo } from '@/services'
import { useFinanceiroSeries } from '@/composables/use-saldo-series'

import { receitaDespesaChart } from '@/components/charts/financeiro/receita-despesa.chart'
import { saldoChart } from '@/components/charts/financeiro/saldo-acumulado.chart'

const data = getFinanceiroResumo()

const {
  receitaDespesaSeries,
  saldoSeries
} = useFinanceiroSeries(data)

const receitaDespesaOptions = receitaDespesaChart(data.meses)
const saldoOptions = saldoChart(data.meses)
</script>
