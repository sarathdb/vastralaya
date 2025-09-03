import { ConductorType } from "../enum/ConductorType";
import { INodeCategory } from "../model/NodeData";

export interface INodes {
  [key: string]: INodeCategory;
}

export const nodeCategories: INodeCategory[] = [
  {
    nodeCategoryName: "Processor",
    //nodeCategoryId: "b71af345-503f-435a-92ba-00c484e012cd",
    nodeCategoryIcon: "Memory",
    nodeCategoryColor: "#8e44ad",
    type: "processor",
    categoryDescription: "categoryDescription",
  },
];

export const nodeSubCategories: any[] = [
  {
    conductorConfig: {
      name: "IRM_PROCESSOR_TEMPLATE",
      type: "SIMPLE",
    },
    formType: "processor",
    nodeType: "processor",
    nodeCategoryType: "processor",
    nodeDescription: "node description",
    nodeIcon: "FilterAlt",
    nodeIconColor: "#8e44ad",
    // nodeId: "55822e29-c717-4856-92af-d1309974cd81",
    nodeName: "classifyExtractProcessor",
    nodeLabel: "Classify & Extract Processor",
    nodeToolTip: "Classify & Extract Processor",
    nodeOwner: "platform",
  },
  {
    conductorConfig: {
      name: "IRM_PROCESSOR_TEMPLATE",
      type: "SIMPLE",
    },
    nodeType: "processor",
    formType: "processor",
    nodeCategoryType: "processor",
    nodeIconColor: "#8e44ad",
    nodeDescription: "node description",
    nodeIcon: "Build",
    //nodeId: "109dce44-5383-44a7-93a1-371afba40090",
    nodeName: "customProcessor",
    nodeLabel: "Custom-Processor",
    nodeToolTip: "Custom-Processor",
    nodeOwner: "platform",
  },
  {
    conductorConfig: {
      name: "IRM_PROCESSOR_TEMPLATE",
      type: "SIMPLE",
    },
    nodeType: "processor",
    nodeCategoryType: "processor",
    nodeDescription: "node description",
    nodeIcon: "ScatterPlot",
    nodeIconColor: "#8e44ad",
    // nodeId: "d1d8835b-b85d-4656-8956-8794b2583a64",
    nodeName: "embeddingGenerator",
    nodeLabel: "Embedding Generator",
    nodeToolTip: "Embedding Generator",
    nodeOwner: "platform",
    formType: "processor",
  },
  {
    conductorConfig: {
      name: "IRM_PROCESSOR_TEMPLATE",
      type: "SIMPLE",
    },
    nodeType: "processor",
    nodeCategoryType: "processor",
    nodeDescription: "node description",
    nodeIcon: "Image",
    nodeIconColor: "#8e44ad",
    //nodeId: "848a0d3c-09e6-4b66-bca3-420b86607262",
    nodeName: "imageProcessor",
    nodeLabel: "Image Processor",
    nodeToolTip: "Image Processor",
    nodeOwner: "platform",
    formType: "processor",
  },
  {
    conductorConfig: {
      name: "IRM_PROCESSOR_TEMPLATE",
      type: "SIMPLE",
    },
    nodeType: "processor",
    nodeCategoryType: "processor",
    nodeDescription: "node description",
    nodeIcon: "Insights",
    nodeIconColor: "#8e44ad",
    //nodeId: "32d62f64-fb9b-42b0-9b4f-013fa98a85d3",
    nodeName: "inferenceProcessor",
    nodeLabel: "Inference Processor",
    nodeToolTip: "Inference Processor",
    nodeOwner: "platform",
    formType: "processor",
  },
  {
    nodeType: "switch",
    nodeCategoryType: "switch",
    nodeDescription: "node description",
    nodeIcon: "Bolt",
    nodeIconColor: "#8e44ad",
    formType: "switch",
    // nodeId: "39fbc11d-1112-42c6-a13c-33db8a11163f",
    nodeName: "Switch",
    nodeLabel: "Switch",
    nodeToolTip: "Switch",
    nodeOwner: "platform",
  },
  {
    conductorConfig: {
      name: "IRM_PROCESSOR_TEMPLATE",
      type: ConductorType.SIMPLE,
    },
    nodeType: "processor",
    nodeCategoryType: "processor",
    nodeDescription: "node description",
    nodeIcon: "TextSnippet",
    nodeIconColor: "#8e44ad",
    //nodeId: "39fbc98d-1112-42c6-a13c-33db8a63063f",
    nodeName: "ocrExtractor",
    nodeLabel: "OCR Extractor",
    nodeToolTip: "OCR Extractor",
    nodeOwner: "platform",
    formType: "processor",
  },
  {
    nodeType: "trigger",
    nodeCategoryType: "trigger",
    nodeDescription: "node description",
    nodeIcon: "Bolt",
    nodeIconColor: "#8e44ad",
    formType: "trigger",
    // nodeId: "39fbc11d-1112-42c6-a13c-33db8a11163f",
    nodeName: "Trigger",
    nodeLabel: "Trigger",
    nodeToolTip: "Trigger",
    nodeOwner: "platform",
  },
];

export const mockAssetTypes = [
  {
    id: "67c7152c3e7444531df79935",
    value: "Case",
    label: "Case",
  },
  {
    id: "67c7152c3e7444531df79938",
    value: "Document",
    label: "Document",
  },
];

export const mockAssetSubTypes = [
  {
    id: "67c7153b3e7444531df7a6f0",
    assetType: "Document",
    value: "Imaging Document",
    label: "Imaging Document",
  },
  {
    id: "77c7153b3e7444531df8b7f0",
    assetType: "Case",
    value: "Processor",
    label: "Processor",
  },
  {
    id: "97c7153b3f7444545df8b7g1",
    assetType: "Case",
    value: "Text Files",
    label: "Text Files",
  },
];

export const eventOptions = [
  {
    label: "Event",
    value: "Event",
  },
  {
    label: "Schedule",
    value: "schedule",
  },
];
