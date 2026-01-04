import { defineStore } from 'pinia';
import { useRouter } from 'vue-router';

import { useUsuarioStore, useTenantStore, useSistemaIntegradoStore } from '@/stores';

export const useAuthStore = defineStore('auth', () => {
  const router = useRouter();

  async function logout() {

    const userStore = useUsuarioStore();
    const tenantStore = useTenantStore();
    const erpStore = useSistemaIntegradoStore();

    userStore.resetState();
    tenantStore.resetState();
    erpStore.resetState();

    await router.replace('/');
  }

  return { logout };
});