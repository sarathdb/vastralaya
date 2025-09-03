export interface IInputParameter {
  [key: string]: string | number | boolean;
}

// Individual workflow task interface
export interface IWorkflowTask {
  id?: string;
  name: string;
  taskReferenceName: string;
  description?: string;
  inputParameters?: IInputParameter;
  type: "SIMPLE" | "SET_VARIABLE" | "HUMAN" | string;
  conductorType?: string;
  startDelay?: number;
  optional?: boolean;
  asyncComplete?: boolean;
}

// Complete workflow definition interface
export interface IWorkflowDefinition {
  name: string;
  description: string;
  version: number;
  tasks: IWorkflowTask[];
  inputParameters: string[];
  schemaVersion: number;
  restartable: boolean;
  workflowStatusListenerEnabled: boolean;
  ownerEmail: string;
  timeoutPolicy: "TIME_OUT_WF" | string;
  timeoutSeconds: number;
  failureWorkflow: string;
  createTime: number;
  createdBy: string;
  ownerApp: string;
  updateTime: number;
  updatedBy: string;
  refCounter: number;
}
