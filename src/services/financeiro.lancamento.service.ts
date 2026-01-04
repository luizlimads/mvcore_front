import apiClient from '@/api/apiClient';
import { ENDPOINTS } from '@/constants/endpoints';
import type { ApiResponse, Lancamento } from '@/type';

export const lancamentoService = {
  async fetchAll(data_lancamento_inicio:string, data_lancamento_fim: string): Promise<ApiResponse<Lancamento[]>> {
    const response = await apiClient.get<Lancamento[]>(`${ENDPOINTS.LANCAMENTO}?data_lancamento_inicio=${data_lancamento_inicio}&data_lancamento_fim=${data_lancamento_fim}`);
    return { data: response.data, status: response.status };
  },
};

// Teste
export function getFinanceiroResumo() {
  return {
    meses: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],

    receitas: [3000, 3200, 3100, 3500, 3700, 4000],
    despesas: [2000, 2500, 2800, 3000, 3200, 3500],
    saldo: [1000, 2300, 2800, 3500, 4200, 5000],
  }
}