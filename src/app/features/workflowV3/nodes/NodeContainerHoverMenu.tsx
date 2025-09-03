import DeleteIcon from "@mui/icons-material/Delete";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import FolderDeleteIcon from "@mui/icons-material/FolderDelete";
import { IconButton, Stack, Tooltip } from "@mui/material";
import React, { useMemo } from "react";

interface INodeContainerHoverMenu {
  handleDelete: (event: React.MouseEvent) => void;
  handleDeleteWithChildren: (event: React.MouseEvent) => void;
  handleRename: (event: React.MouseEvent) => void;
  isMenuOpen: boolean;
}

const defaultStyles = (isMenuOpen: boolean) => {
  return {
    hoverMenu: {
      borderRadius: "16px",
      backgroundColor: "#fff",
      display: isMenuOpen ? "flex" : "none",
      flexDirection: "row",
      alignItems: "center",
    },
  };
};

export const NodeContainerHoverMenu: React.FC<INodeContainerHoverMenu> = ({
  isMenuOpen,
  handleDelete,
  handleRename,
  handleDeleteWithChildren,
}) => {
  const styles = useMemo(() => defaultStyles(isMenuOpen), [isMenuOpen]);
  return (
    <Stack sx={styles.hoverMenu}>
      <Tooltip title="Delete">
        <IconButton size="small" onClick={handleDelete}>
          <DeleteIcon fontSize="small" />
        </IconButton>
      </Tooltip>
      <Tooltip title="Delete with children">
        <IconButton size="small" onClick={handleDeleteWithChildren}>
          <FolderDeleteIcon fontSize="small" />
        </IconButton>
      </Tooltip>
      <Tooltip title="Rename">
        <IconButton size="small" onClick={handleRename}>
          <DriveFileRenameOutlineIcon fontSize="small" />
        </IconButton>
      </Tooltip>
    </Stack>
  );
};
