import { SOLUTION_STATUS } from '../enums/solutionStatus.enum';

export interface ISolutionRequest {
  applicationKey: string;
  companyId: string;
}

export interface ISolutionConfig {
  components: any[]; // Todo
  assetExplorer: any[]; // Todo
  metaData: any[]; // Todo
  workflows: any[]; // Todo
  tasks: any[]; // Todo
  actions: any[]; // Todo
  rules: any[]; // Todo
}

export interface ISolution {
  solutionId?: string;
  version?: number;
  schemaName?: string;
  name: string;
  label: string;
  description: string;
  category: any;
  deleted: boolean;
  hasPhysicalAddOn: boolean;
  published: boolean;
  isDataPipeline: boolean;
  landingPageId: number;
  assetViewId: number;
  genAiEmbeddingId: number;
  applicationKey: string;
  idpOutputEnabled: boolean;
  idpOutputBackupEnabled: boolean;
  ocrEnabled: boolean;
  status: SOLUTION_STATUS;
  mediaCategoryId: any[];
  publishComments: string;
  solutionConfig: ISolutionConfig;
  graceDays: number;
  retentionDays: number;
  trialDays: number; //10
  createdDateTime?: string;
  modifiedDateTime?: string;
  createdByUserId?: string;
  modifiedByUserId?: string;
}
