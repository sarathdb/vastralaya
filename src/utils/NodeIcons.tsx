import React from "react";

import TriggerNodeIcon from "@mui/icons-material/Bolt";
import CustomNodeIcon from "@mui/icons-material/Extension";

import AccountTreeIcon from "@mui/icons-material/AccountTree";
import CategoryIcon from "@mui/icons-material/Category";
import DynamicFormIcon from "@mui/icons-material/DynamicForm";
import HubIcon from "@mui/icons-material/Hub";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import ProcessorIcon from "@mui/icons-material/Memory";
import RemoteExploreIcon from "@mui/icons-material/TravelExplore";
import CustomIcon from "@mui/icons-material/Tune";

import * as MuiIcons from "@mui/icons-material";

//Sub Menu Icons
import AddRoadIcon from "@mui/icons-material/AddRoad";
import ApiIcon from "@mui/icons-material/Api";
import AssessmentIcon from "@mui/icons-material/Assessment";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import AutoModeIcon from "@mui/icons-material/AutoMode";
import CustomProcessorIcon from "@mui/icons-material/Build";
import BuildCircleIcon from "@mui/icons-material/BuildCircle";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import CallSplitIcon from "@mui/icons-material/CallSplit";
import CleaningIcon from "@mui/icons-material/CleaningServices";
import CodeIcon from "@mui/icons-material/Code";
import DeleteIcon from "@mui/icons-material/Delete";
import DescriptionIcon from "@mui/icons-material/Description";
import DeviceHubIcon from "@mui/icons-material/DeviceHub";
import DocumentScannerIcon from "@mui/icons-material/DocumentScanner";
import ClassifyExtractIcon from "@mui/icons-material/FilterAlt";
import FindInPageIcon from "@mui/icons-material/FindInPage";
import GridViewIcon from "@mui/icons-material/GridView";
import WaitIcon from "@mui/icons-material/HourglassBottom";
import HttpIcon from "@mui/icons-material/Http";
import ImageProcessorIcon from "@mui/icons-material/Image";
import InferenceProcessorIcon from "@mui/icons-material/Insights";
import JoinInnerIcon from "@mui/icons-material/JoinInner";
import LanIcon from "@mui/icons-material/Lan";
import PersonIcon from "@mui/icons-material/Person";
import PsychologyIcon from "@mui/icons-material/Psychology";
import UpdateAssetStatusIcon from "@mui/icons-material/PublishedWithChanges";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import RuleIcon from "@mui/icons-material/Rule";
import EmbeddingGeneratorIcon from "@mui/icons-material/ScatterPlot";
import SchemaIcon from "@mui/icons-material/Schema";
import CrawlerIcon from "@mui/icons-material/Search";
import StatusIcon from "@mui/icons-material/SignalWifiStatusbar4Bar";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import SortIcon from "@mui/icons-material/Sort";
import SourceIcon from "@mui/icons-material/Source";
import StorageIcon from "@mui/icons-material/Storage";
import TaskIcon from "@mui/icons-material/Task";
import OcrExtractorIcon from "@mui/icons-material/TextSnippet";
import SwitchIcon from "@mui/icons-material/ToggleOn";
import UpdateIcon from "@mui/icons-material/Update";
import VerifiedIcon from "@mui/icons-material/Verified";

export const DEFAULT_MENU_ICON_SIZE = 35;
export const DEFAULT_SUB_MENU_ICON_SIZE = 20;

const EnrichColor = "#FF5733";
const CoreWorkflowColor = "#3361ff";
const DispositionColor = "#34495e";
const UseManageColor = "#3498db";
const CustomColor = "#800000";
const AINodesColor = "#6c6095";
const RemoteAssetExplorerColor = "#008000";
const ProcessorColor = "#8e44ad";
const CustomNodeColor = "#3478C6";
const TriggerNodeColor = "#D64940";

export const nodeIconConfig: Record<
  string,
  { icon: React.ElementType; color: string }
> = {
  enrich: { icon: DynamicFormIcon, color: EnrichColor },
  coreworkflow: { icon: AccountTreeIcon, color: CoreWorkflowColor },
  disposition: { icon: CategoryIcon, color: DispositionColor },
  useManage: { icon: ManageAccountsIcon, color: UseManageColor },
  custom: { icon: CustomIcon, color: CustomColor },
  connectors: { icon: HubIcon, color: AINodesColor },
  remoteAssetExplorer: {
    icon: RemoteExploreIcon,
    color: RemoteAssetExplorerColor,
  },
  processor: { icon: ProcessorIcon, color: ProcessorColor },
};

