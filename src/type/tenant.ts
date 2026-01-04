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

export interface SistemaIntegrado {
  id?: string
  nome: string
  data_criacao?: string
}
