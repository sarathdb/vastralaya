import React from "react";
import { Handle, Position } from "reactflow";
import PlusIcon from "@mui/icons-material/ControlPoint";
import { Box, Typography } from "@mui/material";

const CustomNode = ({ data, id }) => {
  const handlePlusClick = (handleId) => {
    // Emit an event or use a callback to create a new node and edge
    const event = new CustomEvent("handlePlusClick", {
      detail: { nodeId: id, handleId },
    });
    window.dispatchEvent(event);
  };

  return (
    <Box
      style={{
        padding: "20px",
        // background: "#007bff",
        color: "white",
        borderRadius: "5px",
        textAlign: "center",
        position: "relative",
        border: "2px solid #007bff",
      }}
    >
      <Typography sx={{ color: "#007bff" }}>{data.label}</Typography>

      {/* Handle for the right side */}
      <div
        style={{
          position: "absolute",
          right: "-10px",
          top: "50%",
          transform: "translateY(-50%)",
        }}
        onClick={() => handlePlusClick("right")} // Add onClick to the plus icon
      >
        <Handle
          type="source"
          position={Position.Right}
          id="right"
          style={{
            background: "transparent",
            border: "none",
            width: "25px",
            height: "25px",
            backgroundColor: "white",
          }}
        />
        <PlusIcon
          sx={{
            fontSize: 20,
            position: "absolute",
            transform: "translate(-95%, -50%)",
            color: "#007bff",
            cursor: "pointer", // Make the icon clickable
          }}
        />
      </div>

      {/* Handle for the bottom side */}
      <div
        style={{
          position: "absolute",
          bottom: "-10px",
          left: "50%",
          transform: "translateX(-50%)",
        }}
        onClick={() => handlePlusClick("bottom")} // Add onClick to the plus icon
      >
        <Handle
          type="source"
          position={Position.Bottom}
          id="bottom"
          style={{
            background: "transparent",
            border: "none",
            width: "25px",
            height: "25px",
            backgroundColor: "white",
          }}
        />
        <PlusIcon
          sx={{
            fontSize: 20,
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -95%)",
            color: "#007bff",
            cursor: "pointer", // Make the icon clickable
            backgroundColor: "transparent",
          }}
        />
      </div>
    </Box>
  );
};

export default CustomNode;
