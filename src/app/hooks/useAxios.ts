import { useState } from "react";
import { AxiosError } from "axios";

interface UseAxiosState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

interface UseAxiosResponse<T> extends UseAxiosState<T> {
  fetchData: () => Promise<void>;
}

const useAxios = <T>(apiFunction: () => Promise<T>): UseAxiosResponse<T> => {
  const [state, setState] = useState<UseAxiosState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const fetchData = async (): Promise<void> => {
    setState((prev) => ({ ...prev, loading: true, error: null }));
    try {
      const response = await apiFunction();
      setState((prev) => ({ ...prev, data: response, loading: false }));
    } catch (err) {
      const error = err as AxiosError;
      setState((prev) => ({
        ...prev,
        error: error.message || "An error occurred",
        loading: false,
      }));
    }
  };

  return {
    ...state,
    fetchData,
  };
};

export default useAxios;