export const subNodeIconConfig: Record<
  string,
  { icon: React.ElementType; color: string }
> = {
  custom_node: { icon: CustomNodeIcon, color: CustomNodeColor },
  trigger_node: { icon: TriggerNodeIcon, color: TriggerNodeColor },

  // Enrich
  dxpDataPipeline: { icon: SchemaIcon, color: EnrichColor },
  idpPriorityProcess: { icon: SortIcon, color: EnrichColor },
  idpProcessDocuments: { icon: DescriptionIcon, color: EnrichColor },
  llmProcessDocuments: { icon: FindInPageIcon, color: EnrichColor },

  //Core Workflow
  createException: { icon: ReportProblemIcon, color: CoreWorkflowColor },
  executeRule: { icon: RuleIcon, color: CoreWorkflowColor },
  forkJoin: { icon: CallSplitIcon, color: CoreWorkflowColor },
  human: { icon: PersonIcon, color: CoreWorkflowColor },
  subWorkflow: { icon: DeviceHubIcon, color: CoreWorkflowColor },
  switch: { icon: SwitchIcon, color: CoreWorkflowColor },
  wait: { icon: WaitIcon, color: CoreWorkflowColor },

  //Disposition
  deleteAsset: { icon: DeleteIcon, color: DispositionColor },

  //"Use & Manage"
  getAssetTask: { icon: TaskIcon, color: UseManageColor },
  setAssetStatus: { icon: StatusIcon, color: UseManageColor },
  updateAsset: { icon: UpdateIcon, color: UseManageColor },
  updateAssetStatus: { icon: UpdateAssetStatusIcon, color: UseManageColor },
  updateCase: { icon: BusinessCenterIcon, color: UseManageColor },
  updateCaseCompletion: {
    icon: AssignmentTurnedInIcon,
    color: UseManageColor,
  },
  validateCaseCompletion: { icon: VerifiedIcon, color: UseManageColor },
  //Custom
  customHttpNode: { icon: HttpIcon, color: CustomColor },
  customWorkerNode: { icon: LanIcon, color: CustomColor },
  sqlNode: { icon: JoinInnerIcon, color: CustomColor },

  //AI Nodes
  processAssets: { icon: SmartToyIcon, color: AINodesColor },
  agent: { icon: PsychologyIcon, color: AINodesColor },
  chunker: { icon: GridViewIcon, color: AINodesColor },
  cleaning: { icon: CleaningIcon, color: AINodesColor },
  destination: { icon: AddRoadIcon, color: AINodesColor },
  enrichment: { icon: BuildCircleIcon, color: AINodesColor },
  evaluation: { icon: AssessmentIcon, color: AINodesColor },
  generateEmbedding: { icon: ApiIcon, color: AINodesColor },
  ocr: { icon: DocumentScannerIcon, color: AINodesColor },
  source: { icon: SourceIcon, color: AINodesColor },

  // "Remote Asset Explorer"
  callableAutomation: { icon: AutoModeIcon, color: RemoteAssetExplorerColor },
  code: { icon: CodeIcon, color: RemoteAssetExplorerColor },
  crawler: { icon: CrawlerIcon, color: RemoteAssetExplorerColor },
  storage: { icon: StorageIcon, color: RemoteAssetExplorerColor },

  // Processor
  classifyExtract: { icon: ClassifyExtractIcon, color: ProcessorColor },
  customProcessor: { icon: CustomProcessorIcon, color: ProcessorColor },
  embeddingGenerator: { icon: EmbeddingGeneratorIcon, color: ProcessorColor },
  imageProcessor: { icon: ImageProcessorIcon, color: ProcessorColor },
  inferenceProcessor: { icon: InferenceProcessorIcon, color: ProcessorColor },
  ocrExtractor: { icon: OcrExtractorIcon, color: ProcessorColor },
};

interface IconProps {
  iconName: string;
  size?: "small" | "medium" | "large";
}

const DynamicIcon: React.FC<IconProps> = ({ iconName, size = "medium" }) => {
  // Check if the icon exists in the MuiIcons module
  const IconComponent = MuiIcons[iconName as keyof typeof MuiIcons];

  // If the icon doesn't exist, return a default icon or null
  if (!IconComponent) {
    return <span>Icon not found</span>;
  }

  return <IconComponent fontSize={size} />;
};

export default DynamicIcon;