import { useCallback } from "react";

export const useCreateWaitTaskURL = () => {
  return useCallback((taskRefName: string, isFailed?: boolean): string => {
    return isFailed
      ? `http://dxp-dxpplatform-dxpwftaskqueuesvc.dxp.svc.cluster.local:4000/wftaskqueueservice/workflows/updateTaskStatus/\${workflow.workflowId}/${taskRefName}/FAILED`
      : `http://dxp-dxpplatform-dxpwftaskqueuesvc.dxp.svc.cluster.local:4000/wftaskqueueservice/workflows/updateTaskStatus/\${workflow.workflowId}/${taskRefName}/COMPLETED`;
  }, []);
};
