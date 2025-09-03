import React, { useMemo } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import { CSSObject } from "@mui/material";
import { getPanelIconByTitle } from "../PipelineIcons";
import { IActivityCategory } from "./NodeFactoryMenu";

interface INodeMenuItem {
  index: number;
  activityCategory: IActivityCategory;
  selectedActivityCategory?: IActivityCategory;
  onClickPanelItem: (activity: IActivityCategory) => void;
}

const styles = (
  selectedActivityCategory: IActivityCategory,
  activityCategory: IActivityCategory
): { [key: string]: React.CSSProperties | CSSObject } => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    backgroundColor:
      selectedActivityCategory?.activityKey === activityCategory.activityKey
        ? "#E3F2FD"
        : "#F9F9F9",
    padding: "2px",
    borderRadius: "8px",
    transition: "all 0.2s ease-in-out",
    "&:hover": {
      transform: "scale(1.1)",
      backgroundColor: "#E3F2FD",
    },
  },
  iconContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%",
    cursor: "grab",
    boxSizing: "border-box",
    textAlign: "center",
  },
  templateName: {
    fontSize: "8px",
    textAlign: "center",
    color: "gray",
    whiteSpace: "normal",
    wordBreak: "break-word",
    overflowWrap: "break-word",
    display: "-webkit-box",
    textOverflow: "ellipsis",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
    maxWidth: "100%",
    lineHeight: 1,
    overflow: "hidden",
  },
  divider: { width: "100%", height: "1px", backgroundColor: "gray" },
});
const NodeMenuItem = ({
  index,
  activityCategory,
  selectedActivityCategory,
  onClickPanelItem,
}: INodeMenuItem) => {
  const defaultStyle = useMemo(
    () => styles(selectedActivityCategory, activityCategory),
    [selectedActivityCategory, activityCategory]
  );

  return (
    <Box
      key={index}
      sx={defaultStyle.container}
      draggable={index === 0 ? true : false}
      onClick={() => {
        onClickPanelItem(activityCategory);
      }}
    >
      <Box sx={defaultStyle.iconContainer}>
        <IconButton size="small" disableRipple>
          {getPanelIconByTitle(activityCategory.activityCategoryIcon)}
        </IconButton>
        <Typography variant="body2" sx={defaultStyle.templateName}>
          {activityCategory.activityCategoryName}
        </Typography>
      </Box>
    </Box>
  );
};

export default NodeMenuItem;
