import { Paper, Stack, Box } from "@mui/material";
import { CSSObject } from "@mui/material/styles";
import React, { useCallback, useMemo, useState } from "react";
import { INodeCategory, INodeSubCategory, IPosition } from "../model/NodeData";
import NodeMenuItem from "./NodeMenuItem";
import SubMenu from "./SubMenu";

interface INodeFactoryMenu {
  open: boolean;
  onClose: () => void;
  onSelect: (node: INodeSubCategory) => void;
  position: IPosition;
  nodeCategories: INodeCategory[];
  nodeSubCategories: INodeSubCategory[];
}
const styles = (): { [key: string]: React.CSSProperties | CSSObject } => ({
  root: {
    // position: "fixed",
    // left: position.x + 13,
    // top: position.y + 10,
    // transform: "translateX(-50%)",
    // display: "flex",
    flexDirection: "column",
    alignItems: "center",
    boxShadow: "0px 4px 10px #1e417a",
    borderRadius: "12px", // Adjust the value as needed
    // backgroundColor: "orange",
    display: "inline-block", // This makes Paper shrink-to-fit content
    width: "fit-content", // Ensures the width adapts to child elements
    minWidth: 150,
  },

  menuContainer: {
    padding: "8px 12px",
    transition: "all 0.3s ease-in-out",
    "&:hover": {
      boxShadow: "0px 6px 16px rgba(0, 0, 0, 0.15)",
    },
  },
});

const NodeFactoryMenu = ({
  open,
  onSelect,
  position,
  nodeCategories,
  nodeSubCategories,
}: INodeFactoryMenu) => {
  const [selectedNodeCategory, setSelectedNodeCategory] =
    useState<INodeCategory>(null);

  const defaultStyle = useMemo(() => styles(), []);

  const onClickPanelItem = useCallback(
    (nodeCategory: INodeCategory) => {
      selectedNodeCategory?.type !== nodeCategory.type
        ? setSelectedNodeCategory(nodeCategory)
        : setSelectedNodeCategory(null);
    },
    [selectedNodeCategory]
  );

  const selectedSubCategory = useMemo((): INodeSubCategory[] => {
    if (selectedNodeCategory === null) return null;
    return nodeSubCategories.filter(
      (e) => e?.nodeCategoryType === selectedNodeCategory.type
    );
  }, [nodeSubCategories, selectedNodeCategory]);

  if (!open) return null;

  return (
    <div style={{ backgroundColor: "green" }}>
      <Box
        sx={{
          position: "fixed",
          left: position.x + 13,
          top: position.y + 10,
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Paper sx={defaultStyle.root} elevation={0}>
          <Stack
            direction="row"
            gap={1}
            alignItems="center"
            sx={defaultStyle.menuContainer}
          >
            {nodeCategories.map((category, index) => {
              return (
                <NodeMenuItem
                  key={`${category.type}-${index}`}
                  selectedNodeCategory={selectedNodeCategory}
                  nodeCategory={category}
                  onClickPanelItem={onClickPanelItem}
                />
              );
            })}
          </Stack>
        </Paper>

        {selectedSubCategory && (
          <SubMenu
            selectedNodeCategory={selectedNodeCategory}
            nodeSubCategories={selectedSubCategory}
            onSelectNode={onSelect}
            position={position}
          />
        )}
      </Box>
    </div>
  );
};

export default React.memo(NodeFactoryMenu);
