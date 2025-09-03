import React, { useMemo } from "react";
import { Box, IconButton, Typography } from "@mui/material";
import { CSSObject } from "@mui/material";
import { getSubPanelIconByTitle } from "../PipelineIcons";
import { IActivityConfig } from "../leftdocks/TaskPanel";

interface IHSubPanel {
  configItems: IActivityConfig[];
}

const styles = (): { [key: string]: React.CSSProperties | CSSObject } => ({
  container: {
    display: "flex",
    flexDirection: "row",
    borderRadius: "10px",
    border: "1px solid gray",
    boxSizing: "border-box",
    overflowX: "scroll",
    scrollbarWidth: "none",
    backdropFilter: "blur(10px)",
    WebkitBackdropFilter: "blur(10px)",
    paddingLeft: "5px",
    paddingRight: "5px",
    paddingTop: "5px",
    paddingBottom: "5px",
  },
  iconContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    paddingLeft: "7px",
    paddingRight: "7px",
    paddingTop: "3px",
    paddingBottom: "3px",
    marginBottom: "5px",
    borderRadius: "8px",
  },
  subPanelTitle: {
    fontSize: "8px",
    textAlign: "center",
    color: "gray",
    whiteSpace: "normal",
    wordBreak: "break-word",
    overflowWrap: "break-word",
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    // overflow: "hidden",
    textOverflow: "ellipsis",
    // maxWidth: "100%",
    lineHeight: 1,
    // backgroundColor: "green",
  },
  divider: { width: "100%", height: "1px", backgroundColor: "gray" },
});

const HSubPanel = ({ configItems }: IHSubPanel) => {
  const defaultStyle = useMemo(() => styles(), []);
  return (
    <Box sx={defaultStyle.container}>
      {configItems.map((config, index) => {
        return (
          <>
            <Box
              key={index}
              sx={[defaultStyle.iconContainer]}
              draggable={true}
              onDragStart={(e) => {
                e.dataTransfer.setData(
                  "Task",
                  JSON.stringify({ activityConfig: config })
                );
              }}
            >
              <IconButton
                disableRipple
                size="small"
                sx={{ marginBottom: "0px" }}
              >
                {getSubPanelIconByTitle(config.activityIcon)}
              </IconButton>
              <Typography sx={defaultStyle.subPanelTitle}>
                {config.dxpActivityLabel}
              </Typography>
            </Box>
          </>
        );
      })}
    </Box>
  );
};

export default HSubPanel;
