import React, { useMemo } from "react";
import { Box, IconButton, Typography } from "@mui/material";
import { CSSObject } from "@mui/material";
import { getSubPanelIconByTitle } from "../PipelineIcons";
import { IActivityConfig } from "./TaskPanel";

interface ISubPanel {
  configItems: IActivityConfig[];
}

const styles = (
  itemsHeight: number
): { [key: string]: React.CSSProperties | CSSObject } => ({
  container: {
    width: "60px",
    maxHeight: "70%",
    height: `${itemsHeight}px`,
    // backgroundColor: "white",
    marginTop: "20px",
    borderTopRightRadius: "10px",
    borderBottomRightRadius: "10px",
    border: "1px solid gray",
    borderLeft: "0px",
    boxSizing: "border-box",
    overflowY: "scroll",
    scrollbarWidth: "none",
    backgroundColor: "white",
  },
  // iconContainer: {
  //   display: "flex",
  //   width: "100%",
  //   height: "60px",
  //   justifyContent: "center",
  //   alignItems: "center",
  //   overflow: "hidden",
  //   flexDirection: "column",
  // },
  iconContainer: {
    display: "grid", // ✅ Use grid layout instead of flex
    gridTemplateColumns: "repeat(auto-fit, minmax(40px, 1fr))", // ✅ Ensures proper icon placement
    // gap: "10px", // ✅ Adds space between icons
    width: "100%",
    // height: "60px",
    height: "45px",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    // padding: "7px",
    paddingLeft: "7px",
    paddingRight: "7px",
    paddingTop: "3px",
    paddingBottom: "3px",
    marginBottom: "5px",
    borderRadius: "8px", // ✅ Matches Panel Item styling
    // backgroundColor: "#f9f9f9",
    // backgroundColor: "green",
  },

  // subPanelTitle: {
  //   font: "Inter",
  //   fontSize: "6px",
  //   whiteSpace: "normal",
  //   wordWrap: "break-word",
  //   textAlign: "center",
  //   color: "gray",
  //   // backgroundColor: "green",
  // },

  subPanelTitle: {
    fontSize: "6px", // ✅ Minimize text size
    textAlign: "center",
    color: "gray",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    maxWidth: "100%", // ✅ Prevent overflow
    // backgroundColor: "blue",
  },
  divider: { width: "100%", height: "1px", backgroundColor: "gray" },
});

const SubPanel = ({ configItems }: ISubPanel) => {
  const itemsHeight = 45 * configItems.length + configItems.length + 1;
  const defaultStyle = useMemo(
    () => styles(itemsHeight),
    [itemsHeight, configItems]
  );
  return (
    <Box
      sx={{
        width: "60px",
        // backgroundColor: "rgba(255, 255, 255, 0.2)", // ✅ Semi-transparent white
        marginTop: "20px",
        borderTopRightRadius: "10px",
        borderBottomRightRadius: "10px",
        border: "1px solid rgba(255, 255, 255, 0.3)", // ✅ Soft border
        borderLeft: "0px",
        boxSizing: "border-box",
        overflowY: "scroll",
        scrollbarWidth: "none",
        backdropFilter: "blur(10px)", // ✅ Frosted glass effect
        WebkitBackdropFilter: "blur(10px)", // ✅ Safari support
        boxShadow: "4px 0px 10px rgba(0, 0, 0, 0.2)", // ✅ Soft shadow for depth
        paddingLeft: "5px",
        paddingRight: "5px",
        paddingTop: "5px",
        paddingBottom: "5px",
        backgroundColor: "white",
      }}
    >
      {configItems.map((config, index) => {
        return (
          <>
            <Box
              key={index}
              sx={[
                defaultStyle.iconContainer,
                // {
                //   borderBottom:
                //     index === configItems.length - 1
                //       ? "unset"
                //       : "1px solid gray",
                // },
              ]}
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

export default SubPanel;
