<template>
    <BaseCard :id="cardId" >
      <div class="d-flex justify-space-between align-start">
        <div>
          <p class="text-subtitle-2 text-primary">{{ title }}</p>
          <h4 class="text-h6 font-weight-bold mb-2 text-primary">{{ value }}</h4>
        </div>
        <!-- <span v-if="secondaryText" class="text-caption text-primary">
          {{ secondaryText }}
        </span> -->
      </div>
      
      <!-- <apexchart
        type="line"
        height="40"
        :options="chartOptions"
        :series="series"
      ></apexchart> -->
    </BaseCard>
  </template>
  
<script lang="ts" setup>
    interface Props {
        title: string;
        value: string;
        cardId: string;
        chartOptions: object;
        series: any[];
        secondaryText?: string; // O '?' indica que esta prop é opcional.
    }
  
    defineProps<Props>();
</script>
