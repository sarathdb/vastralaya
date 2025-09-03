/* eslint-disable no-template-curly-in-string */

import { IWorkflowTask } from "../../model/workflowTask";

export const setAssetDetailsTask: IWorkflowTask = {
  name: "Set Asset Details",
  taskReferenceName: `dxp_wf_global_var_and_asset`,
  inputParameters: {
    companyId: "${workflow.input.companyId}",
    assetID: "${workflow.input.assetID}",
    integrationUserId: "${workflow.input.integrationUserId}",
    integrationUserSecret: "${workflow.input.integrationUserSecret}",
    docUri: "${workflow.input.docUri}",
    outputUri: "${workflow.input.outputUri}",
    dxpapiUrl: "${workflow.input.dxpapiUrl}",
    assetDetails: "${ref-simple_worker-start-process-18.output.response.body}",
    assetFileName: "${workflow.input.assetFileName}",
    idpRuntimeUrl: "${workflow.input.idpRuntimeUrl}",
    idpCallbackUrl: "${workflow.input.idpCallbackUrl}",
    dxpTaskQueueSvcUrl: "${workflow.input.dxpTaskQueueSvcUrl}",
  },
  type: "SET_VARIABLE",
  startDelay: 0,
  optional: false,
  asyncComplete: false,
};
