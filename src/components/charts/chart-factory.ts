import { useChartBase } from '@/composables/use-chart-base'

type ChartType = 'bar' | 'line' | 'area'

export function createChart(
  type: ChartType,
  customOptions: Record<string, any>
) {
  const base = useChartBase()

  return {
    chart: {
      type,
      toolbar: base.toolbar,
    },
    ...customOptions,
  }
}
