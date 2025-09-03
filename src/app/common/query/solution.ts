import {
  useMutation,
  UseMutationOptions,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { mutationFetch } from '../../apiUtils/apiHandler';
import { ApiError } from '../../apiUtils/apiHandler.types';
import { SOLUTION_REQUEST } from '../../endPoints/APIEndPoints';
import { ISolution } from '../model/Solution.types';

export const SOLUTION_LIST_KEY = 'solutionListKey';
export const getSolutionsListKey = () => [SOLUTION_LIST_KEY] as const;

const session = sessionStorage.getItem('userInfo');
const { userId, companyId } = JSON.parse(session ? session : '{}');

export const useSolutions = (
  options?: UseQueryOptions<ISolution[], AxiosError>
) => {
  return useQuery<ISolution[], AxiosError>({
    queryKey: getSolutionsListKey(),
    queryFn: async () => {
      return await mutationFetch({
        url: SOLUTION_REQUEST,
        method: 'GET',
        headers: {
          accept: '*/*',
          userId: userId,
          companyId: companyId,
        },
      });
    },
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchInterval: Infinity,
    ...options,
  });
};

export const useCreateSolution = (
  options?: UseMutationOptions<ISolution, ApiError, ISolution>
) => {
  const queryClient = useQueryClient();
  const { onSuccess: customOnSuccess, ...restOptions } = options || {};
  return useMutation<ISolution, ApiError, ISolution>({
    mutationFn: async (solution: ISolution) => {
      return await mutationFetch({
        url: SOLUTION_REQUEST,
        method: 'POST',
        headers: {
          accept: '*/*',
          userId: userId,
          companyId: companyId,
        },
        body: solution,
      });
    },
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({
        queryKey: getSolutionsListKey(),
      });
      if (customOnSuccess) {
        customOnSuccess(data, variables, context);
      }
    },
    ...restOptions,
  });
};
