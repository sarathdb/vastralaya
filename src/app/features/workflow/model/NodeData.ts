export interface INodeData extends INodeSubCategory {
  id: string;
  isEndNode: boolean;
  isHorizontal: boolean;
  formData?: Record<string, any>;
  status?: string;
  workflowInput?: Record<string, any>;
  workflowOutput?: Record<string, any>;
  readonly?: boolean;
  formError?: boolean;
  formErrorMessage?: string;
}

export interface IPosition {
  x: number;
  y: number;
}

export interface INodeCategory {
  _id: string;
  nodeCategoryName: string;
  nodeCategoryId?: string;
  nodeCategoryIcon: string;
  nodeCategoryColor: string;
  type: string;
  applicationKey?: string;
  solutionKey?: string;
  companyId?: number;
  categoryDescription?: string;
  __v?: number;
}

export interface IConductorConfig {
  name: string;
  type: string;
}

export interface INodeSubCategory {
  _id: string;
  nodeName: string;
  nodeId?: string;
  nodeIcon: string;
  nodeIconColor: string;
  nodeCategoryColor?: string;
  nodeCategoryType?: string;
  nodeDescription?: string;
  nodeType: string;
  formType: string;
  nodeLabel: string;
  nodeToolTip?: string;
  conductorConfig?: IConductorConfig;
  solutionKey?: string;
  companyId?: number;
  nodeOwner?: "platform" | "solution";
  createdBy?: string;
  createdDttm?: string;
  modifiedBy?: string;
  modifiedDttm?: string;
  formData?: Record<string, any>;
  __v?: number;
  applicationKey?: string;
}

export interface IAssetType {
  id: string;
  value: string;
  label: string;
}
export interface IAssetSubType {
  id: string;
  assetType: string;
  label: string;
  value: string;
}

export interface ITriggerData {
  assetSubType: string[];
  assetType: string;
  triggerEvent: string;
  triggerType: string;
}
