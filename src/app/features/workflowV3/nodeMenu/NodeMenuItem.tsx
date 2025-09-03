import { Box, CSSObject, IconButton, Typography } from "@mui/material";
import React, { useMemo } from "react";
import { INodeCategory } from "../model/NodeData";
import NodeIcon from "../utils/NodeIcon";
import { DEFAULT_MENU_ICON_SIZE } from "../utils/NodeIcons";

interface INodeMenuItem {
  nodeCategory: INodeCategory;
  selectedNodeCategory?: INodeCategory;
  onClickPanelItem: (nodeCategory: INodeCategory) => void;
}

const styles = (
  selectedNodeCategory: INodeCategory,
  nodeCategory: INodeCategory
): { [key: string]: React.CSSProperties | CSSObject } => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    backgroundColor:
      selectedNodeCategory?.type === nodeCategory.type ? "#E3F2FD" : "#F9F9F9",
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
    fontSize: "x-small",
    textAlign: "center",
    color: "gray",
    whiteSpace: "normal",
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
  nodeCategory,
  selectedNodeCategory,
  onClickPanelItem,
}: INodeMenuItem) => {
  const defaultStyle = useMemo(
    () => styles(selectedNodeCategory, nodeCategory),
    [selectedNodeCategory, nodeCategory]
  );
  return (
    <Box
      sx={defaultStyle.container}
      onClick={() => {
        onClickPanelItem(nodeCategory);
      }}
    >
      <Box sx={defaultStyle.iconContainer}>
        <IconButton size="small" disableRipple>
          <NodeIcon
            iconName={nodeCategory.nodeCategoryIcon}
            iconColor={nodeCategory.nodeCategoryColor}
            iconSize={DEFAULT_MENU_ICON_SIZE}
          />
        </IconButton>
        <Typography variant="body2" sx={defaultStyle.templateName}>
          {nodeCategory.nodeCategoryName}
        </Typography>
      </Box>
    </Box>
  );
};

export default NodeMenuItem;
