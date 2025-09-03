import React from "react";
import { BaseEdge, EdgeProps, getBezierPath, getSmoothStepPath, getStraightPath } from "@xyflow/react";

// Extend EdgeProps to include a type property
interface CustomEdgeProps extends EdgeProps {
  edgeType?: "simplebezier" | "smoothstep" | "straight";
}

const CustomEdge: React.FC<CustomEdgeProps> = (props) => {
  const { id, sourceX, sourceY, targetX, targetY, label, data } = props;
  
  // Get edgeType from data (since it's not in EdgeProps)
  const edgeType = data?.edgeType || "simplebezier";

  let edgePath, labelX, labelY;

  // Select edge type dynamically
  switch (edgeType) {
    case "smoothstep":
      [edgePath, labelX, labelY] = getSmoothStepPath({ sourceX, sourceY, targetX, targetY });
      break;
    case "straight":
      [edgePath, labelX, labelY] = getStraightPath({ sourceX, sourceY, targetX, targetY });
      break;
    default: // "simplebezier" (fallback)
      [edgePath, labelX, labelY] = getBezierPath({ sourceX, sourceY, targetX, targetY });
      break;
  }

  return (
    <>
      <BaseEdge path={edgePath} id={id} />
      {label && (
        <text x={labelX} y={labelY} fill="black" fontSize={12} textAnchor="middle">
          {label}
        </text>
      )}
    </>
  );
};

export default CustomEdge;