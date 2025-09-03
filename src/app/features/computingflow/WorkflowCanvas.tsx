import React, { useCallback } from "react";
import {
  ReactFlow,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Edge,
  Node,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import NumberInput from "./NumberInput";
import ColorPreview from "./ColorPreview";
import Lightness from "./Lightness";
import Log from "./Log";
import CustomEdge from "./CustomEdge";

const edgeTypes = {
  custom: CustomEdge,
};

const nodeTypes = {
  NumberInput,
  ColorPreview,
  Lightness,
  Log,
};

const initialNodes: Node[] = [
  {
    type: "NumberInput",
    id: "1",
    data: { label: "Red", value: 255 },
    position: { x: 0, y: 0 },
  },
  {
    type: "NumberInput",
    id: "2",
    data: { label: "Green", value: 0 },
    position: { x: 0, y: 100 },
  },
  {
    type: "NumberInput",
    id: "3",
    data: { label: "Blue", value: 115 },
    position: { x: 0, y: 200 },
  },
  {
    type: "ColorPreview",
    id: "color",
    position: { x: 150, y: 50 },
    data: {
      label: "Color",
      value: { r: undefined, g: undefined, b: undefined },
    },
  },
  {
    type: "Lightness",
    id: "lightness",
    data: {},
    position: { x: 350, y: 75 },
  },
  {
    id: "log-1",
    type: "Log",
    position: { x: 500, y: 0 },
    data: { label: "Use black font", fontColor: "black" },
  },
  {
    id: "log-2",
    type: "Log",
    position: { x: 500, y: 140 },
    data: { label: "Use white font", fontColor: "white" },
  },
];

const initialEdges: Edge[] = [
  {
    id: "1-color",
    source: "1",
    target: "color",
    targetHandle: "red",
    label: "Case 1",
    type: "simplebezier",
    data: { edgeType: "simplebezier" },
  },
  {
    id: "2-color",
    source: "2",
    target: "color",
    targetHandle: "green",
    label: "Case 2",
    type: "smoothstep",
    data: { edgeType: "smoothstep" },
  },
  {
    id: "3-color",
    source: "3",
    target: "color",
    targetHandle: "blue",
    label: "Case 3",
    type: "simplebezier",
    data: { edgeType: "straight" },
  },
  {
    id: "color-lightness",
    source: "color",
    target: "lightness",
    label: "Case 4",
    type: "custom",
    data: { edgeType: "smoothstep" },
  },
  {
    id: "lightness-log-1",
    source: "lightness",
    sourceHandle: "light",
    target: "log-1",
    label: "Case 5",
    type: "custom",
    data: { edgeType: "smoothstep" },
  },
  {
    id: "lightness-log-2",
    source: "lightness",
    sourceHandle: "dark",
    target: "log-2",
    label: "Case 6",
    type: "custom",
    data: { edgeType: "smoothstep" },
  },
];

const WorkflowCanvas: React.FC = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  return (
    <ReactFlow
      nodeTypes={nodeTypes}
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      edgeTypes={edgeTypes}
      fitView
    >
      <Background />
    </ReactFlow>
  );
};

export default WorkflowCanvas;
