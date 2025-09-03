import React from "react";
import { Handle, Position, NodeProps } from "reactflow";
import { Box, Typography } from "@mui/material";

interface SwitchNodeData {
  label: string;
  conditions: string[];
}

const SwitchNode: React.FC<NodeProps<SwitchNodeData>> = ({ data }) => {
  return (
    <Box
      sx={{
        width: 100,
        height: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        // backgroundColor: "grey.900",
        color: "white",
        fontWeight: "bold",
        borderRadius: 1,
        border: "2px solid",
        borderColor: "grey.200",
        boxShadow: 2,
        transform: "rotate(45deg)",
        position: "relative",
        backgroundColor: "#f0f0f0",
      }}
    >
      {/* Label (Rotated Back) */}
      <Typography sx={{ transform: "rotate(-45deg)" }}>
        {data.label || "Switch Node"}
      </Typography>

      {/* Input Handle (Left) */}
      <Handle
        type="target"
        position={Position.Left}
        id="input"
        style={{ left: -6 }}
      />

      {/* Conditional Output Handles (Right) */}
      {data.conditions.map((condition, index) => (
        <Handle
          key={index}
          type="source"
          position={Position.Right}
          id={condition}
          style={{ right: -6, top: `${30 + index * 20}%` }}
        />
      ))}
    </Box>
  );
};

export default SwitchNode;
