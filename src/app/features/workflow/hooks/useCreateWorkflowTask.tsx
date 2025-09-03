import { useCallback } from "react";

export const useCreateWorkflowTask = () => {
  return useCallback(
    (
      id: string,
      workerName: string,
      taskReferenceName: string,
      type: string,
      inputParameters?: Record<string, any>,
      startDelay?: number,
      asyncComplete?: boolean,
      optional?: boolean
    ) => {
      return {
        id,
        name: workerName,
        taskReferenceName,
        description: workerName,
        type,
        startDelay: startDelay ?? 0,
        asyncComplete: asyncComplete ?? false,
        optional: optional ?? false,
        inputParameters,
      };
    },
    []
  );
};
