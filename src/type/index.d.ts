export * from './auth';
export * from './component.form';
export * from './financeiro.categoria';
export * from './financeiro.conta';
export * from './financeiro.lancamento';
export * from './tenant';
export * from './usuario';

export interface ApiResponse<T> {
  data: T
  status: number
}
