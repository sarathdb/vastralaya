import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { mutationFetch } from '../../apiUtils/apiHandler';
import { FETCH_LANDING_PAGES } from '../../endPoints/APIEndPoints';
import { ILandingPage } from '../model/LandingPage.types';

const LANDING_PAGE_KEY = 'landingPageKey';

export const getLandingPageKey = () => [LANDING_PAGE_KEY] as const;

export const useLandingPages = (
  options?: UseQueryOptions<ILandingPage[], AxiosError>
) => {
  return useQuery<ILandingPage[], AxiosError>({
    queryKey: getLandingPageKey(),
    queryFn: async () => {
      return await mutationFetch({
        url: FETCH_LANDING_PAGES,
        method: 'GET',
      });
    },
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchInterval: Infinity,
    ...options,
  });
};
