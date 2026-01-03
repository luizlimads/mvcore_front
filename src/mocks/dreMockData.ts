import { ref } from 'vue';

// Estrutura hierárquica para a tabela DRE
export const dreData = ref([
  {
    id: 1,
    item: '(+) Receita Operacional Bruta',
    // Valores mensais: [Real, Meta]
    valores: [[120000, 125000], [125000, 130000], [132000, 135000], [140000, 140000]],
    children: [
      { id: 11, item: 'Vendas de Produtos', valores: [[115000, 120000], [120000, 125000], [127000, 130000], [135000, 135000]] },
      { id: 12, item: 'Receita de Serviços', valores: [[5000, 5000], [5000, 5000], [5000, 5000], [5000, 5000]] },
    ],
  },
  {
    id: 2,
    item: '(-) Custo da Mercadoria Vendida (CMV)',
    valores: [[-74250], [-77500], [-81800], [-86000]],
    children: [
        { id: 21, item: 'Custo de Matéria-Prima', valores: [[-50000], [-52000], [-55000], [-58000]] },
        { id: 22, item: 'Mão de Obra Direta', valores: [[-20000], [-21000], [-22000], [-23000]] },
        { id: 23, item: 'Outros Custos Diretos', valores: [[-4250], [-4500], [-4800], [-5000]] },
    ],
  },
  {
    id: 3,
    item: '(=) Lucro Bruto',
    isTotal: true, // Indica que é uma linha de total
    valores: [[45750], [47500], [50200], [54000]],
    children: [],
  },
  {
    id: 4,
    item: '(-) Despesas Variáveis',
    valores: [[-12000], [-12500], [-13200], [-14000]],
    children: [
        { id: 41, item: 'Comissões de Vendas (5%)', valores: [[-6000], [-6250], [-6600], [-7000]] },
        { id: 42, item: 'Impostos sobre Vendas (5%)', valores: [[-6000], [-6250], [-6600], [-7000]] },
    ],
  },
  {
    id: 5,
    item: '(=) Margem de Contribuição',
    isTotal: true,
    valores: [[33750], [35000], [37000], [40000]],
    children: [],
  },
  {
    id: 6,
    item: '(-) Despesas Fixas',
    valores: [[-18000], [-18000], [-18500], [-18500]],
    children: [
        { id: 61, item: 'Salários e Encargos', valores: [[-10000], [-10000], [-10000], [-10000]] },
        { id: 62, item: 'Aluguel', valores: [[-5000], [-5000], [-5000], [-5000]] },
        { id: 63, item: 'Marketing e Publicidade', valores: [[-1500], [-1500], [-2000], [-2000]] },
        { id: 64, item: 'Contabilidade e Outros', valores: [[-1500], [-1500], [-1500], [-1500]] },
    ],
  },
  {
    id: 7,
    item: '(=) EBITDA',
    isTotal: true,
    valores: [[15750], [17000], [18500], [21500]],
    children: [],
  },
  {
    id: 8,
    item: '(-) Empréstimos e Financiamentos',
    valores: [[-2500], [-2500], [-2500], [-2500]],
    children: [
        { id: 81, item: 'Juros', valores: [[-1500], [-1500], [-1500], [-1500]] },
        { id: 82, item: 'Amortização', valores: [[-1000], [-1000], [-1000], [-1000]] },
    ],
  },
  {
    id: 9,
    item: '(=) Lucro / Prejuízo do Período',
    isTotal: true,
    valores: [[13250], [14500], [16000], [19000]],
    children: [],
  },
]);

// Dados para o Gráfico de Cascata (Waterfall)
// Baseado no primeiro mês (Janeiro)
export const waterfallData = ref([
    {
        name: 'DRE de Janeiro',
        data: [
            { x: 'Receita', y: 120000 },
            { x: 'CMV', y: -74250 },
            { x: 'Lucro Bruto', isSum: true }, // Coluna de total
            { x: 'Desp. Variáveis', y: -12000 },
            { x: 'Marg. Contribuição', isSum: true },
            { x: 'Desp. Fixas', y: -18000 },
            { x: 'EBITDA', isSum: true },
            { x: 'Financiamentos', y: -2500 },
            { x: 'Lucro Líquido', isSum: true },
        ]
    }
]);

// Dados para os Gráficos de Despesas (Donuts)
export const despesasVariaveisDonut = ref([6000, 6000]); // Comissões, Impostos
export const despesasFixasDonut = ref([10000, 5000, 1500, 1500]); // Salários, Aluguel, Mkt, Outros
export const labelsDespesasVariaveis = ref(['Comissões', 'Impostos']);
export const labelsDespesasFixas = ref(['Salários', 'Aluguel', 'Marketing', 'Outros']);

// Dados para o Gráfico de Receita vs Meta
export const receitaVsMetaSeries = ref([
    { name: "Receita Real", data: [120000, 125000, 132000, 140000] },
    { name: "Meta de Vendas", data: [125000, 130000, 135000, 140000] }
]);


import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';

dayjs.locale('pt-br');

// ... (todo o código anterior do dreData, waterfallData, etc., permanece aqui) ...

// 4. DADOS PARA O MODAL DE METAS
// ===============================

// Função para gerar os meses dinamicamente
function gerarPeriodoDeMetas() {
  const hoje = dayjs();
  const metas = [];

  // 4 meses anteriores
  for (let i = 4; i > 0; i--) {
    const data = hoje.subtract(i, 'month');
    metas.push({
      mes: data.format('MMMM/YYYY'),
      // Simula um valor de meta para meses passados
      valor: 125000 + (5 - i) * 5000 + Math.random() * 2000,
    });
  }

  // Mês atual
  metas.push({
    mes: hoje.format('MMMM/YYYY'),
    valor: 145000,
  });


  // 4 meses posteriores
  for (let i = 1; i <= 4; i++) {
    const data = hoje.add(i, 'month');
    metas.push({
      mes: data.format('MMMM/YYYY'),
      // Simula uma projeção de meta crescente
      valor: 145000 + i * 5000,
    });
  }
  
  return metas;
}

export const metasData = ref(gerarPeriodoDeMetas());
