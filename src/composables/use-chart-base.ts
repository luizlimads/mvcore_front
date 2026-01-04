import { useFormatters } from '@/composables/useFormatters'

// Teste
export function useChartBase() {
  const { formatCurrency } = useFormatters()

  return {
    toolbar: {
      show: true,
      tools: {
        download: true,
        zoom: false,
        pan: false,
        reset: false,
      }
    },

    currencyAxis: {
      labels: {
        formatter: formatCurrency
      }
    }
  }
}
