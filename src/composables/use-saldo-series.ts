import { getFinanceiroResumo } from '@/services'

// Teste
export function useFinanceiroSeries(data: ReturnType<typeof getFinanceiroResumo>) {
  return {
    receitaDespesaSeries: [
      { name: 'Receita', data: data.receitas },
      { name: 'Despesa', data: data.despesas },
    ],

    saldoSeries: [
      { name: 'Saldo', data: data.saldo }
    ]
  }
}