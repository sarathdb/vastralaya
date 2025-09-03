import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { FETCH_MIME_TYPES } from '../../endPoints/APIEndPoints';
import { IMimeType } from '../model/MimeType.types';
import { mutationFetch } from '../../apiUtils/apiHandler';

const MIME_TYPE_KEY = 'mimeTypeKey';
export const getMimeTypeKey = () => [MIME_TYPE_KEY] as const;

export const useMimeTypes = (
  options?: UseQueryOptions<IMimeType[], AxiosError>
) => {
  return useQuery<IMimeType[], AxiosError>({
    queryKey: getMimeTypeKey(),
    queryFn: async () => {
      return await mutationFetch({
        url: FETCH_MIME_TYPES,
        method: 'GET',
      });
    },
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchInterval: Infinity,
    ...options,
  });
};
