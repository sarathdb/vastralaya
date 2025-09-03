import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { mutationFetch } from "../../apiUtils/apiHandler";
import { FETCH_ASSET_VIEWS } from "../../endPoints/APIEndPoints";

export const ASSET_VIEW_KEY = "assetViewKey";

export const getAssetViewKey = () => [ASSET_VIEW_KEY] as const;

export const useAssetViews = (options?: UseQueryOptions<any[], AxiosError>) => {
  return useQuery<any[], AxiosError>({
    queryKey: getAssetViewKey(),
    queryFn: async () => {
      return await mutationFetch({
        url: FETCH_ASSET_VIEWS,
        method: "GET",
      });
    },
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchInterval: Infinity,
    ...options,
  });
};
