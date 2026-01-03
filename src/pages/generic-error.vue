<template>
    <v-container class="fill-height" fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="6" lg="4" class="text-center">
          <v-icon size="120" color="grey-lighten-1">mdi-alert-circle-outline</v-icon>
          <h1 class="text-h2 font-weight-bold my-4 text-grey-darken-2">404</h1>
          <p class="text-h5 text-medium-emphasis mb-6">
            Página não encontrada
          </p>
          <p class="text-body-1 text-medium-emphasis mb-8">
            A rota que você está procurando não existe ou foi movida.
          </p>
          <v-btn
            color="primary"
            size="large"
            to="/"
            prepend-icon="mdi-home"
          >
            Voltar para a Home
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script setup lang="ts">
  // Nenhum script necessário
  </script>
  
  <style scoped>
  .fill-height {
    min-height: 80vh;
  }
  </style>