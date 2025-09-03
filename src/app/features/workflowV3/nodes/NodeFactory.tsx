import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { Stack, Typography } from "@mui/material";
import React, { useMemo } from "react";
import { Handle, Position } from "@xyflow/react";
import { NodeTypes } from "../enum/NodeTypes";
import { INodeData } from "../model/NodeData";
import { nodeShapeRegistry } from "../registry/NodeRegistry";
import NodeIcon from "../utils/NodeIcon";
import { getWorkflowStatusColor } from "../utils/Utils";
import DiamondNode from "./DiamondNode";

export interface INodeFactory {
  id: string;
  data: INodeData;
  type: string;
}

const baseStyle = (nodeData: INodeData) => {
  return {
    background: "#fff",
    border: `3px solid ${getWorkflowStatusColor(nodeData.status)}`,
    borderRadius: "10px",
    padding: "10px",
    minWidth: "150px",
    alignItems: "center",
    gap: 1,
    flexDirection: "column",
    color: "#333",
  };
};

const shapeStyles = (type, nodeData: INodeData) => {
  const triggerBorder = nodeData.isHorizontal
    ? "30px 0px 0px 30px"
    : "30px 30px 0px 0px";
  const shapes = {
    rectangle: {
      ...baseStyle(nodeData),
      borderRadius: "10px",
      minWidth: "150px",
      height: "70px",
    },
    square: {
      ...baseStyle(nodeData),
      borderRadius: "10px",
      minWidth: "60px",
      height: "50px",
    },
    circle: {
      ...baseStyle(nodeData),
      borderRadius: "50%",
      width: "80px",
      height: "80px",
      justifyContent: "center",
    },
    diamond: {
      ...baseStyle(nodeData),
      width: "100px",
      height: "100px",
      transform: "rotate(45deg)",
      justifyContent: "center",
    },
    hexagon: {
      ...baseStyle(nodeData),
      width: "120px",
      height: "70px",
      clipPath: "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
      justifyContent: "center",
    },
    parallelogram: {
      ...baseStyle(nodeData),
      width: "140px",
      height: "60px",
      clipPath: "polygon(20% 0%, 100% 0%, 80% 100%, 0% 100%)",
    },
    trigger: {
      ...baseStyle(nodeData),
      minWidth: "110px",
      height: "70px",
      borderRadius: triggerBorder,
      padding: "8px 15px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      position: "relative",
    },
    stadium: {
      ...baseStyle(nodeData),
      minWidth: "160px",
      height: "70px",
      borderRadius: "30px",
      justifyContent: "center",
    },
  };

  return shapes[type] || shapes.rectangle;
};

export const NodeFactory: React.FC<INodeFactory> = ({ id, data, type }) => {
  const defaultStyles = useMemo(
    () => shapeStyles(nodeShapeRegistry[type], data),
    [data, type]
  );
  if (type === NodeTypes.Trigger) {
    return <DiamondNode id={id} data={data} type={type} />;
  }

  return (
    <Stack id={id} sx={defaultStyles} direction="row" alignItems="center">
      <Stack justifyContent="center" alignItems="center">
        <NodeIcon iconName={data.nodeIcon} iconColor={data.nodeIconColor} />
        <Typography>{data.nodeLabel}</Typography>
        {(data.formError || data.formErrorMessage) && (
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            gap="3px"
            sx={{ mt: "2px" }}
          >
            <ErrorOutlineIcon
              sx={{
                color: data.formError ? "red" : "#1e417a",
                fontSize: 14,
              }}
            />
            <Typography
              variant="caption"
              sx={{
                color: data.formError ? "red" : "#1e417a",
                fontSize: "9px",
                whiteSpace: "nowrap",
              }}
            >
              {data.formErrorMessage}
            </Typography>
          </Stack>
        )}
      </Stack>

      {type !== NodeTypes.Trigger && (
        <Handle
          type="target"
          position={data.isHorizontal ? Position.Left : Position.Top}
        />
      )}
      <Handle
        type="source"
        position={data.isHorizontal ? Position.Right : Position.Bottom}
      />
    </Stack>
  );
};
