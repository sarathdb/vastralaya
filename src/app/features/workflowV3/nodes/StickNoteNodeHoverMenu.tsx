import DeleteIcon from "@mui/icons-material/Delete";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import FolderDeleteIcon from "@mui/icons-material/FolderDelete";
import MergeIcon from "@mui/icons-material/Merge";
import { IconButton, Stack, Tooltip } from "@mui/material";
import React, { useMemo } from "react";
import { NodeTypes } from "../enum/NodeTypes";
import CheckIcon from "@mui/icons-material/Check";
import EditIcon from "@mui/icons-material/Edit";
import PaletteIcon from "@mui/icons-material/Palette";

interface IStickyNoteNodeHoverMenu {
  handleColorPallette?: (event: React.MouseEvent) => void;
  handleEdit?: (event: React.MouseEvent) => void;

  isMenuOpen: boolean;
  nodeType?: string;
}

const defaultStyles = (isMenuOpen: boolean) => {
  return {
    hoverMenu: {
      borderRadius: "16px",
      // backgroundColor: '#fff',
      display: isMenuOpen ? "flex" : "none",
      flexDirection: "row",
      alignItems: "center",
    },
  };
};

export const StickyNoteNodeHoverMenu: React.FC<IStickyNoteNodeHoverMenu> = ({
  isMenuOpen,
  handleColorPallette,
  handleEdit,
}) => {
  const styles = useMemo(() => defaultStyles(isMenuOpen), [isMenuOpen]);
  return (
    <Stack sx={styles.hoverMenu}>
      {handleColorPallette && (
        <Tooltip title="Color Picker">
          <IconButton size="small" onClick={handleColorPallette}>
            <PaletteIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      )}

      {handleColorPallette && (
        <Tooltip title="Edit">
          <IconButton size="small" onClick={handleEdit}>
            <EditIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      )}
    </Stack>
  );
};
