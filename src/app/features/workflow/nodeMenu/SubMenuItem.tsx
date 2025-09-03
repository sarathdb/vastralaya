import { CSSObject, IconButton, Stack, Typography } from "@mui/material";
import React, { useMemo } from "react";
import { INodeCategory, INodeSubCategory } from "../model/NodeData";
import NodeIcon from "../utils/NodeIcon";
interface ISubMenuItem {
  key: string;
  OnSelectNode: (node: INodeSubCategory) => void;
  node: INodeSubCategory;
  nodeCategory: INodeCategory;
}

const styles = (): { [key: string]: React.CSSProperties | CSSObject } => ({
  itemContainer: {
    overflow: "hidden",
    padding: "3px 7px",
    borderRadius: "8px",
    "&:hover": {
      transform: "scale(1.1)",
      backgroundColor: "#e3f2fd",
    },
  },
  subPanelTitle: {
    fontSize: "x-small",
    textAlign: "center",
    color: "gray",
    whiteSpace: "normal",
    display: "-webkit-box",
    textOverflow: "ellipsis",
    WebkitBoxOrient: "vertical",
    lineHeight: 1,
  },
});

const SubMenuItem = ({
  OnSelectNode,
  node,
  nodeCategory,
  key,
}: ISubMenuItem) => {
  const defaultStyle = useMemo(() => styles(), []);
  return (
    <Stack
      key={key}
      direction="column"
      justifyContent="center"
      alignItems="center"
      sx={defaultStyle.itemContainer}
      onClick={() =>
        OnSelectNode({
          ...node,
          nodeCategoryColor: nodeCategory.nodeCategoryColor,
        })
      }
    >
      <IconButton disableRipple size="small">
        <NodeIcon
          iconName={node.nodeIcon}
          iconColor={nodeCategory.nodeCategoryColor}
        />
      </IconButton>
      <Typography sx={defaultStyle.subPanelTitle}>{node.nodeLabel}</Typography>
    </Stack>
  );
};

export default SubMenuItem;
