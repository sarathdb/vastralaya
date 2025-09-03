import { useCallback } from "react";

export const useCreateWaitTaskURL = () => {
  return useCallback((taskRefName: string, isFailed?: boolean): string => {
    return isFailed
      ? `\${workflow.input.idpCallbackUrl}/wftaskqueueservice/workflows/updateTaskStatus/\${
          workflow.workflowId
        }/${taskRefName}/FAILED`
      : `\${workflow.input.idpCallbackUrl}/wftaskqueueservice/workflows/updateTaskStatus/\${
          workflow.workflowId
        }/${taskRefName}/COMPLETED`;
  }, []);
};
