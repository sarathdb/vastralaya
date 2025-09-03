import { Button, Stack } from "@mui/material";
import React from "react";

export const HorizontalMenu: React.FC<{
  options: { label: string; icon: React.ReactNode; onClick: () => void }[];
}> = ({ options }) => (
  <Stack style={{ display: "flex", justifyContent: "center", padding: "10px" }}>
    {options.map((option, index) => (
      <Button
        key={index}
        onClick={option.onClick}
        startIcon={option.icon}
        sx={{ mx: 1 }}
      >
        {option.label}
      </Button>
    ))}
  </Stack>
);
