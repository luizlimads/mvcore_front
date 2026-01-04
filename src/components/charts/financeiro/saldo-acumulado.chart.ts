// charts/financeiro/saldo.chart.ts
import { createChart } from '@/components/charts/chart-factory'
import { useChartBase } from '@/composables/use-chart-base'

export function saldoChart(categories: string[]) {
  const base = useChartBase()

  return createChart('area', {
    chart: {
      id: 'saldo'
    },
    title: {
      text: 'Saldo Acumulado'
    },
    xaxis: {
      categories
    },
    yaxis: base.currencyAxis,
    stroke: {
      curve: 'smooth',
      width: 1
    },
    colors: ['#A0D2F3'],
    dataLabels: {
      enabled: false
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 0.5,
        opacityFrom: 1,
        opacityTo: 0.6,
      }
    }
  })
}
