<template>
  <v-container style="width: 250px" class="pa-4 bg-primary">
    <v-list  dense nav class=" bg-primary">
      <v-list-item class="justify-center mb-6">
        <v-img
          src="@/assets/MV Core - LOGO SEM SLOGAN - COLOR.png"
          alt="Logo MVCore"
          max-width="160"
          contain
        />
      </v-list-item>

      <v-list-item
        v-for="item in navItems"
        :key="item.title"
        :to="item.route"
        #prepend
      >
        <v-icon class="me-2">{{ item.icon }}</v-icon>
        <v-list-item-title class="text-subtitle-1">{{ item.title }}</v-list-item-title>
      </v-list-item>

      <v-list-item 
        v-if="myUser?.is_superuser"
        key='Administração'
        to='/administracao'
        #prepend
      >
        <v-icon class="me-2">mdi-cog</v-icon>
        <v-list-item-title class="text-subtitle-1">Administração</v-list-item-title>
      </v-list-item>      
    </v-list>
    
    <v-spacer ></v-spacer>

    <FiltroPeriodoAvancado @update:periodo="onPeriodoChange" />
  </v-container>
</template>

<script setup lang="ts">

  import { useUserStore } from '@/stores';
  import FiltroPeriodoAvancado from '../FiltroPeriodoAvancado.vue';
  const userStore = useUserStore();
  const { myUser } = storeToRefs(userStore);

  const navItems = [
    { title: 'Financeiro', icon: 'mdi-home', route: '/financeiro' },
    { title: 'Financeiro 1', icon: 'mdi-home', route: '/financeiro1' },
    { title: 'Financeiro 2', icon: 'mdi-home', route: '/financeiro2' },
    { title: 'Financeiro 02', icon: 'mdi-home', route: '/financeiro02' },
    { title: 'Financeiro 3', icon: 'mdi-home', route: '/financeiro3' },
    { title: 'Lucratividade', icon: 'mdi-finance', route: '/lucratividade' },
    { title: 'Pagamentos', icon: 'mdi-cash-multiple', route: '/pagamentos' },
    { title: 'Resultados', icon: 'mdi-chart-pie', route: '/resultados' },
    { title: 'Dashboard 01', icon: 'mdi-chart-pie', route: '/dashboard01' },
    { title: 'Dashboard 02', icon: 'mdi-chart-pie', route: '/dashboard02' },
    { title: 'Dashboard 03', icon: 'mdi-chart-pie', route: '/dashboard03' },
    { title: 'Dashboard 04', icon: 'mdi-chart-pie', route: '/dashboard04' },
    { title: 'Dashboard 05', icon: 'mdi-chart-pie', route: '/dashboard05' },
    { title: 'Dashboard 06', icon: 'mdi-chart-pie', route: '/dashboard06' },
    { title: 'Dashboard 07', icon: 'mdi-chart-pie', route: '/dashboard07' },
    { title: 'Dashboard 08', icon: 'mdi-chart-pie', route: '/dashboard08' },
  ]
  function onPeriodoChange(novoPeriodo: { data_inicial: string, data_final: string }) {
  console.log('Novo período recebido do filtro avançado:', novoPeriodo);
  // Chame aqui a sua função que busca os dados da API
  // ex: fetchFinancialData(novoPeriodo);
}
</script>
