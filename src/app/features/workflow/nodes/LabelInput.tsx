import { Cancel, CheckCircle } from "@mui/icons-material";
import BackspaceIcon from "@mui/icons-material/Backspace";
import { Box, IconButton, TextField } from "@mui/material";
import React, { useState } from "react";

interface ILabelInput {
  onSubmit: (value: string) => void;
  preset: string;
  toggleLabelInputLabel: React.Dispatch<React.SetStateAction<boolean>>;
}

export const LabelInput: React.FC<ILabelInput> = ({
  onSubmit,
  preset,
  toggleLabelInputLabel,
}) => {
  const [value, setValue] = useState(preset);

  const handleOkClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    if (value.trim()) {
      onSubmit(value);
    }
  };

  const handleCancelClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    setValue("");
  };

  const handleCloseClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    toggleLabelInputLabel(false);
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      gap={1}
      sx={{ padding: "0 5px 5px 5px" }}
    >
      <TextField
        variant="outlined"
        size="small"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Enter node label"
        onClick={(event) => event.stopPropagation()}
      />
      <IconButton color="primary" onClick={handleOkClick}>
        <CheckCircle />
      </IconButton>
      <IconButton onClick={handleCancelClick}>
        <BackspaceIcon />
      </IconButton>
      <IconButton onClick={handleCloseClick}>
        <Cancel />
      </IconButton>
    </Box>
  );
};
