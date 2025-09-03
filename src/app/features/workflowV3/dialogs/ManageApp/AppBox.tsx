import { CSSObject } from "@emotion/react";
import { IconButton, Stack, Typography } from "@mui/material";
import React from "react";
import { INodeSubCategory } from "../../model/NodeData";
import NodeIcon from "../../utils/NodeIcon";

const styles: { [key: string]: React.CSSProperties | CSSObject } = {
  itemContainer: {
    overflow: "hidden",
    padding: "3px 7px",
    width: 60,
    height: 60,
    backgroundColor: "#fff",
    borderRadius: "8px",
    "&:hover": {
      transform: "scale(1.1)",
      backgroundColor: "#DEF3FD",
    },
    border: `1px solid rgba(30, 65, 122, 0.50)`,
  },
  subCatContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
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
};

interface IAppBox {
  id: string;
  onAppClick?: (node: INodeSubCategory) => void;
  node: INodeSubCategory;
  disabled?: boolean;
}

export const AppBox: React.FC<IAppBox> = ({
  id,
  onAppClick,
  node,
  disabled,
}) => {
  return (
    <Stack
      key={id}
      direction="column"
      justifyContent="center"
      alignItems="center"
      sx={styles.itemContainer}
    >
      <IconButton
        disableRipple
        size="small"
        sx={styles.subCatContainer}
        onClick={() => onAppClick(node)}
        disabled={disabled}
      >
        <NodeIcon iconName={node.nodeIcon} iconColor={node.nodeIconColor} />
      </IconButton>
      <Typography sx={styles.subPanelTitle}>{node.nodeLabel}</Typography>
    </Stack>
  );
};
