import { IWorkflowTask } from "../../model/workflowTask";

/* eslint-disable no-template-curly-in-string */
export const workflowStatusUpdate: IWorkflowTask = {
  name: "WORKFLOW_STATUS_UPDATE",
  taskReferenceName: `ref-simple_worker-wf-status-update`,
  description: "WORKFLOW_STATUS_UPDATE",
  inputParameters: {
    clientId: "${workflow.input.integrationUserId}",
    clientSecret: "${workflow.input.integrationUserSecret}",
    tokenApiConnectionTimeOut: 60000,
    tokenUri: "${workflow.input.dxpapiUrl}/api/auth/token",
    assetID: "${workflow.input.assetID}",
    workflowUpdateUri:
      "${workflow.input.dxpTaskQueueSvcUrl}/workflow/execution/saveStatus/${workflow.workflowId}?status=COMPLETED",
    workflowUpdateApiConnectionTimeOut: 10000,
    insightUserId: "${workflow.input.integrationUserId}",
  },
  type: "SIMPLE",
  startDelay: 0,
  optional: false,
  asyncComplete: false,
};
