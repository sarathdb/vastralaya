import { useCallback } from "react";
import { IWorkflowTask } from "../model/workflowTask";

export const useUniqueTaskName = () => {
  const generateUniqueTaskName = useCallback(
    (nodeId: string, task: IWorkflowTask): string => {
      const taskName = `${nodeId}-${task.taskReferenceName}`;
      return taskName;
    },
    []
  );

  return { generateUniqueTaskName };
};
