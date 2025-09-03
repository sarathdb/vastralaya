import { SvgIcon, SvgIconProps } from "@mui/material";
import React from "react";

interface SvgRendererProps extends SvgIconProps {
  svg: string;
}

const extractViewBox = (svg: string) => {
  const viewBoxMatch = svg?.match(/viewBox="([^"]+)"/);
  if (viewBoxMatch) return viewBoxMatch[1];

  const widthMatch = svg?.match(/width="([^"]+)"/);
  const heightMatch = svg?.match(/height="([^"]+)"/);
  if (widthMatch && heightMatch)
    return `0 0 ${widthMatch[1]} ${heightMatch[1]}`;

  return "0 0 24 24"; // Default fallback
};

const SvgRenderer: React.FC<SvgRendererProps> = ({ svg, ...props }) => {
  return (
    <SvgIcon
      fontSize="large"
      color="primary"
      sx={{ objectFit: "contain" }}
      {...props}
      viewBox={extractViewBox(svg)}
    >
      <g dangerouslySetInnerHTML={{ __html: svg }} />
    </SvgIcon>
  );
};

export default SvgRenderer;
