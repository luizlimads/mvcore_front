import { defineStore } from 'pinia';
import { ref } from 'vue';
import { lancamentoService } from '@/services';
import type { Lancamento,  } from '@/type';

export const useLancamentoStore = defineStore('lancamento', () => {

    const lancamentos = ref<Lancamento[]>([]);
    const entradas = ref<number[]>([]);
    const saidas = ref<number[]>([]);

    async function fetchAllLancamentos(force: boolean = false, dataInicio: string, dataFim: string) {
        if (lancamentos.value.length > 0 && !force) return;
        try {
        const response = await lancamentoService.fetchAll(dataInicio, dataFim);
        lancamentos.value = response.data;
        handleLancamentos(lancamentos.value)
        } catch (error) {
        console.error("Erro ao buscar lançamentos:", error);
        }
    }

    function handleLancamentos (lancamentos: Lancamento[]){
        entradas.value = [];
        lancamentos.forEach(f => {
            if(f.tipo==='Crédito'){
                entradas.value.push(f.valor)
            }else{
                saidas.value.push(f.valor)
            }
        });
        console.log(entradas.value)

    }

    function resetState() {
        lancamentos.value = [];
    }
  
    return {
        lancamentos,
        entradas,
        fetchAllLancamentos,
        resetState };
});