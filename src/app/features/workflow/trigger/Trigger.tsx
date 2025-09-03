import AddIcon from "@mui/icons-material/Add";
import { Button, Tooltip } from "@mui/material";
import React from "react";

export interface ITrigger {
  onAddTrigger: () => void;
  position: { x: number; y: number };
}

export const Trigger: React.FC<ITrigger> = ({ onAddTrigger, position }) => {
  return (
    <>
      <Tooltip title={"Add a trigger which will start this workflow"} arrow>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={onAddTrigger}
          sx={{
            position: "absolute",
            top: position.y,
            left: position.x,
            transform: "translate(-50%, -50%)",
          }}
        >
          Add trigger
        </Button>
      </Tooltip>
    </>
  );
};
