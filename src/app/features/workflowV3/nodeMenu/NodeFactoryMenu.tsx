import { Paper, Stack } from "@mui/material";
import { CSSObject } from "@mui/material/styles";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
  useRef,
} from "react";
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
  handleClickOutsideMenu: () => void;
}
const styles = (
  position: IPosition
): { [key: string]: React.CSSProperties | CSSObject } => ({
  root1: {
    position: "fixed",
    left: position.x + 13,
    top: position.y + 10,
    transform: "translateX(-50%)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    boxShadow: "0px 4px 10px #1e417a",
    borderRadius: "12px",
  },
  root: {
    flexDirection: "column",
    alignItems: "center",
    boxShadow: "0px 4px 10px #1e417a",
    borderRadius: "12px",
    display: "inline-block",
    width: "fit-content",
    minWidth: 150,
  },

  container: {
    position: "fixed",
    left: position.x - 50,
    top: position.y + 10,
    display: "flex",
    flexDirection: "column",
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
  handleClickOutsideMenu,
}: INodeFactoryMenu) => {
  const [selectedNodeCategory, setSelectedNodeCategory] =
    useState<INodeCategory>(null);
  const panelRef = useRef(null);

  const defaultStyle = useMemo(() => styles(position), [position]);

  const handleClickOutside = (e) => {
    if (!panelRef?.current?.contains(e.target)) {
      handleClickOutsideMenu();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside, {
      capture: true,
    });
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
    <div>
      <Stack sx={defaultStyle.container} ref={panelRef}>
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

        {selectedSubCategory && selectedSubCategory.length > 0 && (
          <SubMenu
            selectedNodeCategory={selectedNodeCategory}
            nodeSubCategories={selectedSubCategory}
            onSelectNode={onSelect}
            position={position}
          />
        )}
      </Stack>
    </div>
  );
};

export default React.memo(NodeFactoryMenu);
