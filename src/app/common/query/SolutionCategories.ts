import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { mutationFetch } from "../../apiUtils/apiHandler";
import { FETCH_SOLUTION_CATEGORIES } from "../../endPoints/APIEndPoints";
import { ISolutionCategory } from "../model/SolutionCategory.types";

export const SOLUTION_CATEGORIES_KEY = "solutionCategoriesKey";

export const getSolutionCategoriesKey = () =>
  [SOLUTION_CATEGORIES_KEY] as const;

export const useSolutionCategories = (
  options?: UseQueryOptions<ISolutionCategory[], AxiosError>
) => {
  return useQuery<ISolutionCategory[], AxiosError>({
    queryKey: getSolutionCategoriesKey(),
    queryFn: async () => {
      return await mutationFetch({
        url: FETCH_SOLUTION_CATEGORIES,
        method: "GET",
      });
    },
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchInterval: Infinity,
    ...options,
  });
};
