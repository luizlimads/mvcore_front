export interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}

export interface OpcoesFiltro {
  data_inicial: string;
  data_final: string;
}