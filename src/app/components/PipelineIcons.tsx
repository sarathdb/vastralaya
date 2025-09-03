import React, { ReactNode } from "react";

import DynamicFormIcon from "@mui/icons-material/DynamicForm";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import CategoryIcon from "@mui/icons-material/Category";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import CustomIcon from "@mui/icons-material/Tune";
import HubIcon from "@mui/icons-material/Hub";
import RemoteExploreIcon from "@mui/icons-material/TravelExplore";
import ProcessorIcon from "@mui/icons-material/Memory";

//Sub Panel Icon
import SchemaIcon from "@mui/icons-material/Schema";
import SortIcon from "@mui/icons-material/Sort";
import DescriptionIcon from "@mui/icons-material/Description";
import FindInPageIcon from "@mui/icons-material/FindInPage";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import RuleIcon from "@mui/icons-material/Rule";
import CallSplitIcon from "@mui/icons-material/CallSplit";
import PersonIcon from "@mui/icons-material/Person";
import DeviceHubIcon from "@mui/icons-material/DeviceHub";
import SwitchIcon from "@mui/icons-material/ToggleOn";
import WaitIcon from "@mui/icons-material/HourglassBottom";
import DeleteIcon from "@mui/icons-material/Delete";
import TaskIcon from "@mui/icons-material/Task";
import StatusIcon from "@mui/icons-material/SignalWifiStatusbar4Bar";
import UpdateIcon from "@mui/icons-material/Update";
import UpdateAssetStatusIcon from "@mui/icons-material/PublishedWithChanges";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import VerifiedIcon from "@mui/icons-material/Verified";
import HttpIcon from "@mui/icons-material/Http";
import LanIcon from "@mui/icons-material/Lan";
import JoinInnerIcon from "@mui/icons-material/JoinInner";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import PsychologyIcon from "@mui/icons-material/Psychology";
import GridViewIcon from "@mui/icons-material/GridView";
import CleaningIcon from "@mui/icons-material/CleaningServices";
import AddRoadIcon from "@mui/icons-material/AddRoad";
import BuildCircleIcon from "@mui/icons-material/BuildCircle";
import AssessmentIcon from "@mui/icons-material/Assessment";
import ApiIcon from "@mui/icons-material/Api";
import DocumentScannerIcon from "@mui/icons-material/DocumentScanner";
import SourceIcon from "@mui/icons-material/Source";
import AutoModeIcon from "@mui/icons-material/AutoMode";
import CodeIcon from "@mui/icons-material/Code";
import CrawlerIcon from "@mui/icons-material/Search";
import StorageIcon from "@mui/icons-material/Storage";
import ClassifyExtractIcon from "@mui/icons-material/FilterAlt";
import CustomProcessorIcon from "@mui/icons-material/Build";
import EmbeddingGeneratorIcon from "@mui/icons-material/ScatterPlot";
import ImageProcessorIcon from "@mui/icons-material/Image";
import InferenceProcessorIcon from "@mui/icons-material/Insights";
import OcrExtractorIcon from "@mui/icons-material/TextSnippet";

const DEFAULT_PANEL_ICON_SIZE = 35;
const DEFAULT_SUB_PANEL_ICON_SIZE = 20;

const EnrichColor = "#FF5733";
const CoreWorkflowColor = "#3361ff";
const DispositionColor = "#34495e";
const UseManageColor = "#3498db";
const CustomColor = "#800000";
const AINodesColor = "#6c6095";
const RemoteAssetExplorerColor = "#008000";
const ProcessorColor = "#8e44ad";

const panelIconConfig: Record<
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

const subPanelIconConfig: Record<
  string,
  { icon: React.ElementType; color: string }
