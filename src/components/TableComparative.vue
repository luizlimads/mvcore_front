<template>
  <BaseCard
    :title="title"
  >     
      <div v-if="carregando" class="text-center pa-10">
        <v-progress-circular indeterminate color="primary" size="64"></v-progress-circular>
        <p class="mt-4 text-medium-emphasis">Buscando e processando dados...</p>
      </div>
      
      <v-data-table
      v-else
      :headers="headers"
      :items="displayItems"
      item-value="id"
      hide-default-footer
      class="elevation-0 bg-secondary custom-table-style"
      density="compact"
      
      >
      <template v-slot:item.name="{ item }">
        <div class="d-flex align-center" :style="{ paddingLeft: `${item.level * 24}px` }">
          <v-icon
          v-if="item.hasChildren"
          :icon="isExpanded(item.id) ? 'mdi-chevron-down' : 'mdi-chevron-right'"
          size="small"
          class="mr-2"
          @click.stop="toggleRow(item.id)"
          ></v-icon>
          <v-icon v-else size="small" class="mr-2" style="opacity: 0;"></v-icon>
          <span>{{ item.name }}</span>
        </div>
      </template>
      
      <template v-slot:item.valueA="{ item }">
        <span class="font-weight-bold" v-if="item.valueA != null">
          {{ formatCurrency(item.valueA) }}
        </span>
      </template>
      
      <template v-slot:item.valueB="{ item }">
        <span class="font-weight-bold" v-if="item.valueB != null">
          {{ formatCurrency(item.valueB) }}
        </span>
      </template>
      
      <template v-slot:item.variation="{ item }">
        <v-chip v-if="item.variation != null" :color="getVariationColor(item.variation)" size="small" label>
          <v-icon start :icon="getVariationIcon(item.variation)"></v-icon>
          {{ item.variation.toFixed(2) }}%
        </v-chip>
      </template>
    </v-data-table>
</BaseCard>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue';

interface TableItem {
  id: string;
  name: string;
  valueA: number | null;
  valueB: number | null;
  variation: number | null;
  level: number;
  parentId: string | null;
  hasChildren: boolean;
}

const carregando = ref(true);
const flatData = ref<TableItem[]>([]);
const expandedRows = ref(new Set<string>());

const title = ref('Entradas e Saídas')

const dadosPeriodoA = ref({
  "saidas": { "despesasFinanceiras": { "taxaAdm": 20.00, "juros": 15.00 }, "fornecedores": 850.00, "outrasDespesas": 110.00 },
  "entradas": { "receitaVendas": { "vendas": 1500.00, "recebimentoCrediario": 450.00 } }
});

const dadosPeriodoB = ref({
  "saidas": { "despesasFinanceiras": { "taxaAdm": 22.00, "juros": 10.00 }, "fornecedores": 980.00, "outrasDespesas": 100.00 },
  "entradas": { "receitaVendas": { "vendas": 1800.00, "recebimentoCrediario": 400.00 }, "outrasReceitas": { "jurosAplicacao": 50.00 } }
});


onMounted(() => {
  // Simula uma chamada de API com 1.5 segundos de atraso
  setTimeout(() => {
    const mergedData = flattenAndMergeObjects(dadosPeriodoA.value, dadosPeriodoB.value);
    const dataWithTotals = calculateParentTotals(mergedData);
    flatData.value = calculateVariation(dataWithTotals);
    
    // Expande os nós de primeiro nível por padrão
    flatData.value.forEach(item => {
      if (item.level === 0) expandedRows.value.add(item.id);
    });
    
    carregando.value = false;
  }, 1500);
});


function flattenAndMergeObjects(dataA: any, dataB: any): TableItem[] {
  const itemMap = new Map<string, Partial<TableItem>>();
    const processObject = (obj: any, valueKey: 'valueA' | 'valueB', level = 0, parentId: string | null = null) => {
      if (!obj) return;
    for (const key in obj) {
      if (key.toLowerCase().includes('total')) continue;
      const id = parentId ? `${parentId}-${key}` : key;
      const value = obj[key];
      const isObject = typeof value === 'object' && value !== null;
      if (!itemMap.has(id)) {
        itemMap.set(id, { id, name: key, level, parentId, hasChildren: isObject });
      }
      const item = itemMap.get(id)!;
      if (!isObject && typeof value === 'number') {
        item[valueKey] = value;
      }
      if (isObject) {
        processObject(value, valueKey, level + 1, id);
      }
    }
  };
  processObject(dataA, 'valueA');
  processObject(dataB, 'valueB');
  return Array.from(itemMap.values()).map(item => ({
    id: item.id!, name: item.name!, valueA: item.valueA ?? 0, valueB: item.valueB ?? 0,
    variation: null, level: item.level!, parentId: item.parentId!, hasChildren: item.hasChildren!,
  }));
}

function calculateParentTotals(items: TableItem[]): TableItem[] {
  const valueAMap = new Map<string, number>();
  const valueBMap = new Map<string, number>();
  for (let i = items.length - 1; i >= 0; i--) {
    const item = items[i];
    let currentA = 0, currentB = 0;
    if (item.hasChildren) {
      const children = items.filter(child => child.parentId === item.id);
      currentA = children.reduce((sum, child) => sum + (valueAMap.get(child.id) || 0), 0);
      currentB = children.reduce((sum, child) => sum + (valueBMap.get(child.id) || 0), 0);
    } else {
      currentA = item.valueA || 0;
      currentB = item.valueB || 0;
    }
    valueAMap.set(item.id, currentA);
    valueBMap.set(item.id, currentB);
  }
  return items.map(item => ({ ...item, valueA: valueAMap.get(item.id) ?? null, valueB: valueBMap.get(item.id) ?? null }));
}

function calculateVariation(items: TableItem[]): TableItem[] {
  return items.map(item => {
    if (item.valueA != null && item.valueB != null && item.valueA !== 0) {
      return { ...item, variation: ((item.valueB - item.valueA) / item.valueA) * 100 };
    }
    return item;
  });
}

const headers = [
  { title: 'Descrição', key: 'name', sortable: false, width: '35%' },
  { title: 'Período A', key: 'valueA', align: 'center', sortable: false },
  { title: 'Período B', key: 'valueB', align: 'center', sortable: false },
  { title: 'Variação %', key: 'variation', align: 'center', sortable: false },
] as const;

const displayItems = computed(() => {
  return flatData.value.filter(item => {
    if (item.level === 0) return true;
    let currentParentId = item.parentId;
    while (currentParentId !== null) {
      if (!expandedRows.value.has(currentParentId)) return false;
      const parent = flatData.value.find(p => p.id === currentParentId);
      currentParentId = parent ? parent.parentId : null;
    }
    return true;
  });
});

function toggleRow(id: string) {
  if (expandedRows.value.has(id)) {
    expandedRows.value.delete(id);
  } else {
    expandedRows.value.add(id);
  }
}

function isExpanded(id: string): boolean {
  return expandedRows.value.has(id);
}

function formatCurrency(value: number): string {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function getVariationColor(variation: number): string {
  if (variation > 0) return 'chart01';
  if (variation < 0) return 'error';
  return 'grey';
}

function getVariationIcon(variation: number): string {
  if (variation > 0) return 'mdi-arrow-up-thin';
  if (variation < 0) return 'mdi-arrow-down-thin';
  return 'mdi-minus';
}
</script>

<style scoped>
.custom-table-style :deep(td){
  font-size: .78rem;
}
.custom-table-style :deep(th) {
  font-size: 0.8rem;
  padding: 2px !important; 
}
</style>