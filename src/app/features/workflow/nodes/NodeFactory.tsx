import { Stack, Typography } from "@mui/material";
import React, { useMemo } from "react";
import { Handle, Position } from "reactflow";
import { NodeTypes } from "../enum/NodeTypes";
import { INodeData } from "../model/NodeData";
import { nodeShapeRegistry } from "../registry/NodeRegistry";
import NodeIcon from "../utils/NodeIcon";
import { getWorkflowStatusColor } from "../utils/Utils";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline"; // Import MUI error icon

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
  const shapes = {
    rectangle: {
      ...baseStyle(nodeData),
      borderRadius: "10px",
      minWidth: "150px",
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
      minWidth: "100px", // Reduce width to 100px
      height: "80px", // Adjust height proportionally
      borderRadius: "30px 0px 0px 30px", // Rounded left corners
      padding: "8px 15px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      position: "relative",
      // "&::after": {
      //   content: '""',
      //   position: "absolute",
      //   right: "-10px", // Adjust position for smaller width
      //   top: "50%",
      //   width: "10px", // Reduce size of circular handle
      //   height: "10px",
      //   background: "#666",
      //   borderRadius: "50%",
      //   transform: "translateY(-50%)",
      // },
    },
    capsule: {
      ...baseStyle(nodeData),
      width: "120px",
      height: "80px",
      borderRadius: "25px",
      justifyContent: "center",
    },

    pentagon: {
      ...baseStyle(nodeData),
      width: "200px",
      height: "150px",
      clipPath: "polygon(50% 0%, 100% 35%, 80% 100%, 20% 100%, 0% 35%)",
      justifyContent: "center",
      backgroundColor: "blue",
    },

    trapezoid: {
      ...baseStyle(nodeData),
      width: "120px",
      height: "70px",
      clipPath: "polygon(25% 0%, 75% 0%, 100% 100%, 0% 100%)",
      justifyContent: "center",
    },

    stadium: {
      ...baseStyle(nodeData),
      width: "160px",
      height: "60px",
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

  return (
    <Stack
      id={id}
      sx={[defaultStyles, { backgroundColor: "#fff", position: "relative" }]}
      direction="row"
      alignItems="center"
    >
      <Stack justifyContent="center" alignItems="center">
        <NodeIcon iconName={data.nodeIcon} iconColor={data.nodeIconColor} />
        <Typography>{data.nodeLabel}</Typography>
        {data.formErrorMessage && (
          <Stack
            direction="row"
            alignItems="center"
            gap="3px"
            sx={{ mt: "2px" }}
          >
            <ErrorOutlineIcon
              sx={{
                color: "red",
                fontSize: 14, // Slightly larger for visibility
              }}
            />
            <Typography
              variant="caption"
              sx={{
                color: "red",
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
