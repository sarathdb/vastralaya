import { useCallback } from "react";

export const useInputParameterConstructor = () => {
  return useCallback(
    (
      newInputParameters: Record<string, any>,
      formData: Record<string, any>
    ) => {
      const { inputParameters = {}, ...rest } = formData || {};

      return {
        ...newInputParameters,
        ...rest,
      };
    },
    []
  );
};
