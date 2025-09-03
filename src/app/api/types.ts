export enum PlatformAppName {
  APPNAME = "dxpplatform_irm",
}
export enum AppConfigType {
  DXPML = "DXPML",
  DXPSML = "DXPSML",
}

export interface AppTypes {
  type: string;
  count: number;
  color?: string;
}

export interface Application {
  _id?: string;
  applicationKey?: string;
  applicationName: string;
  applicationDisplayName: string;
  applicationDescription?: string;
  applicationConfig: any;
  isDeleted: boolean;
  isDefault: boolean;
  createdBy?: string;
  createdDttm?: string;
  modifiedDttm?: string;
  modifiedBy?: string;
  types?: AppTypes[];
}

export interface ApplicationConfig {
  _id?: string;
  appConfigKey?: string;
  applicationKey: string;
  appConfigType: AppConfigType;
  appConfigDescription: string;
  appConfig: any;
  assets: Asset[];
  version?: number;
  isDeleted: boolean;
  createdBy?: string;
  createdDttm?: string;
  modifiedDttm?: string;
  modifiedBy?: string;
}

export const Config = {
  dashboards: [],
  assetExplorer: [],
  groups: [],
  workflows: [],
  connectors: [],
};

export interface SolutionDefaults {
  page: string;
  view: string;
  isDataPipeline?: boolean;
}
export interface SolutionConfig {
  _id?: string;
  applicationKey?: string;
  solutionKey?: string;
  solutionName: string;
  solutionDescription: string;
  categoryId?: number;
  categoryName: string;
  companyId: number;
  solutionConfig: any;
  assets: Asset[];
  version?: number;
  isDeleted: boolean;
  isFavourite: boolean;
  createdBy?: string;
  createdDttm?: string;
  modifiedDttm?: string;
  modifiedBy?: string;
  hasPhysicalAddOn?: boolean;
  comments?: string;
  defaults: SolutionDefaults;
  tags?: any;
  mediaCategories: string[];
  genAIEmbedding?: string;
  genAIDimension?: string;
  solutionStatus?:string;
  published?: boolean;
}

export enum AssetOwner {
  PLATFORM = "PLATFORM",
  APPLICATION = "APPLICATION",
}

export enum CONTRIBUTIONSTATUS {
  PENDING = "Pending",
  APPROVED = "Approved",
  REJECTED = "Rejected",
}

export enum AssetCategory {
  COMPONENT = "COMPONENT",
  PAGE = "PAGE",
  WORKFLOW = "WORKFLOW",
}

export enum AssetSubCategory {
  DASHBOARD = "DASHBOARD",
  "LONG CARD" = "LONG CARD",
  DETAILED = "DETAILED",
  "MINI DETAILED" = "MINI DETAILED",
  FORM = "FORM",
  PAGE = "PAGE"
}

// API Request to get assets
export interface AssetsReq {
  applicationKey: string;
  solutionKey?: string;
  assetCategory?: AssetCategory;
  assetSubCategory?: AssetSubCategory;
  includeAssetConfig?: boolean;
  companyId?: number;
}

export interface Asset {
  _id?: string;
  applicationKey?: string;
  companyId?: number;
  solutionKey?: string;
  assetKey?: string;
  catalogKey: string;
  parentAssetKey: string;
  assetName: string;
  widgetTitle?: string;
  assetDescription: string;
  assetOwner?: AssetOwner;
  assetCategory: AssetCategory;
  assetSubCategory?: AssetSubCategory;
  version?: number;
  assetConfig: any;
  isDeleted: boolean;
  assetImage: string;
  createdBy?: string;
  createdDttm?: string;
  modifiedDttm?: string;
  modifiedBy?: string;
  assets?: any;
  sampleData?: any;
  selected?: boolean;
  userGroups?: any[];
  library?: string;
}

export enum TagResourceType {
  COMPONENT = "COMPONENT",
  PAGE = "PAGE",
  DASHBOARD = "DASHBOARD",
  WORKFLOW = "WORKFLOW",
  SOLUTION = "SOLUTION",
}

export interface Tag {
  _id?: string;
  applicationKey?: string;
  companyId: number;
  solutionKey?: string;
  tagName: string;
  resourceKey: string;
  resourceType: TagResourceType;
  createdBy?: string;
  createdDttm?: string;
  modifiedDttm?: string;
  modifiedBy?: string;
}

export interface RunTimeSolution {
  modifiedUserId?: string;
  solutionId?: string;
  applicationKey: string;
  description: string;
  assets: Asset[];
  categoryId: number;
  categoryName: string;
  companyId: number;
  solutionConfig: any;
  solutionKey: string;
  solutionName: string;
  label: string;
  mediaCategories?: string[];
  version?: number;
  deleted: boolean;
  favourite: boolean;
  createdDttm?: string;
  createdBy?: string;
  modifiedDttm?: string;
  comments?: string;
  defaults: SolutionDefaults;
}

export interface Locale {
  _id?: string;
  applicationKey?: string;
  companyId: number;
  locale: string;
  translationKey?: string;
  __v?: number;
  createdBy?: string;
  createdDttm?: string;
  modifiedDttm?: string;
  translationValue?: string;
}

export interface DesignerProps {
  localeConfig?: any;
  propsConfig?: any;
  themeConfig?: any;
}

export interface Group {
  _id?: string;
  applicationKey?: string;
  solutionKey?: string;
  catalogKey?: string;
  companyId: number;
  groupId?: string;
  groupName: string;
  roles: string[];
  createdUserId: string;
  version?: number;
  userIds?: string[]
}

