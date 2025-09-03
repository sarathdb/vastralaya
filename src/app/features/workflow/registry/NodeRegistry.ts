import { NodeTypes } from "../enum/NodeTypes";
import { NodeContainer } from "../nodes/NodeContainer";

export const nodeRegistry = {
  [NodeTypes.Custom]: NodeContainer,
  [NodeTypes.Trigger]: NodeContainer,
  [NodeTypes.Processor]: NodeContainer,
};

export const nodeShapeRegistry = {
  [NodeTypes.Trigger]: "trigger",
  [NodeTypes.Processor]: "stadium", //pentagon
  // trapezoid
  // stadium
};
