import React from "react";
import { Divider, Typography, TypographyVariant } from "@mui/material";

interface PropertyDisplayProps {
  label: string;
  value: React.ReactNode;
  divider?: boolean;
  valueVariant?: TypographyVariant;
  labelColor?: string;
}

export const PropertyDisplay: React.FC<PropertyDisplayProps> = ({
  label,
  value,
  divider = false,
  valueVariant = "body2",
  labelColor = "text.secondary",
}) => (
  <>
    <Typography variant="caption" color={labelColor}>
      {label}
    </Typography>
    <Typography variant={valueVariant} mt={1}>
      {value}
    </Typography>
    {divider && <Divider sx={{ mt: 0.5 }} />}
  </>
);
