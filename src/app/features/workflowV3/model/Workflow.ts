import { Node, Edge } from "reactflow";
import { IInputParameter, IWorkflowTask } from "./workflowTask";
import { IFixedDelay } from "./NodeData";

export interface IWorkflow {
  _id?: string;
  applicationKey: string;
  assetKey?: string;
  assetName: string;
  assetDescription: string;
  assetCategory: string;
  assetSubCategory: string;
  assetOwner: string;
  assetConfig: IWorkflowConfig;
  version: number;
  createdBy: string;
  modifiedBy: string;
  assetImage: string;
  isDeleted: boolean;
  parentAssetKey: string;
  solutionKey: string;
  companyId: number;
  catalogKey: string;
  createdDttm?: string;
  modifiedDttm?: string;
  type: string;
}

export interface IWorkflowExecution {
  workflowType: string;
  version: number;
  workflowId: string;
  startTime: string;
  updateTime: string;
  status: string;
  input: string;
  output: string;
  executionTime: number;
  failedReferenceTaskNames: string;
  priority: number;
  failedTaskNames: string[];
  outputSize: number;
  inputSize: number;
}

export interface IWorkflowExecutionDetails {
  createTime: number;
  updateTime: number;
  status: string;
  endTime: number;
  workflowId: string;
  tasks: IWorkflowTask[];
  input: Record<string, any>;
  output: Record<string, any>;
  workflowDefinition: Record<string, any>;
  priority: number;
  variables: Record<string, any>;
  lastRetriedTime: number;
  failedTaskNames: string[];
  rateLimited: boolean;
  startTime: number;
  workflowName: string;
  workflowVersion: number;
}

export interface IWorkflowSpec {
  name: string;
  description: string;
  version: number;
  tasks: IWorkflowTask[];
  inputParameters: IInputParameter[];
  schemaVersion: number;
  restartable: boolean;
  workflowStatusListenerEnabled: boolean;
  ownerEmail: string;
  timeoutPolicy: string;
  timeoutSeconds: number;
  failureWorkflow: string;
  createTime: number;
  createdBy: string;
  ownerApp: string;
  updateTime: number;
  updatedBy: string;
  refCounter: number;
  enableWorkflowProcessorWait: true;
  assetType: string;
  assetSubTypes: string[];
  referenceMetadata: string[];
  assetStatuses: string[];
  triggerEvent: string;
  triggerType: string;
}

export interface IWorkflowConfig {
  nodes: Node[];
  edges: Edge[];
  dxpWorkFlow: ITriggerWorkFlow;
  workflowSpec: IWorkflowSpec;
}

export interface ITriggerWorkFlow {
  name: string;
  description: string;
  refCounter: number;
  version: number;
  enableWorkflowProcessorWait: boolean;
  failureWorkflow: string;
  assetType: string;
  assetSubTypes: string[];
  referenceMetadata: string[];
  assetStatuses: string[];
  triggerEvent: string;
  triggerType: string;
  schedule?: IFixedDelay;
  inputParameters: {
    body: IInputParameter[];
  };
}
