import type { Component } from 'vue'
import type { VTextField } from 'vuetify/components'

type VTextFieldVariant = 'outlined' | 'plain' | 'filled' | 'underlined' | 'solo' | 'solo-inverted' | 'solo-filled'

export interface FieldProps {
  [key: string]: any;

  variant: VTextFieldVariant
  label: string
  items?: any[]
  itemTitle?: string
  itemValue?: string
  maxlength?: number
  type?: string
  counter?: boolean
  readonly?: boolean
  label: string;
  appendInnerIcon?: string
}

export interface FormField {
  component: Component
  key: string
  props: FieldProps
  rules?: any[]
}

export interface FormConfig {
  title: string
  fields: FormField[]
}

export interface ApiResponse<T> {
  data: T
  status: number
}

export interface Item {
  id: number
  name: string
  species: string
  diet: string
  habitat: string
}

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

export interface Conta {
  id: string
  id_origem: string
  agencia: string
  conta: string
  digito_verificador: string
  descricao: string
  instituicao_financeira: string
  tenant: string
  data_criacao: string
}

export interface Categoria {
  id: stringBom
  id_origem: string
  descricao: string
  tipo: string
  categoria_pai: string
  tenant: string
  data_criacao: string
}

export interface Erp {
  id?: string
  nome: string
  data_criacao?: string
}

export interface Loja {
  id?: string
  documento: string
  nome: string
  imposto_aliquota_padrao: number
  tenant?: Tenant
  data_criacao?: string
}

export interface Tenant {
  documento: string
  razao_social: string
  nome_fantasia: string
  sistema_integrado: string
  lojas: Loja[]
  id?: string
  api_document?: string
  api_user?: string
  api_token?: string
  api_key?: string
  data_criacao?: string
  db_host?: string
  db_port?: number
  db_user?: string
  db_pass?: string
  db_name?: string
}

export interface User {
  nome: string
  email: string
  tenant: Tenant
  id?: string
  password?: string
  is_active?: boolean
  last_login?: string
  is_superuser?:boolean
}

interface AuthResponse {
  access: string 
  refresh: string 
}

interface SetPassword {
  current_password : string
  new_password: string
  re_new_password: string
}

export type StatusVenda = 'Não identificado' | 'Ativa';

export interface Venda {
  id: string;
  id_origem: string;
  data: string;
  status: StatusVenda;
  numero?: string | null;
  valor_bruto: number;
  acrescimo: number;
  desconto: number;
  credito_troca: number;
  valor_liquido: number;
  funcionario?: string | null; // ID do funcionário
  funcionario_nome?: string; // Nome que vem da API
  tenant: string; // ID do tenant
  data_criacao: string;
  
  // Relações aninhadas
  produtos: ItemVenda[];
  formas_pagamento: FormaPagamento[];
}

export interface ItemVenda {
  id?: string;
  id_origem?: string;
  produto: Produto; // ID do produto
  produto_descricao?: string; // Descrição que vem da API
  quantidade: number;
  custo: number;
  valor_unitario_bruto?: number;
  desconto?: number;
  acrescimo?: number;
  valor_unitario_liquido?: number;
  valor_total_liquido: number;
  data_criacao?: string;
}

export interface Produto {
  id?: string;
  id_origem?: string;
  referencia?: string | null;
  descricao?: string;
  grupo?: string | null;
  id_grupo_origem?: string | null;
  marca?: string | null;
  id_marca_origem?: string | null;
  tenant?: string; 
  data_criacao?: string;
  custo:number
}

export interface FormaPagamento {
  id: string;
  id_origem: string;
  data: string;
  valor: number;
  parcelas: number;
  descricao: string;
  data_criacao: string;
}

export interface ChartSeries {
  name: string;
  data: number[];
}

// Para os dados dos cards de resumo com sparklines
export interface SummaryCardData {
  valor: number;
  series: ChartSeries[];
}

// Para os itens da tabela de resumo por conta
export interface ResumoContaItem {
  id: number | string;
  descricao_conta: string;
  saldo: number;
}