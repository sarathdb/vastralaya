import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { mutationFetch } from '../../apiUtils/apiHandler';
import { FETCH_GEN_AI_EMBEDDING_MODELS } from '../../endPoints/APIEndPoints';
import { IGenAiEmbeddingModel } from '../model/GenAI.types';

export const GEN_AI_EMBEDDING_MODEL_KEY = 'genAiEmbeddingModelKey';

export const getGenAiEmbeddingModelKey = () =>
  [GEN_AI_EMBEDDING_MODEL_KEY] as const;

export const useGenAiEmbeddingModels = (
  options?: UseQueryOptions<IGenAiEmbeddingModel[], AxiosError>
) => {
  return useQuery<IGenAiEmbeddingModel[], AxiosError>({
    queryKey: getGenAiEmbeddingModelKey(),
    queryFn: async () => {
      return await mutationFetch({
        url: FETCH_GEN_AI_EMBEDDING_MODELS,
        method: 'GET',
      });
    },
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchInterval: Infinity,
    ...options,
  });
};
