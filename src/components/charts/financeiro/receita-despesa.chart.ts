import { createChart } from '@/components/charts/chart-factory'
import { useChartBase } from '@/composables/use-chart-base'

export function receitaDespesaChart(categories: string[]) {
  const base = useChartBase()

  return createChart('bar', {
    chart: {
      id: 'receita-despesa'
    },
    title: {
      text: 'Receitas x Despesas'
    },
    colors: ['#38A169', '#90A4AE'],
    xaxis: {
      categories
    },
    yaxis: base.currencyAxis,
    fill: {
      opacity: 0.8
    },
    dataLabels: {
      enabled: false
    }
  })
}
