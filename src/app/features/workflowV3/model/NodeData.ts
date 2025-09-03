import { FormFieldProps } from "../form/form.types";

export interface INodeData extends INodeSubCategory {
  [key: string]: unknown; // required for @xyflow/react
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
  mergeId?: string;
  sourceNodes?: string[];
  targetNode?: string;
}

export interface IPosition {
  x: number;
  y: number;
}

export interface INodeCategory {
  nodeCategoryName?: string;
  // nodeCategoryId: string;
  nodeCategoryIcon?: string;
  nodeCategoryColor?: string;
  type?: string;
  applicationKey?: string;
  solutionKey?: string;
  companyId?: string;
  categoryDescription?: string;
}

export interface IConductorConfig {
  name: string;
  type: string;
}

export interface INodeSubCategory {
  _id?: string | undefined;
  nodeName?: string;
  // nodeId: string;
  nodeIcon?: string;
  nodeIconColor?: string;
  nodeCategoryColor?: string;
  nodeCategoryType?: string;
  nodeDescription?: string;
  nodeType?: string;
  formType?: string;
  nodeLabel?: string;
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
  form?: INodeSubCategoryForm[];
  templateType?: string;
  disableNode?: boolean;
}

export interface INodeSubCategoryForm {
  actionName: string;
  actionLabel: string;
  form?: FormFieldProps[];
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
  schedule?: IFixedDelay;
}

export interface IFixedDelay {
  frequency: string;
  scheduleType: string;
  schedule: string;
}
