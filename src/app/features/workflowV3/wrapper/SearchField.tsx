import React from "react";

import { Box, TextField, IconButton } from "@mui/material";
import { ClearIcon } from "@mui/x-date-pickers";
import SearchIcon from "@mui/icons-material/Search";

interface Props {
  placeholder: string;
  value: string;
  handleSearch: (key: string) => void;
}

const SearchField = ({ placeholder, value, handleSearch }: Props) => {
  return (
    <Box
      sx={{
        padding: "10px",
        justifyContent: "left",
      }}
    >
      <TextField
        variant="standard"
        placeholder={placeholder}
        value={value}
        onChange={(event) => {
          handleSearch(event.target.value);
        }}
        InputProps={{
          startAdornment: <SearchIcon fontSize="small" />,
          endAdornment: (
            <IconButton
              title="Clear"
              aria-label="Clear"
              size="small"
              style={{
                visibility: "visible",
                border: "none",
                borderRadius: "100%",
                boxSizing: "border-box",
              }}
              onClick={() => {
                handleSearch("");
              }}
            >
              <ClearIcon fontSize="small" />
            </IconButton>
          ),
        }}
        sx={{
          float: "center",
          width: {
            xs: 1,
            sm: "auto",
          },
          m: (theme) => theme.spacing(1, 0.5, 1.5),
          "& .MuiSvgIcon-root": {
            mr: 0.5,
          },
          "& .MuiInput-underline:before": {
            borderBottom: 1,
            borderColor: "divider",
          },
        }}
      />
    </Box>
  );
};

export default React.memo(SearchField);
