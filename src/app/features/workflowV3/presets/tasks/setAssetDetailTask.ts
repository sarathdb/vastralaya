/* eslint-disable no-template-curly-in-string */

import { IWorkflowTask } from "../../model/workflowTask";

export const getAssetDetailsTask = (startTaskRefName: string) => {

  const assetDetailsTask: IWorkflowTask = {
    name: "Set Asset Details",
    taskReferenceName: "dxp_wf_global_var_and_asset",
    inputParameters: {
      companyId: "${workflow.input.companyId}",
      assetID: "${workflow.input.assetID}",
      integrationUserId: "${workflow.input.integrationUserId}",
      integrationUserSecret: "${workflow.input.integrationUserSecret}",
      dxpapiUrl: "${workflow.input.dxpapiUrl}",
      dxpTaskQueueSvcUrl: "${workflow.input.dxpTaskQueueSvcUrl}",
      taskRefName: "${workflow.input.taskRefName}",
      workflowId: "${workflow.input.workflowId}",
      assetDetails: "${" + startTaskRefName + ".output.response.body}"
    },
    type: "SET_VARIABLE",
    startDelay: 0,
    optional: false,
    asyncComplete: false
  }
  return assetDetailsTask;
}
