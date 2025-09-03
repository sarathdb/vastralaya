import React, { useEffect } from "react";
import {
  Handle,
  Position,
  useNodeConnections,
  useNodesData,
  useReactFlow,
} from "@xyflow/react";
import { Box, Typography } from "@mui/material";

interface CustomHandleProps {
  id: string;
  label: string;
  onChange: (value: number) => void;
  style?: React.CSSProperties;
}

const CustomHandle: React.FC<CustomHandleProps> = ({
  id,
  label,
  onChange,
  style,
}) => {
  const connections = useNodeConnections({
    handleType: "target",
    handleId: id,
  });
  const nodeData = useNodesData(connections?.[0]?.source);

  useEffect(() => {
    onChange(
      nodeData?.data
        ? (nodeData.data.value as { r: number; g: number; b: number }).r
        : 0
    );
  }, [nodeData, onChange]);

  return (
    <Box
      display="flex"
      alignItems="center"
      gap={1}
      sx={{
        position: "absolute",
        ...style,
      }}
    >
      <Handle type="target" position={Position.Left} id={id} />
      <Typography variant="body2" sx={{ paddingLeft: 1 }}>
        {label}
      </Typography>
    </Box>
  );
};

interface ColorPreviewProps {
  id: string;
  data: {
    value: { r: number; g: number; b: number };
  };
}

const ColorPreview: React.FC<ColorPreviewProps> = ({ id, data }) => {
  const { updateNodeData } = useReactFlow();

  return (
    <div
      className="node"
      style={{
        background: data.value
          ? `rgb(${data.value.r}, ${data.value.g}, ${data.value.b})`
          : "rgb(0, 0, 0)",
      }}
    >
      {/* <Box
        display="flex"
        alignItems="center"
        gap={1}
        sx={{
          position: "absolute",
          top: 5,
          left: 0,
        }}
      >
        <Handle
          type="target"
          position={Position.Left}
          id="red"
          style={{ backgroundColor: "green" }}
        />
        <Typography variant="body2" sx={{ paddingLeft: 1 }}>
          {"Red"}
        </Typography>
      </Box>

      <Box
        display="flex"
        alignItems="center"
        gap={1}
        sx={{ backgroundColor: "purple" }}
      >
        <Handle
          type="target"
          position={Position.Left}
          // id={id}
          id="green"
          // label="R"
          style={{ backgroundColor: "green" }}
        />
        <Typography variant="body2">{"Green"}</Typography>
      </Box> */}

     


      <CustomHandle
        id="red"
        label="R"
        style={{
          top: 5,
          left: 0,
        }}
        onChange={(value) => {
          updateNodeData(id, (node) => ({
            value: {
              ...(typeof node?.data?.value === "object" &&
              node?.data?.value !== null
                ? node.data.value
                : { r: 0, g: 0, b: 0 }),
              r: value,
            },
          }));
        }}
      />
      <CustomHandle
        id="green"
        label="G"
        style={{
          top: 55,
          left: 0,
        }}
        onChange={(value) => {
          updateNodeData(id, (node) => ({
            value: {
              ...(typeof node?.data?.value === "object" &&
              node?.data?.value !== null
                ? node.data.value
                : { r: 0, g: 0, b: 0 }),
              r: value,
            },
          }));
        }}
      />
      <CustomHandle
        id="blue"
        label="B"
        style={{
          top: 105,
          left: 0,
        }}
        onChange={(value) => {
          updateNodeData(id, (node) => ({
            value: {
              ...(typeof node?.data?.value === "object" &&
              node?.data?.value !== null
                ? node.data.value
                : { r: 0, g: 0, b: 0 }),
              r: value,
            },
          }));
        }}
      />
      <Handle type="source" position={Position.Right} id="output" />
    </div>
  );

  // return (
  //   <Box
  //     sx={{
  //       backgroundColor: data.value
  //         ? `rgb(${data.value.r}, ${data.value.g}, ${data.value.b})`
  //         : "rgb(0, 0, 0)",
  //       p: 2,
  //       borderRadius: 1,
  //       textAlign: "center",
  //     }}
  //   >
  //     <CustomHandle
  //       id="red"
  //       label="R"
  //       onChange={(value) => {
  //         updateNodeData(id, (node) => ({
  //           value: {
  //             ...(typeof node?.data?.value === "object" &&
  //             node?.data?.value !== null
  //               ? node.data.value
  //               : { r: 0, g: 0, b: 0 }),
  //             r: value,
  //           },
  //         }));
  //       }}
  //     />
  //     <CustomHandle
  //       id="green"
  //       label="G"
  //       onChange={(value) => {
  //         updateNodeData(id, (node) => ({
  //           value: {
  //             ...(typeof node?.data?.value === "object" &&
  //             node?.data?.value !== null
  //               ? node.data.value
  //               : { r: 0, g: 0, b: 0 }),
  //             r: value,
  //           },
  //         }));
  //       }}
  //     />
  //     <CustomHandle
  //       id="blue"
  //       label="B"
  //       onChange={(value) => {
  //         updateNodeData(id, (node) => ({
  //           value: {
  //             ...(typeof node?.data?.value === "object" &&
  //             node?.data?.value !== null
  //               ? node.data.value
  //               : { r: 0, g: 0, b: 0 }),
  //             r: value,
  //           },
  //         }));
  //       }}
  //     />
  //     <Handle type="source" position={Position.Right} id="output" />
  //   </Box>
  // );
};

export default ColorPreview;
