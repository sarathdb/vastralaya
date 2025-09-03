import { SwapHoriz } from "@mui/icons-material";
import { Button } from "@mui/material";
import React from "react";

interface ICustomControl {
  toggleHorizontal: React.Dispatch<React.SetStateAction<boolean>>;
  isHorizontal: boolean;
}

export const CustomControl: React.FC<ICustomControl> = ({
  toggleHorizontal,
  isHorizontal,
}) => {
  return (
    <Button
      sx={{ minWidth: "unset", padding: 0, color: "#000" }}
      onClick={() => toggleHorizontal(!isHorizontal)}
    >
      <SwapHoriz />
    </Button>
  );
};
