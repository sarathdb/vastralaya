import React, { useState, useEffect } from "react";
import {
  Handle,
  Position,
  useNodeConnections,
  useNodesData,
  useReactFlow,
} from "@xyflow/react";
// import { Box, Typography } from "@mui/material";

interface LightnessNodeProps {
  id: string;
}

const LightnessNode: React.FC<LightnessNodeProps> = ({ id }) => {
  const { updateNodeData } = useReactFlow();

  const connections = useNodeConnections({ handleType: "target" });
  const nodesData = useNodesData(connections?.[0]?.source);

  const [lightness, setLightness] = useState<"light" | "dark">("dark");

  useEffect(() => {
    if (nodesData?.data?.value) {
      const color = nodesData.data.value as { r: number; g: number; b: number };
      const isLight =
        0.2126 * color.r + 0.7152 * color.g + 0.0722 * color.b >= 128;
      setLightness(isLight ? "light" : "dark");

      const newNodeData = isLight
        ? { light: color, dark: null }
        : { light: null, dark: color };
      updateNodeData(id, newNodeData);
    } else {
      setLightness("dark");
      updateNodeData(id, { light: null, dark: { r: 0, g: 0, b: 0 } });
    }
  }, [nodesData, updateNodeData, id]);

  // return (
  //   <Box
  //     sx={{
  //       width: 100,
  //       height: 100,
  //       display: "flex",
  //       flexDirection: "column",
  //       alignItems: "end",
  //       justifyContent: "center",
  //       textAlign: "center",
  //       borderRadius: 2,
  //       backgroundColor: lightness === "light" ? "#fff" : "#000",
  //       color: lightness === "light" ? "#000" : "#fff",
  //     }}
  //   >
  //     <Handle
  //       type="target"
  //       position={Position.Left}
  //       id={`${id}-handle`}
  //       className="handle"
  //     />
  //     <Typography variant="body2">{`Lightness: ${lightness}`}</Typography>
  //   </Box>
  // );

  return (
    <div
      className="lightness-node"
      style={{
        background: lightness === "light" ? "white" : "black",
        color: lightness === "light" ? "black" : "white",
      }}
    >
      <Handle type="target" position={Position.Left} />
      <p style={{ marginRight: 10 }}>Light</p>
      <Handle
        type="source"
        id="light"
        position={Position.Right}
        style={{ top: 25 }}
      />
      <p style={{ marginRight: 10 }}>Dark</p>
      <Handle
        type="source"
        id="dark"
        position={Position.Right}
        style={{ top: 75 }}
      />
    </div>
  );
};

export default LightnessNode;
