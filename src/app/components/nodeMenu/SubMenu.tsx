import React, { useMemo } from "react";
import { Stack, IconButton, Tooltip, Typography } from "@mui/material";
import { CSSObject } from "@mui/material";
import { getSubPanelIconByTitle } from "../PipelineIcons";
import { IActivity } from "./NodeFactoryMenu";

interface ISubMenu {
  activities: IActivity[];
  OnSelectActivity: (activity: IActivity) => void;
}

const styles = (): { [key: string]: React.CSSProperties | CSSObject } => ({
  root: {
    borderRadius: "12px",
    boxSizing: "border-box",
    scrollbarWidth: "none",
    backdropFilter: "blur(20px)",
    WebkitBackdropFilter: "blur(20px)",
    padding: "8px 12px",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    border: "1px solid rgba(255, 255, 255, 0.3)",
    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
    marginTop: "8px",
    transition: "all 0.3s ease-in-out",
    "&:hover": {
      boxShadow: "0px 6px 16px rgba(0, 0, 0, 0.15)",
    },
  },
  itemContainer: {
    overflow: "hidden",
    padding: "3px 7px",
    borderRadius: "8px",
    "&:hover": {
      transform: "scale(1.1)",
    },
  },
  subPanelTitle: {
    fontSize: "8px",
    textAlign: "center",
    color: "gray",
    whiteSpace: "normal",
    wordBreak: "break-word",
    overflowWrap: "break-word",
    display: "-webkit-box",
    textOverflow: "ellipsis",
    WebkitBoxOrient: "vertical",
    lineHeight: 1,
  },
});

const SubMenu = ({ activities, OnSelectActivity }: ISubMenu) => {
  const defaultStyle = useMemo(() => styles(), []);
  return (
    <Stack
      direction="row" 
      gap={1} 
      justifyContent="center"
      alignItems="center"
      sx={defaultStyle.root}
    >
      {activities.map((config, index) => (
        <Stack
          key={index}
          direction="column"
          justifyContent="center"
          alignItems="center"
          sx={defaultStyle.itemContainer}
          onClick={() => OnSelectActivity(config)}
        >
          <Tooltip title={config.dxpActivityLabel} placement="top">
            <IconButton disableRipple size="small">
              {getSubPanelIconByTitle(config.activityIcon, 25)}
            </IconButton>
          </Tooltip>
          <Typography sx={defaultStyle.subPanelTitle}>
            {config.dxpActivityLabel}
          </Typography>
        </Stack>
      ))}
    </Stack>
  );
};

export default React.memo(SubMenu);
