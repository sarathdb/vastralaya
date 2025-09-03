import React, { useState } from "react";
import Draggable from "react-draggable";
import { Divider, IconButton, Tooltip } from "@mui/material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";

interface Props {
  sessionContextSidebarCollapse: boolean;
  setSessionContextSidebarCollapse: (enable: boolean) => void;
  setSidebarWidth: (width: number) => void;
}

export default function Dragger({
  sessionContextSidebarCollapse,
  setSessionContextSidebarCollapse,
  setSidebarWidth,
}: Props) {
  const [dragging, setDragging] = useState(false);

  return (
    <Draggable
      axis="x"
      bounds={{ left: 50, right: 500 }} // Adjust limits as needed
      onDrag={(e, data) => {
        console.log(e);
        setDragging(true);
        setSidebarWidth(data.x); // Update sidebar width dynamically
      }}
      onStop={() => setDragging(false)}
    >
      <Divider orientation="vertical" textAlign="right">
        <Tooltip
          title={sessionContextSidebarCollapse ? "Expand" : "Collapse"}
          placement="top"
          arrow
        >
          <IconButton
            style={{ cursor: dragging ? "grabbing" : "grab" }}
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
              <KeyboardArrowRightIcon color={"primary"} sx={{ padding: 0 }} />
            ) : (
              <KeyboardArrowLeftIcon color={"primary"} sx={{ padding: 0 }} />
            )}
          </IconButton>
        </Tooltip>
      </Divider>
    </Draggable>
  );
}
