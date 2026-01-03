<template>
  <v-app>
    <v-container fluid class="pa-4" style="background-color: #f5f5f5;">
      <v-row>
        <!-- Filtros Laterais -->
        <v-col cols="2" class="bg-blue-darken-4 white--text pa-3" style="min-height: 90vh;">
          <h3 class="white--text">2022</h3>

          <v-select label="Tipo" :items="['Despesa', 'Receita']" v-model="tipoSelecionado" dense outlined hide-details />
          <v-select label="Status" :items="['Liquidado', 'Pendente']" v-model="statusSelecionado" dense outlined hide-details />
          <v-select
            label="Categoria"
            :items="categorias"
            v-model="categoriasSelecionadas"
            multiple dense outlined hide-details
          />
          <v-select
            label="Forma de Pagamento"
            :items="formasPagamento"
            v-model="pagamentosSelecionados"
            multiple dense outlined hide-details
          />
        </v-col>

        <!-- Conteúdo Principal -->
        <v-col cols="10">
          <v-row>
            <v-col cols="4">
              <v-card elevation="2" class="pa-4 text-center">
                <div>Receitas</div>
                <h2>948.562,00</h2>
              </v-card>
            </v-col>
            <v-col cols="4">
              <v-card elevation="2" class="pa-4 text-center">
                <div>Despesas</div>
                <h2 class="red--text">275.510,00</h2>
              </v-card>
            </v-col>
            <v-col cols="4">
              <v-card elevation="2" class="pa-4 text-center">
                <div>Resultado</div>
                <h2>= 673.052,00</h2>
                <apexchart type="radialBar" height="100" :options="margemOptions" :series="[71]" />
              </v-card>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="8">
              <v-card elevation="2" class="pa-4">
                <h4>Receita vs Despesas - mensais (Mil)</h4>
                <apexchart type="line" height="250" :options="receitaDespesaOptions" :series="receitaDespesaSeries" />
              </v-card>
            </v-col>
            <v-col cols="4">
              <v-card elevation="2" class="pa-4">
                <h4>Categoria</h4>
                <apexchart type="bar" height="250" :options="categoriaOptions" :series="categoriaSeries" />
              </v-card>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="6">
              <v-card elevation="2" class="pa-4">
                <h4>Margem Mensal</h4>
                <apexchart type="bar" height="200" :options="margemMensalOptions" :series="margemMensalSeries" />
              </v-card>
            </v-col>
            <v-col cols="6">
              <v-card elevation="2" class="pa-4">
                <h4>Total</h4>
                <apexchart type="donut" height="200" :options="pagamentoOptions" :series="[60, 20, 10, 10]" />
              </v-card>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="6">
              <v-card elevation="2" class="pa-4">
                <h4>Status</h4>
                <apexchart type="pie" height="200" :options="statusOptions" :series="[70, 30]" />
              </v-card>
            </v-col>
            <v-col cols="6">
              <v-card elevation="2" class="pa-4">
                <h4>Filial RJ</h4>
                <apexchart type="radar" height="220" :options="filialRadarOptions" :series="filialRadarSeries" />
              </v-card>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script setup>
import { ref } from 'vue';

const tipoSelecionado = ref('Receita');
const statusSelecionado = ref('Liquidado');
const categoriasSelecionadas = ref([]);
const pagamentosSelecionados = ref([]);

const categorias = ['Material Prima', 'Serviços', 'Transporte', 'Treinamento', 'Vendas Direta'];
const formasPagamento = ['Crédito parcelado', 'Débito', 'Depósito', 'Pix'];

const receitaDespesaSeries = [
  {
    name: 'Receita',
    data: [203.2, 224.6, 252.7, 268.0, 0, 0, 0, 0, 0, 0, 0, 0],
  },
  {
    name: 'Despesa',
    data: [67.1, 69.0, 70.6, 68.8, 0, 0, 0, 0, 0, 0, 0, 0],
  },
];

const receitaDespesaOptions = {
  chart: { toolbar: { show: false } },
  xaxis: { categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'] },
};

const margemOptions = {
  labels: ['Margem'],
  colors: ['#007bff'],
  plotOptions: {
    radialBar: {
      hollow: { size: '60%' },
      dataLabels: { value: { fontSize: '20px', formatter: val => `${val}%` } },
    },
  },
};

const margemMensalSeries = [{ name: 'Margem', data: [67, 69, 72, 74, 0, 0, 0, 0, 0, 0, 0, 0] }];
const margemMensalOptions = {
  chart: { toolbar: { show: false } },
  xaxis: { categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'] },
  colors: ['#1565c0'],
};

const categoriaSeries = [
  {
    name: 'Valor',
    data: [735.8, 115.0, 104.0, 97.7, 31.0],
  },
];
const categoriaOptions = {
  chart: { toolbar: { show: false } },
  xaxis: { categories: ['Vendas Direta', 'Serviços', 'Mat. Prima', 'Contratos', 'Treinamento'] },
  colors: ['#fbc02d'],
};

const pagamentoOptions = {
  labels: ['Boleto', 'Crédito parcelado', 'Débito', 'Depósito'],
  colors: ['#1565c0', '#fdd835', '#ff8f00', '#a1887f'],
};

const statusOptions = {
  labels: ['Liquidado', 'Pendente'],
  colors: ['#1e88e5', '#fbc02d'],
};

const filialRadarSeries = [
  {
    name: 'Filial RJ',
    data: [343.2, 161.9, 719.0],
  },
];
const filialRadarOptions = {
  chart: { toolbar: { show: false } },
  xaxis: { categories: ['Jan', 'Feb', 'Mar'] },
};
</script>
