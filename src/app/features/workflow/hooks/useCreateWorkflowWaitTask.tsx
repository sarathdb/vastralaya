import { useCallback } from "react";
import { ConductorType } from "../enum/ConductorType";

export const useCreateWorkflowWaitTask = () => {
  return useCallback((id: string) => {
    return {
      id,
      name: "waitTask",
      taskReferenceName: "wait_ref",
      conductorType: "PROCESSOR_CUSTOM",
      type: ConductorType.HUMAN,
      startDelay: 0,
      asyncComplete: false,
    };
  }, []);
};
