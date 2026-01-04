<template>
  <v-btn
    prepend-icon="mdi-arrow-left"
    color="primary"
    variant="text"
    @click="router.back()"
  >
    Voltar
  </v-btn>
  <v-container>
    <SystemTable/>
  </v-container>
</template>

<script lang="ts" setup>
  import { useRouter } from 'vue-router';
  import SystemTable from '@/components/SystemTable.vue';
  import { useSistemaIntegradoStore, useSnackbarStore } from '@/stores';
  import { SYSTEM_MESSAGES } from '@/constants/messages';

  const erpDataStore = useSistemaIntegradoStore();
  const snackbarDataStore = useSnackbarStore();

  const router = useRouter();

  onMounted(
    async () => {
      try {
        await erpDataStore.fetchAllSistemasIntegrados();
      } catch (error) {
        snackbarDataStore.showSnackbar(SYSTEM_MESSAGES.ERROR.SERVER_UNAVAILABLE, 'error');      
      }
    }
  );

</script>