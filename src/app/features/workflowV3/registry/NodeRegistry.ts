import { NodeTypes } from "../enum/NodeTypes";
import { NodeContainer } from "../nodes/NodeContainer";
import { StickyNoteNode } from "../nodes/StickyNoteNode";

export const nodeRegistry = {
  [NodeTypes.Custom]: NodeContainer,
  [NodeTypes.Trigger]: NodeContainer,
  [NodeTypes.Processor]: NodeContainer,
  [NodeTypes.CoreWorkflow]: NodeContainer,
  [NodeTypes.AiAgents]: NodeContainer,
  [NodeTypes.Apps]: NodeContainer,
  [NodeTypes.Flow]: NodeContainer,
  [NodeTypes.Rot]: NodeContainer,
  [NodeTypes.ContentManagement]: NodeContainer,
  [NodeTypes.Inference]: NodeContainer,
  [NodeTypes.Switch]: NodeContainer,
  [NodeTypes.Merge]: NodeContainer,
  // [NodeTypes.StickyNote]: StickyNoteNode,
};

export const nodeShapeRegistry = {
  [NodeTypes.Trigger]: "trigger",
  [NodeTypes.Processor]: "stadium",
  [NodeTypes.CoreWorkflow]: "stadium",
  [NodeTypes.AiAgents]: "stadium",
  [NodeTypes.Apps]: "stadium",
  [NodeTypes.Flow]: "stadium",
  [NodeTypes.Rot]: "stadium",
  [NodeTypes.ContentManagement]: "stadium",
  [NodeTypes.Inference]: "stadium",
  [NodeTypes.Switch]: "square",
  [NodeTypes.Merge]: "square",
};
