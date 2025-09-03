import { Stack, Paper } from "@mui/material";
import React, { useCallback, useMemo, useState } from "react";
import NodeMenuItem from "./NodeMenuItem";
import SubMenu from "./SubMenu";
import { CSSObject } from "@mui/material/styles";
import { templates } from "../PipelineIcons";
// import { templates } from "../../workflowV2/utils/PipelineIcons";

export interface IActivityCategory {
  activityKey: string;
  activityCategoryName: string;
  activityCategoryId: number;
  activityCategoryIcon: string;
  activityConfig: IActivity[];
}
export interface IActivity {
  activityOwner: string;
  activityIcon: string;
  activityTemplate: any;
  activityType: string;
  dxpActivityLabel: string;
  dxpTypeLabel: string;
  dxpActivityToolTip: string;
}

export interface IPosition {
  x: number;
  y: number;
}

interface INodeFactoryMenu {
  open: boolean;
  // onClose: () => void;
  onSelect: (activity: IActivity) => void;
  position: IPosition;
}
const styles = (
  position: IPosition
): { [key: string]: React.CSSProperties | CSSObject } => ({
  root: {
    position: "fixed",
    left: position.x + 200,
    top: position.y,
    transform: "translateX(-50%)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    overflowX: "auto",
    overflowY: "hidden",
    backgroundColor: "transparent",
  },
  contentContainer: {
    display: "flex",
    flexDirection: "row",
    height: "100%",
    alignItems: "center",
  },
  menuContainer: {
    padding: "8px 12px",
    backgroundColor: "rgba(255, 255, 255, 0.6)",
    borderRadius: "16px",
    WebkitBackdropFilter: "blur(20px)",
    backdropFilter: "blur(20px)",
    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
    border: "1px solid rgba(0, 0, 0, 0.1)",
    transition: "all 0.3s ease-in-out",
    "&:hover": {
      boxShadow: "0px 6px 16px rgba(0, 0, 0, 0.15)",
    },
  },
  menuContainer1: {
    display: "flex",
    flexDirection: "row",
    gap: 1,
    alignItems: "center",
    padding: "8px 12px", // Add some padding for better spacing
    backgroundColor: "rgba(255, 255, 255, 0.6)", // Semi-transparent white background
    borderRadius: "16px", // Rounded corners for a dock-like appearance
    WebkitBackdropFilter: "blur(20px)", // Blur effect for frosted glass
    backdropFilter: "blur(20px)", // Blur effect for frosted glass
    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)", // Subtle shadow for depth
    border: "1px solid rgba(0, 0, 0, 0.1)", // Light border for contrast
    transition: "all 0.3s ease-in-out",
    "&:hover": {
      boxShadow: "0px 6px 16px rgba(0, 0, 0, 0.15)", // Slightly stronger shadow on hover
    },
  },
});

const NodeFactoryMenu = ({ open, onSelect, position }: INodeFactoryMenu) => {
  const taskTemplates = templates;
  const [selectedActivityCategory, setSelectedActivityCategory] =
    useState<IActivityCategory>(null);
  const defaultStyle = useMemo(() => styles(position), [position]);

  const onClickPanelItem = useCallback(
    (activityCategory: IActivityCategory) => {
      selectedActivityCategory?.activityKey !== activityCategory.activityKey
        ? setSelectedActivityCategory(activityCategory)
        : setSelectedActivityCategory(null);
    },
    [selectedActivityCategory]
  );

  if (!open) return null;

  return (
    <Paper sx={defaultStyle.root} elevation={0}>
      <Stack
        direction="row"
        gap={1}
        alignItems="center"
        sx={defaultStyle.menuContainer}
      >
        {Object.keys(taskTemplates).map((activityCategoryId, index) => {
          return (
            <>
              {taskTemplates[activityCategoryId].activityCategoryId !== 0 && (
                <NodeMenuItem
                  index={index}
                  selectedActivityCategory={selectedActivityCategory}
                  activityCategory={taskTemplates[activityCategoryId]}
                  onClickPanelItem={onClickPanelItem}
                />
              )}
            </>
          );
        })}
      </Stack>
      {selectedActivityCategory && (
        <SubMenu
          activities={selectedActivityCategory.activityConfig}
          OnSelectActivity={onSelect}
        />
      )}
    </Paper>
  );
};

export default React.memo(NodeFactoryMenu);
