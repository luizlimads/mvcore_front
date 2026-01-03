<template>
  <v-card :class="['pa-4', 'd-flex', 'flex-column', 'align-center', 'justify-center', 'text-center']" :style="cardStyle">
    <div class="font-weight-bold text-uppercase mb-1" style="font-size: 0.9rem;">
      {{ label }}
    </div>
    <div class="font-weight-bold" :style="{ fontSize: '1.6rem' }">
      {{ value }}
    </div>
  </v-card>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  label: string;
  value: string | number;
  gradient?: string;
}>();

const cardStyle = computed(() => ({
  background: props.gradient || 'linear-gradient(135deg, #42a5f5, #00bcd4)',
  color: '#fff',
  borderRadius: '12px',
  minHeight: '100px'
}));
</script>

<style scoped>
.v-card {
  transition: 0.3s;
}
</style>
