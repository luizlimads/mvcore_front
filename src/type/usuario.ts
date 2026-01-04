import type { Tenant } from '@/type';

export interface Usuario {
  nome: string
  email: string
  tenant: Tenant
  id?: string
  password?: string
  is_active?: boolean
  last_login?: string
  is_superuser?:boolean
}

export interface SetPassword {
  current_password : string
  new_password: string
  re_new_password: string
}