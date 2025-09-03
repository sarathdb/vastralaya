import React from "react";
import {
  Handle,
  Position,
  useNodeConnections,
  useNodesData,
} from "@xyflow/react";
import { Box, Typography } from "@mui/material";

interface LogProps {
  data: {
    label: string;
    fontColor: string;
  };
}

const Log: React.FC<LogProps> = ({ data }) => {
  const connections = useNodeConnections({ handleType: "target" });
  const nodeData = useNodesData(connections?.[0]?.source);

  const color = nodeData?.data
    ? nodeData.data[
        connections?.[0]?.sourceHandle as keyof typeof nodeData.data
      ]
    : null;

  return (
    <Box
      sx={{
        backgroundColor: color
          ? `rgb(${(color  as { r: number; g: number; b: number }).r}, ${
              (color as { r: number; g: number; b: number }).g
            }, ${
              (color as { r: number; g: number; b: number }).b
            })`
          : "white",
        color: color ? data.fontColor : "black",
        padding: 2,
        borderRadius: 1,
        textAlign: "center",
      }}
    >
      <Typography variant="body2">
        {color ? data.label : "Do nothing"}
      </Typography>
      <Handle type="target" position={Position.Left} />
    </Box>
  );
};

export default Log;