export interface Role {
  _id?: string;
  applicationKey?: string;
  solutionKey?: string;
  catalogKey?: string;
  companyId: number;
  roleId: string;
  roleName: string;
  permissions: string[];
  createdUserId: string;
  version?: number;
}
export interface Permission {
  _id?: string;
  applicationKey?: string;
  solutionKey?: string;
  catalogKey?: string;
  companyId: number;
  permissionCode: string;
  permissionDescription: string;
  permissions: string[];
  createdUserId: string;
  version?: number;
}

export interface Metadata {
  catalogKey: string;
  _id?: string;
  applicationKey: string;
  solutionKey: string;
  companyId: number;
  metadateFieldId?: string;
  name: string;
  description: string;
  label: string;
  type: string;
  format: any;
  category: string;
  searchable: boolean;
  editable: boolean;
  visible: boolean;
  caseIdentifier: boolean;
  encrypted: boolean;
  assetSubTypeIds: string[];
  assetSubTypeNames: string[];
  llmPrompt: string;
  contributionStatus: string;
  parentSolutionKey: string;
  matchPattern?: string;
  defaultValue?: string[];
  columnMetadata?: string[];
  displayPattern?: string;
}

export interface AssetTypeCategory {
  id: number;
  name: string;
}

export interface AssetType {
  catalogKey: string;
  _id?: string;
  applicationKey: string;
  companyId: number;
  solutionKey: string;
  type: string;
  label: string;
  description: string;
  mimeTypeCategory: string[];
  category: AssetTypeCategory;
}
export enum ActionType {
  COMPONENT = "COMPONENT",
  WORKFLOW = "WORKFLOW",
}
export interface ActionConfigObj {
  actionButtonPlace: string;
  actionButtonLabel: Locale;
  actionType: ActionType;
  config: any;
}

export interface AssetSubType {
  catalogKey: string;
  _id: string;
  applicationKey: string;
  companyId: number;
  solutionKey: string;
  name: string;
  assetSubTypeId: string;
  assetSubType: AssetSubType[];
  metadataFields: Metadata[];
  mimeTypeCategory: string[];
  mimeTypes: string[];
  label: string;
  description: string;
  type: string;
  includeChildrenAssets: boolean;
  assetType: string;
  parentSubTypeId: string[];
  components: Asset[];
  assetSubTypeCount: number;
  metaDataFieldCount: number;
  isMandatory: boolean;
  metaDataFieldsNames: string[];
  llmPrompt: number;
  statuses: string[];
  fieldOrderMap: any;
  hierarchy: any[];
  actionConfig?: ActionConfigObj[];
  resolutions?: string[];
  viewerConfig: any;
}

export interface Connector {
  _id?: string;
  apiURL: string;
  applicationKey?: string;
  companyId: number;
  createdBy: string;
  dsConfig: any;
  dsDescription: string;
  dsKey?: string;
  dsName: string;
  dsType: string;
  method: string;
  solutionKey?: string;
  catalogKey?: string;
  createdDttm: string;
  modifiedDttm: string;
  version?: number;
}

export interface Rule {
  _id?: string;
  applicationKey?: string;
  companyId: number;
  solutionKey?: string;
  catalogKey?: string;
  ruleName: string;
  ruleType: string;
  assetSubType: string;
  assertAsset: string;
  ruleJson: any[];
  jsonEditor: boolean;
  createdDate: string;
  modifiedDate: string;
  version?: number;
}

export enum ParseType {
  CLONE = "CLONE",
  IMPORT = "IMPORT",
  MIGRATE = "MIGRATE",
}

export interface SolutionCategory {
  applicationKey: string;
  companyId: number;
  solutionKey: string;
  catalogKey: string;
  _id?: string;
  categoryName: string;
}

export interface Company {
  createdDate: string;
  createdUserId: string;
  modifiedDate: string;
  modifiedUserId: string;
  companyId: number;
  name: string;
  portalCompanyId: number;
  skpCustomerIds: string[];
  userInactiveDays: number;
  fedrampEnabled: boolean;
  assetExpirationDays: number;
  solutions: any[];
  solutionNames: string[];
  servicePostalCode: string;
  serviceStreetAddress: string;
  serviceCity: string;
  serviceState: string;
  serviceCountry: string;
  status: string;
  customerSSO: boolean;
  trial: boolean;
  trailDays: number;
  gracePeriodInDays: number;
  genAI: boolean;
  source: string;
  ocrEngine: string;
  samlLoginUrl: string;
}

export enum SolutionPages {
  DASHBOARD = "dashboard",
  TASK = "task",
  ASSET_EXPLORER = "assetExplorer",
  SPACE = "spaces",
  SOLUTIONS = "solutions",
  REPORTS = "reports",
}

export enum AssetExplorerViews {
  LONG_CARD = "longCard",
  THUMBNAIL = "thumbnail",
  MASONRY = "masonry",
}


export interface IAIConfig {
  ocrEnabled: boolean;
  ocr: string;
  limits: string;
  taxonomy: AssetSubType[];
  embeded: string;
  store: string;
  graphDB: string;
  db: string;
}

export interface flowConfig {
  nodes: any[]
  edges: any[]
}

export interface Stage {
  stageConfig: flowConfig
  taskConfig?: flowConfig[]
  selectedNode?: any
}


export interface Role {
  roleName: string
}
export interface DesignerGroup {
  _id?: string;
  applicationKey?: string;
  solutionKey?: string;
  catalogKey?: string;
  companyId: number;
  groupId?: string;
  groupName: string;
  roles: Role[];
  createdUserId: string;
  version?: number;
  userIds?: string[]
}



export interface AssetStages {
  _id?: String,
  applicationKey: String
  solutionKey?: String,
  companyId?: number,
  catalogKey: String,
  name: String,
  assetSubTypeId?: String;
  stageConfig: Stage;
  type?: String;
  assetType?: String;
  label?: String;
  description?: String;
}
