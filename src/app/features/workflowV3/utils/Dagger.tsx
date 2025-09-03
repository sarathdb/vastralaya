import { Divider, IconButton, Tooltip } from "@mui/material";
import React from "react";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";

interface Props {
  sessionContextSidebarCollapse: boolean;
  setSessionContextSidebarCollapse: (enable: boolean) => void;
}

export default function Dragger({
  sessionContextSidebarCollapse,
  setSessionContextSidebarCollapse,
}: Props) {
  return (
    <Divider orientation="vertical" textAlign="right">
      <Tooltip
        title={sessionContextSidebarCollapse ? "Collapse" : "Expand"}
        placement="top"
        arrow
      >
        <IconButton
          style={{ cursor: "pointer" }}
          sx={{
            color: "#A3A7A9",
            border: "solid 1px",
            scale: "70%",
          }}
          size="small"
          color="inherit"
          onClick={() =>
            setSessionContextSidebarCollapse(!sessionContextSidebarCollapse)
          }
        >
          {sessionContextSidebarCollapse ? (
            <KeyboardArrowLeftIcon color={"primary"} sx={{ padding: 0 }} />
          ) : (
            <KeyboardArrowRightIcon color={"primary"} sx={{ padding: 0 }} />
          )}
        </IconButton>
      </Tooltip>
    </Divider>
  );
}
