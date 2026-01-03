const API_BASE_URL = import.meta.env.VITE_API_BASE_URL; 

export const ENDPOINTS = {
  // Autenticação
  LOGIN: `${API_BASE_URL}/auth/jwt/create/`,
  RESET_PASSWORD: `${API_BASE_URL}/auth/users/reset_password/`,
  RESET_PASSWORD_CONFIRM: `${API_BASE_URL}/auth/users/reset_password_confirm/`,
  UPDATE_PASSWORD: `${API_BASE_URL}/auth/users/set_password/`,
  USER_ME: `${API_BASE_URL}/auth/users/me/`,

  // Usuário
  USUARIO: `${API_BASE_URL}/v1/usuario/`,

  // Tenant
  TENANT: `${API_BASE_URL}/v1/tenant/`,

  // Sistema Integrado
  SISTEMA_INTEGRADO: `${API_BASE_URL}/v1/tenant/sistema-integrado/`,

  // Lançamento
  LANCAMENTO: `${API_BASE_URL}/v1/financeiro/lancamento/`,

  // Produto
  PRODUTO: `${API_BASE_URL}/v1/produto/`,





};