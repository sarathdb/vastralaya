/* eslint-disable no-template-curly-in-string */

import { IWorkflowTask } from "../../model/workflowTask";

export const startNode: IWorkflowTask = {
  name: "START_PROCESS",
  taskReferenceName: `ref-simple_worker-start-process`,
  description: "START_PROCESS",
  inputParameters: {
    companyId: "${workflow.input.companyId}",
    assetID: "${workflow.input.assetID}",
    workflowId: "${workflow.workflowId}",
    clientId: "${workflow.input.integrationUserId}",
    clientSecret: "${workflow.input.integrationUserSecret}",
    tokenApiConnectionTimeOut: 60000,
    tokenUri: "${workflow.input.dxpapiUrl}/api/auth/token",
    getAssetUri:
      "${workflow.input.dxpapiUrl}/api/companies/${workflow.input.companyId}/assets/${workflow.input.assetID}",
    getAssetConnectionTimeOut: 60000,
    insightUserId: "${workflow.input.integrationUserId}",
  },
  type: "SIMPLE",
  startDelay: 0,
  optional: false,
  asyncComplete: false,
};
