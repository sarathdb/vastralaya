export type MutationMethodType = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export interface QueryFetchOptions {
  url: string;
  inputParams?: any;
  headers?: any;
}

export interface MutationFetchOptions {
  url: string;
  method: MutationMethodType;
  headers?: Record<string, any>;
  body?: any;
  params?: any;
  baseURL?: string;
}

export interface MessageResult {
  status: number;
  message: string;
}

export interface ApiError {
  httpCode: number;
  httpStatus: string;
  exceptionName: string;
  message: string;
  errors?: { [key: string]: string };
}
