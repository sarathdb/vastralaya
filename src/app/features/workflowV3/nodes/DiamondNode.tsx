import { Box, Typography } from "@mui/material";
import React from "react";
import { NodeProps } from "react-flow-renderer";
import { INodeFactory } from "./NodeFactory";
import { Handle, Position } from "@xyflow/react";
import { NodeTypes } from "../enum/NodeTypes";
import { INodeData } from "../model/NodeData";
import { nodeShapeRegistry } from "../registry/NodeRegistry";
import NodeIcon from "../utils/NodeIcon";
import { getWorkflowStatusColor } from "../utils/Utils";

import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { Stack } from "@mui/material";

const DiamondNode: React.FC<INodeFactory> = ({ data }) => {
  const width = 100;
  const height = 100;
  const strokeWidth = 4;
  const halfStroke = strokeWidth / 2;

  const pathData = `
  M${width / 2},${halfStroke}
  L${width - halfStroke},${height / 2}
  L${width / 2},${height - halfStroke}
  L${halfStroke},${height / 2}
  Z
`;

  const mountainPathData = `
  M0,${height}
  C30,60 40,30 60,50
  C80,70 100,40 ${width},${height}
  Z
`;

  const pathDataLeft = `
  M0,${height}
  L120,120
  L200,${height}
  Z
`;

  const pathDataCenter = `
  M60,${height}
  L200,60
  L340,${height}
  Z
`;

  const pathDataRight = `
  M140,${height}
  L280,30
  L400,${height}
  Z
`;

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      style={{
        overflow: "visible", // Prevent clipping
        // background: "transparent",
        // backgroundColor: "transparent",
      }}
    >
      {/* <path
        d={mountainPathData}
        // fill="#eeeeee"
        // stroke="#000"
        fill="white" // Background color inside the shape
        stroke="#ddd" // Border/stroke color
        strokeWidth={strokeWidth}
        strokeLinejoin="round" // or "miter" or "bevel"
        strokeLinecap="round"
      /> */}

      <path d={pathDataLeft} fill="#0D4A80" />
      <path d={pathDataCenter} fill="#5BC4F1" opacity="0.9" />
      <path d={pathDataRight} fill="#1976C9" opacity="0.9" />
      <foreignObject x="0" y="0" width={width} height={height}>
        <Box
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            pointerEvents: "none",
            backgroundColor: "transparent",
            flexDirection: "column",
          }}
        >
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
        </Box>
      </foreignObject>
    </svg>
  );
};

export default DiamondNode;
