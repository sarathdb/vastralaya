import { CSSObject, Paper, Stack } from "@mui/material";
import React, { useMemo } from "react";
import { INodeCategory, INodeSubCategory, IPosition } from "../model/NodeData";
import SubMenuItem from "./SubMenuItem";
interface ISubMenu {
  nodeSubCategories: INodeSubCategory[];
  selectedNodeCategory: INodeCategory;
  onSelectNode: (node: INodeSubCategory) => void;
  position: IPosition;
}

const styles = (): { [key: string]: React.CSSProperties | CSSObject } => ({
  root: {
    scrollbarWidth: "none",
    transition: "all 0.3s ease-in-out",
    // backgroundColor: "red",
  },
  subMenu: {
    boxShadow: "0px 4px 10px #1e417a",
    borderRadius: "12px",
    padding: "8px 12px",
    background: "white",
    overflowY: "auto",
    display: "inline-block", // This makes Paper shrink-to-fit content
    width: "fit-content", // Ensures the width adapts to child elements
    minWidth: 150,
    marginTop: "5px",
    // backgroundColor: "blue",
  },
});

const SubMenu = ({
  nodeSubCategories,
  selectedNodeCategory,
  onSelectNode,
}: ISubMenu) => {
  const defaultStyle = useMemo(() => styles(), []);
  return (
    <Paper sx={[defaultStyle.subMenu]} elevation={0}>
      <Stack direction="row" gap={1} sx={defaultStyle.root}>
        {nodeSubCategories.map((node, index) => (
          <SubMenuItem
            key={`${selectedNodeCategory?.type}- ${node.nodeName}-${index}`}
            OnSelectNode={onSelectNode}
            node={node}
            nodeCategory={selectedNodeCategory}
          />
        ))}
      </Stack>
    </Paper>
  );
};

export default React.memo(SubMenu);
