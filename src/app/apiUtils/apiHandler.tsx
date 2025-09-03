import axios from 'axios';
import {
  ApiError,
  MutationFetchOptions,
  QueryFetchOptions,
} from './apiHandler.types';
import { SessionData } from './useSessionData';

const getSessionData = (): SessionData => {
  try {
    const session = sessionStorage.getItem('userInfo'); // ✅ Read from 'userInfo'
    const selectedId = sessionStorage.getItem('selectedId'); // ✅ Read from 'userInfo'
    return session ? { ...JSON.parse(session), selectedId } : {};
  } catch {
    return {};
  }
};

export const client = axios.create({
  baseURL: '',
  headers: {
    accept: '*/*',
  },
});

client.interceptors.request.use((config) => {
  const { token, selectedId } = getSessionData();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    config.headers['companyid'] = selectedId;
  }
  return config;
});

export async function queryFetch<T>({
  url,
  inputParams,
  headers,
}: QueryFetchOptions): Promise<T> {
  let params = '';

  if (inputParams) {
    params = JSON.stringify(inputParams);
  }

  return new Promise(async (resolve, reject) => {
    try {
      let fetchUrl = url;

      if (params) {
        fetchUrl += '?' + params;
      }

      const res = await client.get(fetchUrl, {
        headers,
      });
      const json = await res.data;

      resolve(json);
    } catch (error: any) {
      reject(error.response?.data as ApiError);
    }
  });
}

export async function mutationFetch<T>({
  url,
  method,
  headers,
  body,
  params,
  baseURL,
}: MutationFetchOptions): Promise<T> {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await client.request({
        ...(!!baseURL && { baseURL }),
        url,
        method,
        headers: {
          'Content-Type': 'application/json',
          ...headers,
        },
        data: body,
        params: params,
      });

      const json = await res.data;

      resolve(json);
    } catch (error: any) {
      reject(error.response?.data as ApiError);
    }
  });
}
