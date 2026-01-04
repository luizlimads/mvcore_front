import { defineStore } from 'pinia';
import { ref } from 'vue';
import { tenantService, sistemaIntegradoService } from '@/services';
import type { Tenant, SistemaIntegrado } from '@/type';

export const useTenantStore = defineStore('tenant', () => {
  const tenants = ref<Tenant[]>([]);

  async function fetchAllTenants(force: boolean = false) {
    if (tenants.value.length > 0 && !force) return;
    try {
      const response = await tenantService.fetchAll();
      tenants.value = response.data;
    } catch (error) {
      console.error("Erro ao buscar tenants:", error);
    }
  }

  function resetState() {
    tenants.value = [];
    
  }

  return { tenants, fetchAllTenants, resetState };
});

export const useSistemaIntegradoStore = defineStore('erp', () => {
  const erps = ref<SistemaIntegrado[]>([]);

  async function fetchAllSistemasIntegrados(force: boolean = false) {
    if (erps.value.length > 0 && !force) return;
    try {
      const response = await sistemaIntegradoService.fetchAll();
      erps.value = response.data;
    } catch (error) {
      console.error("Erro ao buscar sistemas integrados:", error);
    }
  }

  function resetState() {
    erps.value = [];
  }
  
  return { erps, fetchAllSistemasIntegrados, resetState };
});