> = {
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

export const getPanelIconByTitle = (
  title: string,
  size: number = DEFAULT_PANEL_ICON_SIZE
): ReactNode | null => {
  const config = panelIconConfig[title];
  return config ? (
    <config.icon sx={{ fontSize: size, color: config.color }} />
  ) : (
    <AutoAwesomeIcon sx={{ fontSize: size, color: "inherit" }} />
  );
};

export const getSubPanelIconByTitle = (
  title: string,
  size: number = DEFAULT_SUB_PANEL_ICON_SIZE
): ReactNode | null => {
  const subPanelConfig = subPanelIconConfig[title];
  return subPanelConfig ? (
    <subPanelConfig.icon sx={{ fontSize: size, color: subPanelConfig.color }} />
  ) : (
    <AutoAwesomeIcon sx={{ fontSize: size, color: "inherit" }} />
  );
};

export const templates = {
  "10": {
    activityKey: "Classify & Extract Processor-1",
    activityCategoryName: "Processor",
    activityCategoryId: 10,
    // activityCategoryIcon: "connectors",
    activityCategoryIcon: "processor",
    activityConfig: [
      {
        activityTemplate: {
          activityNode: {
            shape: "rectangle",
            custom: true,
          },
          activityConfigurationProperties: {
            conductorType: "PROCESSOR_CLASSIFY_EXTRACT",
          },
        },
        activityIcon: "classifyExtract",
        activityOwner: "Platform",
        activityType: "IRM_PROCESSOR_TEMPLATE",
        dxpActivityLabel: "Classify & Extract Processor",
        dxpTypeLabel: "Classify & Extract Processor",
        dxpActivityToolTip: "Classify & Extract Processor",
      },
      {
        activityTemplate: {
          activityNode: {
            shape: "rectangle",
            custom: true,
          },
          activityConfigurationProperties: {
            conductorType: "PROCESSOR_CUSTOM",
          },
        },
        activityIcon: "customProcessor",
        activityOwner: "Platform",
        activityType: "IRM_PROCESSOR_TEMPLATE",
        dxpActivityLabel: "Custom-Processor",
        dxpTypeLabel: "Custom-Processor",
        dxpActivityToolTip: "Custom-Processor",
      },
      {
        activityTemplate: {
          activityNode: {
            shape: "rectangle",
            custom: true,
          },
          activityConfigurationProperties: {
            conductorType: "PROCESSOR_EMBEDDING_GENERATOR",
          },
        },
        activityIcon: "embeddingGenerator",
        activityOwner: "Platform",
        activityType: "IRM_PROCESSOR_TEMPLATE",
        dxpActivityLabel: "Embedding Generator",
        dxpTypeLabel: "Embedding Generator",
        dxpActivityToolTip: "Embedding Generator",
      },
      {
        activityTemplate: {
          activityNode: {
            shape: "rectangle",
            custom: true,
          },
          activityConfigurationProperties: {
            conductorType: "PROCESSOR_IMAGE",
          },
        },
        activityIcon: "imageProcessor",
        activityOwner: "Platform",
        activityType: "IRM_PROCESSOR_TEMPLATE",
        dxpActivityLabel: "Image Processor",
        dxpTypeLabel: "Image Processor",
        dxpActivityToolTip: "Image Processor",
      },
      {
        activityTemplate: {
          activityNode: {
            shape: "rectangle",
            custom: true,
          },
          activityConfigurationProperties: {
            conductorType: "PROCESSOR_INFERENCE",
          },
        },
        activityIcon: "inferenceProcessor",
        activityOwner: "Platform",
        activityType: "IRM_PROCESSOR_TEMPLATE",
        dxpActivityLabel: "Inference Processor",
        dxpTypeLabel: "Inference Processor",
        dxpActivityToolTip: "Inference Processor",
      },
      {
        activityTemplate: {
          activityNode: {
            shape: "rectangle",
            custom: true,
          },
          activityConfigurationProperties: {
            conductorType: "PROCESSOR_OCR_EXTRACTOR",
          },
        },
        activityIcon: "ocrExtractor",
        activityOwner: "Platform",
        activityType: "IRM_PROCESSOR_TEMPLATE",
        dxpActivityLabel: "OCR Extractor",
        dxpTypeLabel: "IRM_PROCESSOR_TEMPLATE",
        dxpActivityToolTip: "OCR Extractor",
      },
    ],
  },
  "11": {
    activityKey: "Classify & Extract Processor-1",
    activityCategoryName: "Processor",
    activityCategoryId: 10,
    // activityCategoryIcon: "connectors",
    activityCategoryIcon: "processor",
    activityConfig: [
      {
        activityTemplate: {
          activityNode: {
            shape: "rectangle",
            custom: true,
          },
          activityConfigurationProperties: {
            conductorType: "PROCESSOR_CLASSIFY_EXTRACT",
          },
        },
        activityIcon: "classifyExtract",
        activityOwner: "Platform",
        activityType: "IRM_PROCESSOR_TEMPLATE",
        dxpActivityLabel: "Classify & Extract Processor",
        dxpTypeLabel: "Classify & Extract Processor",
        dxpActivityToolTip: "Classify & Extract Processor",
      },
      {
        activityTemplate: {
          activityNode: {
            shape: "rectangle",
            custom: true,
          },
          activityConfigurationProperties: {
            conductorType: "PROCESSOR_CUSTOM",
          },
        },
        activityIcon: "customProcessor",
        activityOwner: "Platform",
        activityType: "IRM_PROCESSOR_TEMPLATE",
        dxpActivityLabel: "Custom-Processor",
        dxpTypeLabel: "Custom-Processor",
        dxpActivityToolTip: "Custom-Processor",
      },
      {
        activityTemplate: {
          activityNode: {
            shape: "rectangle",
            custom: true,
          },
          activityConfigurationProperties: {
            conductorType: "PROCESSOR_EMBEDDING_GENERATOR",
          },
        },
        activityIcon: "embeddingGenerator",
        activityOwner: "Platform",
        activityType: "IRM_PROCESSOR_TEMPLATE",
        dxpActivityLabel: "Embedding Generator",
        dxpTypeLabel: "Embedding Generator",
        dxpActivityToolTip: "Embedding Generator",
      },
      {
        activityTemplate: {
          activityNode: {
            shape: "rectangle",
            custom: true,
          },
          activityConfigurationProperties: {
            conductorType: "PROCESSOR_IMAGE",
          },
        },
        activityIcon: "imageProcessor",
        activityOwner: "Platform",
        activityType: "IRM_PROCESSOR_TEMPLATE",
        dxpActivityLabel: "Image Processor",
        dxpTypeLabel: "Image Processor",
        dxpActivityToolTip: "Image Processor",
      },
      {
        activityTemplate: {
          activityNode: {
            shape: "rectangle",
            custom: true,
          },
          activityConfigurationProperties: {
            conductorType: "PROCESSOR_INFERENCE",
          },
        },
        activityIcon: "inferenceProcessor",
        activityOwner: "Platform",
        activityType: "IRM_PROCESSOR_TEMPLATE",
        dxpActivityLabel: "Inference Processor",
        dxpTypeLabel: "Inference Processor",
        dxpActivityToolTip: "Inference Processor",
      },
      {
        activityTemplate: {
          activityNode: {
            shape: "rectangle",
            custom: true,
          },
          activityConfigurationProperties: {
            conductorType: "PROCESSOR_OCR_EXTRACTOR",
          },
        },
        activityIcon: "ocrExtractor",
        activityOwner: "Platform",
        activityType: "IRM_PROCESSOR_TEMPLATE",
        dxpActivityLabel: "OCR Extractor",
        dxpTypeLabel: "IRM_PROCESSOR_TEMPLATE",
        dxpActivityToolTip: "OCR Extractor",
      },
    ],
  },
  "12": {
    activityKey: "Classify & Extract Processor-1",
    activityCategoryName: "Processor",
    activityCategoryId: 10,
    // activityCategoryIcon: "connectors",
    activityCategoryIcon: "processor",
    activityConfig: [
      {
        activityTemplate: {
          activityNode: {
            shape: "rectangle",
            custom: true,
          },
          activityConfigurationProperties: {
            conductorType: "PROCESSOR_CLASSIFY_EXTRACT",
          },
        },
        activityIcon: "classifyExtract",
        activityOwner: "Platform",
        activityType: "IRM_PROCESSOR_TEMPLATE",
        dxpActivityLabel: "Classify & Extract Processor",
        dxpTypeLabel: "Classify & Extract Processor",
        dxpActivityToolTip: "Classify & Extract Processor",
      },
      {
        activityTemplate: {
          activityNode: {
            shape: "rectangle",
            custom: true,
          },
          activityConfigurationProperties: {
            conductorType: "PROCESSOR_CUSTOM",
          },
        },
        activityIcon: "customProcessor",
        activityOwner: "Platform",
        activityType: "IRM_PROCESSOR_TEMPLATE",
        dxpActivityLabel: "Custom-Processor",
        dxpTypeLabel: "Custom-Processor",
        dxpActivityToolTip: "Custom-Processor",
      },
      {
        activityTemplate: {
          activityNode: {
            shape: "rectangle",
            custom: true,
          },
          activityConfigurationProperties: {
            conductorType: "PROCESSOR_EMBEDDING_GENERATOR",
          },
        },
        activityIcon: "embeddingGenerator",
        activityOwner: "Platform",
        activityType: "IRM_PROCESSOR_TEMPLATE",
        dxpActivityLabel: "Embedding Generator",
        dxpTypeLabel: "Embedding Generator",
        dxpActivityToolTip: "Embedding Generator",
      },
      {
        activityTemplate: {
          activityNode: {
            shape: "rectangle",
            custom: true,
          },
          activityConfigurationProperties: {
            conductorType: "PROCESSOR_IMAGE",
          },
        },
        activityIcon: "imageProcessor",
        activityOwner: "Platform",
        activityType: "IRM_PROCESSOR_TEMPLATE",
        dxpActivityLabel: "Image Processor",
        dxpTypeLabel: "Image Processor",
        dxpActivityToolTip: "Image Processor",
      },
      {
        activityTemplate: {
          activityNode: {
            shape: "rectangle",
            custom: true,
          },
          activityConfigurationProperties: {
            conductorType: "PROCESSOR_INFERENCE",
          },
        },
        activityIcon: "inferenceProcessor",
        activityOwner: "Platform",
        activityType: "IRM_PROCESSOR_TEMPLATE",
        dxpActivityLabel: "Inference Processor",
        dxpTypeLabel: "Inference Processor",
        dxpActivityToolTip: "Inference Processor",
      },
      {
        activityTemplate: {
          activityNode: {
            shape: "rectangle",
            custom: true,
          },
          activityConfigurationProperties: {
            conductorType: "PROCESSOR_OCR_EXTRACTOR",
          },
        },
        activityIcon: "ocrExtractor",
        activityOwner: "Platform",
        activityType: "IRM_PROCESSOR_TEMPLATE",
        dxpActivityLabel: "OCR Extractor",
        dxpTypeLabel: "IRM_PROCESSOR_TEMPLATE",
        dxpActivityToolTip: "OCR Extractor",
      },
    ],
  },
  "13": {
    activityKey: "Classify & Extract Processor-1",
    activityCategoryName: "Processor",
    activityCategoryId: 10,
    // activityCategoryIcon: "connectors",
    activityCategoryIcon: "processor",
    activityConfig: [
      {
        activityTemplate: {
          activityNode: {
            shape: "rectangle",
            custom: true,
          },
          activityConfigurationProperties: {
            conductorType: "PROCESSOR_CLASSIFY_EXTRACT",
          },
        },
        activityIcon: "classifyExtract",
        activityOwner: "Platform",
        activityType: "IRM_PROCESSOR_TEMPLATE",
        dxpActivityLabel: "Classify & Extract Processor",
        dxpTypeLabel: "Classify & Extract Processor",
        dxpActivityToolTip: "Classify & Extract Processor",
      },
      {
        activityTemplate: {
          activityNode: {
            shape: "rectangle",
            custom: true,
          },
          activityConfigurationProperties: {
            conductorType: "PROCESSOR_CUSTOM",
          },
        },
        activityIcon: "customProcessor",
        activityOwner: "Platform",
        activityType: "IRM_PROCESSOR_TEMPLATE",
        dxpActivityLabel: "Custom-Processor",
        dxpTypeLabel: "Custom-Processor",
        dxpActivityToolTip: "Custom-Processor",
      },
      {
        activityTemplate: {
          activityNode: {
            shape: "rectangle",
            custom: true,
          },
          activityConfigurationProperties: {
            conductorType: "PROCESSOR_EMBEDDING_GENERATOR",
          },
        },
        activityIcon: "embeddingGenerator",
        activityOwner: "Platform",
        activityType: "IRM_PROCESSOR_TEMPLATE",
        dxpActivityLabel: "Embedding Generator",
        dxpTypeLabel: "Embedding Generator",
        dxpActivityToolTip: "Embedding Generator",
      },
      {
        activityTemplate: {
          activityNode: {
            shape: "rectangle",
            custom: true,
          },
          activityConfigurationProperties: {
            conductorType: "PROCESSOR_IMAGE",
          },
        },
        activityIcon: "imageProcessor",
        activityOwner: "Platform",
        activityType: "IRM_PROCESSOR_TEMPLATE",
        dxpActivityLabel: "Image Processor",
        dxpTypeLabel: "Image Processor",
        dxpActivityToolTip: "Image Processor",
      },
      {
        activityTemplate: {
          activityNode: {
            shape: "rectangle",
            custom: true,
          },
          activityConfigurationProperties: {
            conductorType: "PROCESSOR_INFERENCE",
          },
        },
        activityIcon: "inferenceProcessor",
        activityOwner: "Platform",
        activityType: "IRM_PROCESSOR_TEMPLATE",
        dxpActivityLabel: "Inference Processor",
        dxpTypeLabel: "Inference Processor",
        dxpActivityToolTip: "Inference Processor",
      },
      {
        activityTemplate: {
          activityNode: {
            shape: "rectangle",
            custom: true,
          },
          activityConfigurationProperties: {
            conductorType: "PROCESSOR_OCR_EXTRACTOR",
          },
        },
        activityIcon: "ocrExtractor",
        activityOwner: "Platform",
        activityType: "IRM_PROCESSOR_TEMPLATE",
        dxpActivityLabel: "OCR Extractor",
        dxpTypeLabel: "IRM_PROCESSOR_TEMPLATE",
        dxpActivityToolTip: "OCR Extractor",
      },
    ],
  },
  "14": {
    activityKey: "Classify & Extract Processor-1",
    activityCategoryName: "Processor",
    activityCategoryId: 10,
    // activityCategoryIcon: "connectors",
    activityCategoryIcon: "processor",
    activityConfig: [
      {
        activityTemplate: {
          activityNode: {
            shape: "rectangle",
            custom: true,
          },
          activityConfigurationProperties: {
            conductorType: "PROCESSOR_CLASSIFY_EXTRACT",
          },
        },
        activityIcon: "classifyExtract",
        activityOwner: "Platform",
        activityType: "IRM_PROCESSOR_TEMPLATE",
        dxpActivityLabel: "Classify & Extract Processor",
        dxpTypeLabel: "Classify & Extract Processor",
        dxpActivityToolTip: "Classify & Extract Processor",
      },
      {
        activityTemplate: {
          activityNode: {
            shape: "rectangle",
            custom: true,
          },
          activityConfigurationProperties: {
            conductorType: "PROCESSOR_CUSTOM",
          },
        },
        activityIcon: "customProcessor",
        activityOwner: "Platform",
        activityType: "IRM_PROCESSOR_TEMPLATE",
        dxpActivityLabel: "Custom-Processor",
        dxpTypeLabel: "Custom-Processor",
        dxpActivityToolTip: "Custom-Processor",
      },
      {
        activityTemplate: {
          activityNode: {
            shape: "rectangle",
            custom: true,
          },
          activityConfigurationProperties: {
            conductorType: "PROCESSOR_EMBEDDING_GENERATOR",
          },
        },
        activityIcon: "embeddingGenerator",
        activityOwner: "Platform",
        activityType: "IRM_PROCESSOR_TEMPLATE",
        dxpActivityLabel: "Embedding Generator",
        dxpTypeLabel: "Embedding Generator",
        dxpActivityToolTip: "Embedding Generator",
      },
      {
        activityTemplate: {
          activityNode: {
            shape: "rectangle",
            custom: true,
          },
          activityConfigurationProperties: {
            conductorType: "PROCESSOR_IMAGE",
          },
        },
        activityIcon: "imageProcessor",
        activityOwner: "Platform",
        activityType: "IRM_PROCESSOR_TEMPLATE",
        dxpActivityLabel: "Image Processor",
        dxpTypeLabel: "Image Processor",
        dxpActivityToolTip: "Image Processor",
      },
      {
        activityTemplate: {
          activityNode: {
            shape: "rectangle",
            custom: true,
          },
          activityConfigurationProperties: {
            conductorType: "PROCESSOR_INFERENCE",
          },
        },
        activityIcon: "inferenceProcessor",
        activityOwner: "Platform",
        activityType: "IRM_PROCESSOR_TEMPLATE",
        dxpActivityLabel: "Inference Processor",
        dxpTypeLabel: "Inference Processor",
        dxpActivityToolTip: "Inference Processor",
      },
      {
        activityTemplate: {
          activityNode: {
            shape: "rectangle",
            custom: true,
          },
          activityConfigurationProperties: {
            conductorType: "PROCESSOR_OCR_EXTRACTOR",
          },
        },
        activityIcon: "ocrExtractor",
        activityOwner: "Platform",
        activityType: "IRM_PROCESSOR_TEMPLATE",
        dxpActivityLabel: "OCR Extractor",
        dxpTypeLabel: "IRM_PROCESSOR_TEMPLATE",
        dxpActivityToolTip: "OCR Extractor",
      },
    ],
  },
};

// export const templates = {
//   "0": {
//     activityKey: "end-1",
//     activityCategoryName: "Adhoc",
//     activityCategoryId: 0,
//     activityCategoryIcon: "",
//     activityConfig: [
//       {
//         activityOwner: "Platform",
//         activityTemplate: {
//           activityConfigurationProperties: {
//             taskReferenceName: "activity-reference-start",
//             conductorType: "Start",
//           },
//           activityNode: {
//             shape: "round-rect",
//             custom: false,
//           },
//         },
//         activityType: "Task",
//         dxpActivityLabel: "End",
//         dxpTypeLabel: "End",
//         dxpActivityToolTip: "",
//       },
//       {
//         activityOwner: "Platform",
//         activityTemplate: {
//           activityNode: {
//             shape: "rectangle",
//             custom: false,
//           },
//           activityConfigurationProperties: {
//             conductorType: "JOIN",
//           },
//         },
//         activityType: "Task",
//         dxpActivityLabel: "Join",
//         dxpTypeLabel: "Join",
//         dxpActivityToolTip: "Join all calls",
//       },
//       {
//         activityOwner: "Platform",
//         activityTemplate: {
//           activityConfigurationProperties: {
//             taskReferenceName: "ref-start",
//             conductorType: "Start",
//           },
//           activityNode: {
//             shape: "round-rect",
//             custom: false,
//           },
//         },
//         activityType: "Task",
//         dxpActivityLabel: "Start",
//         dxpTypeLabel: "Start",
//         dxpActivityToolTip: "",
//       },
//       {
//         activityOwner: "Platform",
//         activityTemplate: {
//           activityNode: {
//             shape: "round-rect-switch-end",
//             custom: false,
//           },
//         },
//         activityType: "Task",
//         dxpActivityLabel: "Switch End",
//         dxpTypeLabel: "SwitchEnd",
//         dxpActivityToolTip: "",
//       },
//     ],
//   },
//   "2": {
//     activityKey: "dxpPipeline-1",
//     activityCategoryName: "Enrich",
//     activityCategoryId: 2,
//     activityCategoryIcon: "enrich",
//     activityConfig: [
//       {
//         activityOwner: "Platform",
//         activityTemplate: {
//           activityNode: {
//             shape: "rectangle",
//             custom: true,
//           },
//           activityConfigurationProperties: {
//             conductorType: "DXP_PIPELINE",
//           },
//         },
//         activityIcon: "dxpDataPipeline",
//         activityType: "Task",
//         dxpActivityLabel: "DxP Data Pipeline",
//         dxpTypeLabel: "DxP Data Pipeline",
//         dxpActivityToolTip: "DxP Data Pipeline",
//       },
//       {
//         activityOwner: "Platform",
//         activityTemplate: {
//           activityNode: {
//             shape: "rectangle",
//             custom: true,
//           },
//           activityConfigurationProperties: {
//             conductorType: "HTTP_IDP_P",
//           },
//         },
//         activityIcon: "idpPriorityProcess",
//         activityType: "Task",
//         dxpActivityLabel: "IDP - Priority Process",
//         dxpTypeLabel: "IDP - Priority Process",
//         dxpActivityToolTip: "Process assets using IDP Priority Queue",
//       },
//       {
//         activityOwner: "Platform",
//         activityTemplate: {
//           activityNode: {
//             shape: "rectangle",
//             custom: true,
//           },
//           activityConfigurationProperties: {
//             conductorType: "HTTP_IDP",
//           },
//         },
//         activityIcon: "idpProcessDocuments",
//         activityType: "Task",
//         dxpActivityLabel: "IDP - Process Documents",
//         dxpTypeLabel: "IDP - Process Documents",
//         dxpActivityToolTip: "Process assets using IDP Workflow",
//       },
//       {
//         activityOwner: "Platform",
//         activityTemplate: {
//           activityNode: {
//             shape: "rectangle",
//             custom: true,
//           },
//           activityConfigurationProperties: {
//             conductorType: "HTTP_LLM",
//           },
//         },
//         activityIcon: "llmProcessDocuments",
//         activityType: "Task",
//         dxpActivityLabel: "LLM - Process Documents",
//         dxpTypeLabel: "LLM - Process Documents",
//         dxpActivityToolTip: "Process assets using LLM",
//       },
//     ],
//   },
//   "3": {
//     activityKey: "IRM_CREATE_EXCEPTION-1",
//     activityCategoryName: "Core Workflow",
//     activityCategoryId: 3,
//     activityCategoryIcon: "coreworkflow",
//     activityConfig: [
//       {
//         activityOwner: "Platform",
//         activityTemplate: {
//           activityNode: {
//             shape: "rectangle",
//             custom: true,
//           },
//           activityConfigurationProperties: {
//             conductorType: "CREATE_EXCEPTION",
//           },
//         },
//         activityIcon: "createException",
//         activityType: "Task",
//         dxpActivityLabel: "Create Exception",
//         dxpTypeLabel: "IRM_CREATE_EXCEPTION",
//         dxpActivityToolTip: "Create the exception",
//       },
//       {
//         activityOwner: "Platform",
//         activityTemplate: {
//           activityNode: {
//             shape: "rectangle",
//             custom: true,
//           },
//           activityConfigurationProperties: {
//             conductorType: "SIMPLE_RULE",
//           },
//         },
//         activityIcon: "executeRule",
//         activityType: "Task",
//         dxpActivityLabel: "Execute Rule",
//         dxpTypeLabel: "IRM_RULE_EXECUTOR_TASK",
//         dxpActivityToolTip:
//           "Executes the selected rules and automatically creates exception when the rules fail",
//       },
//       {
//         activityOwner: "Platform",
//         activityTemplate: {
//           activityNode: {
//             shape: "rectangle",
//             custom: true,
//           },
//           activityConfigurationProperties: {
//             conductorType: "FORK_JOIN",
//           },
//         },
//         activityIcon: "forkJoin",
//         activityType: "Task",
//         dxpActivityLabel: "ForkJoin",
//         dxpTypeLabel: "ForkJoin",
//         dxpActivityToolTip: "Run and Join all calls",
//       },
//       {
//         activityOwner: "Platform",
//         activityTemplate: {
//           activityNode: {
//             shape: "rectangle",
//             custom: true,
//           },
//           activityConfigurationProperties: {
//             conductorType: "HUMAN",
//           },
//         },
//         activityIcon: "human",
//         activityType: "Task",
//         dxpActivityLabel: "Human",
//         dxpTypeLabel: "Human",
//         dxpActivityToolTip: "Sends asset to a user for an approval/rejection",
//       },
//       {
//         activityOwner: "Platform",
//         activityTemplate: {
//           activityNode: {
//             shape: "rectangle",
//             custom: true,
//           },
//           activityConfigurationProperties: {
//             conductorType: "SUB_WORKFLOW",
//           },
//         },
//         activityIcon: "subWorkflow",
//         activityType: "Task",
//         dxpActivityLabel: "Sub Workflow",
//         dxpTypeLabel: "Sub Workflow",
//         dxpActivityToolTip: "Execute a Sub Workflow",
//       },
//       {
//         activityTemplate: {
//           activityNode: {
//             shape: "diamond",
//             custom: true,
//           },
//           activityConfigurationProperties: {
//             conductorType: "SWITCH",
//           },
//         },
//         activityIcon: "switch",
//         activityOwner: "Platform",
//         activityType: "Task",
//         dxpActivityLabel: "Switch",
//         dxpTypeLabel: "Switch",
//         dxpActivityToolTip: "Conditionally execute next activities",
//       },
//       {
//         activityTemplate: {
//           activityNode: {
//             shape: "rectangle",
//             custom: true,
//           },
//           activityConfigurationProperties: {
//             conductorType: "WAIT",
//           },
//         },
//         activityIcon: "wait",
//         activityOwner: "Platform",
//         activityType: "Task",
//         dxpActivityLabel: "Wait",
//         dxpTypeLabel: "Wait",
//         dxpActivityToolTip: "Wait for a specified duration",
//       },
//     ],
//   },
//   "4": {
//     activityKey: "Delete-Asset-1",
//     activityCategoryName: "Disposition",
//     activityCategoryId: 4,
//     activityCategoryIcon: "disposition",
//     activityConfig: [
//       {
//         activityOwner: "Platform",
//         activityTemplate: {
//           activityNode: {
//             shape: "rectangle",
//             custom: true,
//           },
//           activityConfigurationProperties: {
//             conductorType: "DELETE_ASSET",
//           },
//         },
//         activityIcon: "deleteAsset",
//         activityType: "Task",
//         dxpActivityLabel: "Delete Asset",
//         dxpTypeLabel: "IRM_ASSET_DELETE_WORKER",
//         dxpActivityToolTip:
//           "This Delete Asset Task activity will do a soft delete. ",
//       },
//     ],
//   },
//   "5": {
//     activityKey: "Get-Asset-Task-1",
//     activityCategoryName: "Use & Manage",
//     activityCategoryId: 5,
//     activityCategoryIcon: "useManage",
//     activityConfig: [
//       {
//         activityOwner: "Platform",
//         activityTemplate: {
//           activityNode: {
//             shape: "rectangle",
//             custom: true,
//           },
//           activityConfigurationProperties: {
//             conductorType: "GET_ASSET_TASK",
//           },
//         },
//         activityIcon: "getAssetTask",
//         activityType: "Task",
//         dxpActivityLabel: "Get AssetTask",
//         dxpTypeLabel: "Get_Asset_Task",
//         dxpActivityToolTip: "Get the asset task Details",
//       },
//       {
//         activityOwner: "Platform",
//         activityTemplate: {
//           activityNode: {
//             shape: "rectangle",
//             custom: true,
//           },
//           activityConfigurationProperties: {
//             conductorType: "STATUS_WORKER",
//           },
//         },
//         activityIcon: "setAssetStatus",
//         activityType: "Task",
//         dxpActivityLabel: "Set Asset Status",
//         dxpTypeLabel: "IRM_STATUS_GOVERNANCE",
//         dxpActivityToolTip:
//           "Sets the Asset Context status based on the Context Configuration set at assetSubType",
//       },
//       {
//         activityOwner: "Platform",
//         activityTemplate: {
//           activityNode: {
//             shape: "rectangle",
//             custom: true,
//           },
//           activityConfigurationProperties: {
//             conductorType: "HTTP",
//             preActivity: [
//               {
//                 seq: "1",
//                 type: "getJWTToken",
//               },
//             ],
//             postActivity: [
//               {
//                 seq: "1",
//                 type: "UpdateAssetDetailsVariable",
//               },
//             ],
//           },
//         },
//         activityIcon: "updateAsset",
//         activityType: "Task",
//         dxpActivityLabel: "Update Asset",
//         dxpTypeLabel: "Update Asset",
//         dxpActivityToolTip: "Sends asset to a user for an update",
//       },
//       {
//         activityOwner: "Platform",
//         activityTemplate: {
//           activityNode: {
//             shape: "rectangle",
//             custom: true,
//           },
//           activityConfigurationProperties: {
//             conductorType: "HTTP_STATUS",
//           },
//         },
//         activityIcon: "updateAssetStatus",
//         activityType: "Task",
//         dxpActivityLabel: "Update Asset Status",
//         dxpTypeLabel: "Update Asset Status",
//         dxpActivityToolTip: "Change asset status in the workflow",
//       },
//       {
//         activityOwner: "Platform",
//         activityTemplate: {
//           activityNode: {
//             shape: "rectangle",
//             custom: true,
//           },
//           activityConfigurationProperties: {
//             conductorType: "SIMPLE_RULE",
//           },
//         },
//         activityIcon: "updateCase",
//         activityType: "Task",
//         dxpActivityLabel: "Update Case",
//         dxpTypeLabel: "IRM_RULE_CASE_UPDATE_TASK",
//         dxpActivityToolTip:
//           "Find the case based on the fields selected. If it finds, the asset gets automatically attached to the case, if not a new case will be created and the asset will be attached to it",
//       },
//       {
//         activityOwner: "Platform",
//         activityTemplate: {
//           activityNode: {
//             shape: "rectangle",
//             custom: true,
//           },
//           activityConfigurationProperties: {
//             conductorType: "SIMPLE_RULE",
//           },
//         },
//         activityIcon: "updateCaseCompletion",
//         activityType: "Task",
//         dxpActivityLabel: "Update Case Completion",
//         dxpTypeLabel: "IRM_COMPLETENESS_UPDATE_CHECK_TASK",
//         dxpActivityToolTip:
//           "Update the case status to “Completed”, when all the exceptions are resolved",
//       },
//       {
//         activityOwner: "Platform",
//         activityTemplate: {
//           activityNode: {
//             shape: "rectangle",
//             custom: true,
//           },
//           activityConfigurationProperties: {
//             conductorType: "SIMPLE_RULE",
//           },
//         },
//         activityIcon: "validateCaseCompletion",
//         activityType: "Task",
//         dxpActivityLabel: "Validate Case Completion",
//         dxpTypeLabel: "IRM_COMPLETENESS_CHECK_TASK",
//         dxpActivityToolTip:
//           "Check case completeness based on the required asset sub types set as part of case set up or with a set of sub types selected or with a set of rules",
//       },
//     ],
//   },
//   "7": {
//     activityKey: "efb1cbcc-91fa-4311-bb1f-ad2f989af02e",
//     activityCategoryName: "Custom",
//     activityCategoryId: 7,
//     activityCategoryIcon: "custom",
//     activityConfig: [
//       {
//         version: "1",
//         activityOwner: "Platform",
//         activityTemplate: {
//           activityNode: {
//             shape: "rectangle",
//             custom: true,
//           },
//           activityConfigurationProperties: {
//             conductorType: "HTTP",
//             inputParameters: {
//               http_request: {
//                 request: [
//                   {
//                     key: "method",
//                     value: "POST",
//                     id: "inputParameters-http_request-method",
//                   },
//                   {
//                     key: "uri",
//                     value: "/companies/{companyId}/assets/{assetGUID}/comments",
//                     id: "inputParameters-http_request-url",
//                   },
//                 ],
//                 body: [
//                   {
//                     key: "companyId",
//                     value: "${workflow.input.companyId}",
//                     id: "inputParameters-0",
//                     disabled: true,
//                   },
//                   {
//                     key: "assetGUID",
//                     value: "${workflow.input.assetGUID}",
//                     id: "inputParameters-1",
//                     disabled: true,
//                   },
//                 ],
//               },
//             },
//           },
//         },
//         activityIcon: "customHttpNode",
//         activityType: "Task",
//         dxpActivityLabel: "Custom HTTP Node",
//         dxpTypeLabel: "Custom HTTP Node",
//       },
//       {
//         activityTemplate: {
//           activityNode: {
//             shape: "rectangle",
//             custom: true,
//           },
//           activityConfigurationProperties: {
//             conductorType: "SIMPLE_WORKER",
//           },
//         },
//         activityIcon: "customWorkerNode",
//         activityOwner: "Platform",
//         activityType: "Task",
//         dxpActivityLabel: "Custom Worker Node",
//         dxpTypeLabel: "Custom Worker Node",
//         dxpActivityToolTip: "Runs a custom worker task",
//       },
//       {
//         activityTemplate: {
//           activityNode: {
//             shape: "rectangle",
//             custom: true,
//           },
//           activityConfigurationProperties: {
//             conductorType: "SQL_NODE",
//           },
//         },
//         activityIcon: "sqlNode",
//         activityOwner: "Platform",
//         activityType: "Task",
//         dxpActivityLabel: "SQL Node",
//         dxpTypeLabel: "SQL Node",
//         dxpActivityToolTip: "SQL Node",
//       },
//     ],
//   },
//   "8": {
//     activityKey: "12e4543a-cdb2-4930-80ad-e249218cacb5",
//     activityCategoryName: "AI Nodes",
//     activityCategoryId: 8,
//     activityCategoryIcon: "connectors",
//     activityConfig: [
//       {
//         activityOwner: "Platform",
//         activityTemplate: {
//           activityNode: {
//             shape: "rectangle",
//             custom: true,
//           },
//           activityConfigurationProperties: {
//             conductorType: "AI_Process_Assets",
//           },
//         },
//         activityIcon: "processAssets",
//         activityType: "Task",
//         dxpActivityLabel: "AI - Process Assets",
//         dxpTypeLabel: "AI - Process Assets",
//         dxpActivityToolTip: "Process assets using AI",
//       },
//       {
//         activityOwner: "Platform",
//         activityTemplate: {
//           activityNode: {
//             shape: "rectangle",
//             custom: true,
//           },
//           activityConfigurationProperties: {
//             conductorType: "AI_AGENT",
//           },
//         },
//         activityIcon: "agent",
//         activityType: "Task",
//         dxpActivityLabel: "Agent",
//         dxpTypeLabel: "Agent",
//         dxpActivityToolTip: "Agent",
//       },
//       {
//         activityOwner: "Platform",
//         activityTemplate: {
//           activityNode: {
//             shape: "rectangle",
//             custom: true,
//           },
//           activityConfigurationProperties: {
//             conductorType: "CHUNKER",
//           },
//         },
//         activityIcon: "chunker",
//         activityType: "Task",
//         dxpActivityLabel: "Chunker",
//         dxpTypeLabel: "CHUNKER",
//         dxpActivityToolTip: "Chunker",
//       },
//       {
//         activityOwner: "Platform",
//         activityTemplate: {
//           activityNode: {
//             shape: "rectangle",
//             custom: true,
//           },
//           activityConfigurationProperties: {
//             conductorType: "CLEANING",
//           },
//         },
//         activityIcon: "cleaning",
//         activityType: "Task",
//         dxpActivityLabel: "Cleaning",
//         dxpTypeLabel: "CLEANING",
//         dxpActivityToolTip: "Cleaning",
//       },
//       {
//         activityOwner: "Platform",
//         activityTemplate: {
//           activityNode: {
//             shape: "rectangle",
//             custom: true,
//           },
//           activityConfigurationProperties: {
//             conductorType: "DESTINATION",
//           },
//         },
//         activityIcon: "destination",
//         activityType: "Task",
//         dxpActivityLabel: "Destination",
//         dxpTypeLabel: "DESTINATION",
//         dxpActivityToolTip: "Destination",
//       },
//       {
//         activityOwner: "Platform",
//         activityTemplate: {
//           activityNode: {
//             shape: "rectangle",
//             custom: true,
//           },
//           activityConfigurationProperties: {
//             conductorType: "ENRICHMENT",
//           },
//         },
//         activityIcon: "enrichment",
//         activityType: "Task",
//         dxpActivityLabel: "Enrichment",
//         dxpTypeLabel: "ENRICHMENT",
//         dxpActivityToolTip: "Enrichment",
//       },
//       {
//         activityOwner: "Platform",
//         activityTemplate: {
//           activityNode: {
//             shape: "rectangle",
//             custom: true,
//           },
//           activityConfigurationProperties: {
//             conductorType: "EVALUATION",
//           },
//         },
//         activityIcon: "evaluation",
//         activityType: "Task",
//         dxpActivityLabel: "Evaluation",
//         dxpTypeLabel: "EVALUATION",
//         dxpActivityToolTip: "Evaluation",
//       },
//       {
//         activityOwner: "Platform",
//         activityTemplate: {
//           activityNode: {
//             shape: "rectangle",
//             custom: true,
//           },
//           activityConfigurationProperties: {
//             conductorType: "GENERATE-EMBEDDING",
//           },
//         },
//         activityIcon: "generateEmbedding",
//         activityType: "Task",
//         dxpActivityLabel: "Generate Embedding",
//         dxpTypeLabel: "GENERATE-EMBEDDING",
//         dxpActivityToolTip: "Generate Embedding",
//       },
//       {
//         activityOwner: "Platform",
//         activityTemplate: {
//           activityNode: {
//             shape: "rectangle",
//             custom: true,
//           },
//           activityConfigurationProperties: {
//             conductorType: "OCR",
//           },
//         },
//         activityIcon: "ocr",
//         activityType: "Task",
//         dxpActivityLabel: "OCR",
//         dxpTypeLabel: "OCR",
//         dxpActivityToolTip: "OCR",
//       },
//       {
//         activityOwner: "Platform",
//         activityTemplate: {
//           activityNode: {
//             shape: "rectangle",
//             custom: true,
//           },
//           activityConfigurationProperties: {
//             conductorType: "SOURCE",
//           },
//         },
//         activityIcon: "source",
//         activityType: "Task",
//         dxpActivityLabel: "Source",
//         dxpTypeLabel: "SOURCE",
//         dxpActivityToolTip: "Source",
//       },
//     ],
//   },
//   "9": {
//     activityKey: "Callable Automation-1",
//     activityCategoryName: "Remote Asset Explorer",
//     activityCategoryId: 9,
//     // activityCategoryIcon: "connectors",
//     activityCategoryIcon: "remoteAssetExplorer",
//     activityConfig: [
//       {
//         activityOwner: "Platform",
//         activityTemplate: {
//           activityNode: {
//             shape: "rectangle",
//             custom: true,
//           },
//           activityConfigurationProperties: {
//             conductorType: "Callable_Automation",
//           },
//         },
//         activityIcon: "callableAutomation",
//         activityType: "Task",
//         dxpActivityLabel: "Callable Automation",
//         dxpTypeLabel: "Callable Automation",
//         dxpActivityToolTip: "Callable Automation",
//       },
//       {
//         activityOwner: "Platform",
//         activityTemplate: {
//           activityNode: {
//             shape: "rectangle",
//             custom: true,
//           },
//           activityConfigurationProperties: {
//             conductorType: "Code",
//           },
//         },
//         activityIcon: "code",
//         activityType: "Task",
//         dxpActivityLabel: "Code",
//         dxpTypeLabel: "Code",
//         dxpActivityToolTip: "Code",
//       },
//       {
//         activityOwner: "Platform",
//         activityTemplate: {
//           activityNode: {
//             shape: "rectangle",
//             custom: true,
//           },
//           activityConfigurationProperties: {
//             conductorType: "Crawler",
//           },
//         },
//         activityIcon: "crawler",
//         activityType: "Task",
//         dxpActivityLabel: "Crawler",
//         dxpTypeLabel: "Crawler",
//         dxpActivityToolTip: "Crawler",
//       },
//       {
//         activityOwner: "Platform",
//         activityTemplate: {
//           activityNode: {
//             shape: "rectangle",
//             custom: true,
//           },
//           activityConfigurationProperties: {
//             conductorType: "Storage",
//           },
//         },
//         activityIcon: "storage",
//         activityType: "Task",
//         dxpActivityLabel: "Storage",
//         dxpTypeLabel: "Storage",
//         dxpActivityToolTip: "Storage",
//       },
//     ],
//   },
//   "10": {
//     activityKey: "Classify & Extract Processor-1",
//     activityCategoryName: "Processor",
//     activityCategoryId: 10,
//     // activityCategoryIcon: "connectors",
//     activityCategoryIcon: "processor",
//     activityConfig: [
//       {
//         activityTemplate: {
//           activityNode: {
//             shape: "rectangle",
//             custom: true,
//           },
//           activityConfigurationProperties: {
//             conductorType: "PROCESSOR_CLASSIFY_EXTRACT",
//           },
//         },
//         activityIcon: "classifyExtract",
//         activityOwner: "Platform",
//         activityType: "IRM_PROCESSOR_TEMPLATE",
//         dxpActivityLabel: "Classify & Extract Processor",
//         dxpTypeLabel: "Classify & Extract Processor",
//         dxpActivityToolTip: "Classify & Extract Processor",
//       },
//       {
//         activityTemplate: {
//           activityNode: {
//             shape: "rectangle",
//             custom: true,
//           },
//           activityConfigurationProperties: {
//             conductorType: "PROCESSOR_CUSTOM",
//           },
//         },
//         activityIcon: "customProcessor",
//         activityOwner: "Platform",
//         activityType: "IRM_PROCESSOR_TEMPLATE",
//         dxpActivityLabel: "Custom-Processor",
//         dxpTypeLabel: "Custom-Processor",
//         dxpActivityToolTip: "Custom-Processor",
//       },
//       {
//         activityTemplate: {
//           activityNode: {
//             shape: "rectangle",
//             custom: true,
//           },
//           activityConfigurationProperties: {
//             conductorType: "PROCESSOR_EMBEDDING_GENERATOR",
//           },
//         },
//         activityIcon: "embeddingGenerator",
//         activityOwner: "Platform",
//         activityType: "IRM_PROCESSOR_TEMPLATE",
//         dxpActivityLabel: "Embedding Generator",
//         dxpTypeLabel: "Embedding Generator",
//         dxpActivityToolTip: "Embedding Generator",
//       },
//       {
//         activityTemplate: {
//           activityNode: {
//             shape: "rectangle",
//             custom: true,
//           },
//           activityConfigurationProperties: {
//             conductorType: "PROCESSOR_IMAGE",
//           },
//         },
//         activityIcon: "imageProcessor",
//         activityOwner: "Platform",
//         activityType: "IRM_PROCESSOR_TEMPLATE",
//         dxpActivityLabel: "Image Processor",
//         dxpTypeLabel: "Image Processor",
//         dxpActivityToolTip: "Image Processor",
//       },
//       {
//         activityTemplate: {
//           activityNode: {
//             shape: "rectangle",
//             custom: true,
//           },
//           activityConfigurationProperties: {
//             conductorType: "PROCESSOR_INFERENCE",
//           },
//         },
//         activityIcon: "inferenceProcessor",
//         activityOwner: "Platform",
//         activityType: "IRM_PROCESSOR_TEMPLATE",
//         dxpActivityLabel: "Inference Processor",
//         dxpTypeLabel: "Inference Processor",
//         dxpActivityToolTip: "Inference Processor",
//       },
//       {
//         activityTemplate: {
//           activityNode: {
//             shape: "rectangle",
//             custom: true,
//           },
//           activityConfigurationProperties: {
//             conductorType: "PROCESSOR_OCR_EXTRACTOR",
//           },
//         },
//         activityIcon: "ocrExtractor",
//         activityOwner: "Platform",
//         activityType: "IRM_PROCESSOR_TEMPLATE",
//         dxpActivityLabel: "OCR Extractor",
//         dxpTypeLabel: "IRM_PROCESSOR_TEMPLATE",
//         dxpActivityToolTip: "OCR Extractor",
//       },
//     ],
//   },
// };
