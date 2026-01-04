import type { Conta, Categoria } from '@/type';

type lancamentoTipo = 'Crédito' | 'Débito'
export interface Lancamento {
  id: string
  id_origem: string
  data_competencia: string
  data_lancamento: string
  valor: number
  tipo: lancamentoTipo
  descricao: string
  venda: string
  conta: string | Conta
  categoria: Categoria
  fornecedor: string
  data_criacao: string
}