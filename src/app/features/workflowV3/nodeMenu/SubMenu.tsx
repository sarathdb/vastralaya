import { CSSObject, Paper, Stack } from "@mui/material";
import React, { useMemo } from "react";
import { INodeCategory, INodeSubCategory, IPosition } from "../model/NodeData";
import SubMenuItem from "./SubMenuItem";
import { NodeTypes } from "../enum/NodeTypes";
interface ISubMenu {
  nodeSubCategories: INodeSubCategory[];
  selectedNodeCategory: INodeCategory;
  onSelectNode: (node: INodeSubCategory) => void;
  position: IPosition;
}

const styles = (
  position: IPosition
): { [key: string]: React.CSSProperties | CSSObject } => ({
  root: {
    scrollbarWidth: "none",
    transition: "all 0.3s ease-in-out",
  },
  subMenu1: {
    position: "fixed",
    left: position.x + 200,
    top: position.y + 100,
    transform: "translateX(-50%)",
    boxShadow: "0px 4px 10px #1e417a",
    borderRadius: "12px",
    padding: "8px 12px",
    background: "white",
    overflowY: "auto",
  },
  subMenu: {
    boxShadow: "0px 4px 10px #1e417a",
    borderRadius: "12px",
    padding: "8px 12px",
    background: "white",
    overflowY: "auto",
    display: "inline-block",
    width: "fit-content",
    minWidth: 150,
    marginTop: "5px",
  },
});

const SubMenu = ({
  nodeSubCategories,
  selectedNodeCategory,
  onSelectNode,
  position,
}: ISubMenu) => {
  const defaultStyle = useMemo(() => styles(position), [position]);
  return (
    <Paper sx={defaultStyle.subMenu} elevation={0}>
      <Stack
        direction="row"
        gap={1}
        justifyContent="center"
        alignItems="center"
        sx={defaultStyle.root}
      >
        {nodeSubCategories
          .filter(
            (node) =>
              node.nodeType !== NodeTypes.SwitchEnd &&
              node.nodeType !== NodeTypes.Join
          )
          .map((node, index) => (
            <SubMenuItem
              key={`${selectedNodeCategory?.type}- ${node.nodeName}-${index}`}
              OnSelectNode={onSelectNode}
              node={node}
            />
          ))}
      </Stack>
    </Paper>
  );
};

export default React.memo(SubMenu);
