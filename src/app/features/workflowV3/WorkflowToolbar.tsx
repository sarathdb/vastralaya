import BoltIcon from "@mui/icons-material/Bolt";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import SettingsIcon from "@mui/icons-material/Settings";
import RefreshIcon from "@mui/icons-material/Refresh";
import {
  CSSObject,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useMemo, useState } from "react";
import { INodeCategory } from "./model/NodeData";
import NodeIcon from "./utils/NodeIcon";
import MenuIcon from "@mui/icons-material/MenuOutlined";

import { WorkflowTypes } from "./enum/MenuTypes";

interface IStyles {
  [key: string]: React.CSSProperties | CSSObject;
}

const styles = (): IStyles => ({
  root: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    p: 1,
    position: "relative",
  },
  saveButton: { bgcolor: "#1C3D6C", "&:hover": { bgcolor: "#162F50" } },
  moreIconButton: {
    bgcolor: "rgba(0, 0, 0, 0.1)",
    borderRadius: "50%",
    width: 40,
    height: 40,
  },
  viewSwitcherContainer: {
    position: "absolute",
    left: "50%",
    transform: "translate(-50%)",
  },
  viewSwitcher: {
    backgroundColor: "#FFFFFF",
    borderRadius: "8px",
    overflow: "hidden",
    boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.2)",
  },
  toggleButton: {
    textTransform: "none",
    border: "none",
    "&.Mui-selected": { backgroundColor: "#E3F2FD" },
  },
  toggleIcon: { fontSize: 16, marginRight: 0.5 },
});

interface IWorkflowToolbar {
  handleSaveWorkflow: () => void;
  handleSwitcher: (switchValue: string) => void;
  handleExecutionMenu: () => void;
  handleRefresh: () => void;
  viewType: string;
  onSettingsMenuItemSelect: (menuItem: string) => void;
  isReadOnly: boolean;
  nodeCategory: INodeCategory[];
}

const WorkflowToolbar = ({
  handleSaveWorkflow,
  handleSwitcher,
  handleRefresh,
  viewType,
  onSettingsMenuItemSelect,
  nodeCategory,
  isReadOnly,
  handleExecutionMenu,
}: IWorkflowToolbar) => {
  const [settingsAnchorEl, setSettingsAnchorEl] = useState(null);

  const openSettings = Boolean(settingsAnchorEl);

  const defaultStyles = useMemo(() => styles(), []);

  const handleSettingsMenuOpen = (event) => {
    setSettingsAnchorEl(event.currentTarget);
  };

  const handleSettingsMenuClose = (selectedItem) => {
    setSettingsAnchorEl(null);
    if (selectedItem) {
      onSettingsMenuItemSelect(selectedItem);
    }
  };
  return (
    <Stack sx={defaultStyles.root}>
      <Stack sx={defaultStyles.viewSwitcherContainer}>
        <ToggleButtonGroup
          value={viewType}
          exclusive
          onChange={(_, newValue) => {
            if (newValue) {
              handleSwitcher(newValue);
            }
          }}
          sx={defaultStyles.viewSwitcher}
        >
          <ToggleButton
            value={WorkflowTypes.EDITOR}
            sx={defaultStyles.toggleButton}
          >
            <EditIcon sx={defaultStyles.toggleIcon} />
            {WorkflowTypes.EDITOR}
          </ToggleButton>

          <ToggleButton
            value={WorkflowTypes.EXECUCTIONS}
            sx={defaultStyles.toggleButton}
          >
            <BoltIcon sx={defaultStyles.toggleIcon} />
            {WorkflowTypes.EXECUCTIONS}
          </ToggleButton>
        </ToggleButtonGroup>
      </Stack>
      <Stack direction="row" alignItems="center" gap={1}>
        {isReadOnly && (
          <Tooltip title="Refresh">
            <IconButton
              size="small"
              sx={defaultStyles.moreIconButton}
              onClick={handleRefresh}
            >
              <RefreshIcon />
            </IconButton>
          </Tooltip>
        )}
        <Tooltip title="Save Workflow">
          <IconButton
            size="small"
            sx={defaultStyles.moreIconButton}
            onClick={handleSaveWorkflow}
          >
            <SaveIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Settings">
          <IconButton
            size="small"
            sx={defaultStyles.moreIconButton}
            onClick={handleSettingsMenuOpen}
          >
            <SettingsIcon />
          </IconButton>
        </Tooltip>

        {isReadOnly && (
          <Tooltip title="Executions Menu">
            <IconButton
              size="small"
              sx={defaultStyles.moreIconButton}
              onClick={handleExecutionMenu}
            >
              <MenuIcon />
            </IconButton>
          </Tooltip>
        )}

        <Menu
          anchorEl={settingsAnchorEl}
          open={openSettings}
          onClose={() => handleSettingsMenuClose(null)}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          {nodeCategory?.map((item) => (
            <MenuItem
              key={item.type}
              onClick={() => handleSettingsMenuClose(item.type)}
              sx={{ gap: 1 }}
            >
              <NodeIcon
                iconName={item.nodeCategoryIcon}
                iconColor={item.nodeCategoryColor}
              />
              <Typography sx={{ fontSize: "small" }}>
                {item.nodeCategoryName}
              </Typography>
            </MenuItem>
          ))}
        </Menu>
      </Stack>
    </Stack>
  );
};

export default WorkflowToolbar;
