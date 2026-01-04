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
    <TenantTable/>
  </v-container>
</template>

<script lang="ts" setup>
  import { useRouter } from 'vue-router';

  import TenantTable from '@/components/TenantTable.vue';
  import { useTenantStore, useSistemaIntegradoStore, useUsuarioStore, useSnackbarStore } from '@/stores';
  import { SYSTEM_MESSAGES } from '@/constants/messages';
  
  const tenantDataStore = useTenantStore();
  const erpDataStore = useSistemaIntegradoStore();
  const userDataStore = useUsuarioStore();
  const snackbarDataStore = useSnackbarStore();

  const router = useRouter();

  onMounted(
    async () => {
      try {
      await tenantDataStore.fetchAllTenants();
      await erpDataStore.fetchAllSistemasIntegrados();
      await userDataStore.fetchAllUsuarios();
      } catch (error) {
        snackbarDataStore.showSnackbar(SYSTEM_MESSAGES.ERROR.SERVER_UNAVAILABLE, 'error');      
      }
    }
  );

</script>