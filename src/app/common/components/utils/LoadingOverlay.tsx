// src/app/components/LoadingOverlay.tsx
import { Backdrop, CircularProgress } from "@mui/material";
import React from "react";

interface LoadingOverlayProps {
  loading: boolean;
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ loading }) => {
  if (!loading) return null;

  return (
    <Backdrop
      sx={{
        backgroundColor: "rgba(255, 255, 255, 0.7)", // Light semi-transparent white
        color: "#1976d2", // Keep the text color visible against light background
        zIndex: (theme) => theme.zIndex.drawer + 1,
        position: "absolute",
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
      open={loading}
    >
      <CircularProgress color="primary" />
    </Backdrop>
  );
};

export default LoadingOverlay;
