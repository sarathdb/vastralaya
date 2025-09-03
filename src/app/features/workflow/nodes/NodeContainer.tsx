import AddIcon from "@mui/icons-material/Add";
import { Box, IconButton, Stack } from "@mui/material";
import React, { useMemo, useState } from "react";
import { useWorkflowContext } from "../context/WorkflowContext";
import { INodeData } from "../model/NodeData";
import { LabelInput } from "./LabelInput";
import { NodeContainerHoverMenu } from "./NodeContainerHoverMenu";
import { NodeFactory } from "./NodeFactory";

interface INodeFactory {
  id: string;
  data: INodeData;
  type: string;
}

const defaultStyles = (isHorizontal: boolean) => {
  return {
    root: {
      flexDirection: isHorizontal ? "column" : "row",
    },
    addIconStyle: {
      position: "absolute",
      // bottom: isHorizontal ? "10px" : "-40px",
      // left: isHorizontal ? "120%" : "50%",
      bottom: isHorizontal ? "20px" : "-40px",
      left: isHorizontal ? "115%" : "50%",
      transform: "translateX(-50%)",
      background: "#fff",
      border: "1px solid #ddd",
      "&:hover": {
        background: "#f0f0f0",
      },
    },
    menuStack: {
      flexDirection: "row",
      alignItem: "center",
    },
  };
};

export const NodeContainer: React.FC<INodeFactory> = ({ id, data, type }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLabelInputOpen, toggleLabelInputLabel] = useState(false);
  const styles = useMemo(
    () => defaultStyles(data.isHorizontal),
    [data.isHorizontal]
  );
  const { onDeleteNode, onAddAction, onDeleteNodeWithChildren, onRenameNode } =
    useWorkflowContext();

  const handleAddClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    const rect = event.currentTarget.getBoundingClientRect();
    onAddAction(id, { x: rect.left, y: rect.bottom });
  };

  const handleDelete = (event: React.MouseEvent) => {
    event.stopPropagation();
    onDeleteNode(id);
  };

  const handleDeleteWithChildren = (event: React.MouseEvent) => {
    event.stopPropagation();
    onDeleteNodeWithChildren(id);
  };

  const handleRename = (event: React.MouseEvent) => {
    event.stopPropagation();
    toggleLabelInputLabel((prev) => !prev);
  };

  const handleRenameUtils = (newLabel: string) => {
    onRenameNode(newLabel, id);
    toggleLabelInputLabel(false);
  };

  return (
    <Stack
      sx={styles.root}
      onMouseEnter={() => setMenuOpen(true)}
      onMouseLeave={() => setMenuOpen(false)}
    >
      <Box sx={{ position: "relative" }}>
        <NodeFactory id={id} data={data} type={type} />

        {/**  Add Button  */}
        <IconButton
          size="small"
          onClick={handleAddClick}
          sx={styles.addIconStyle}
        >
          <AddIcon fontSize="small" />
        </IconButton>
        {/* {!data.readonly && data.isEndNode && !isLabelInputOpen && (
          <IconButton
            size="small"
            onClick={handleAddClick}
            sx={styles.addIconStyle}
          >
            <AddIcon fontSize="small" />
          </IconButton>
        )} */}
      </Box>
      {!data.readonly && (
        <Stack sx={styles.menuStack}>
          {isLabelInputOpen ? (
            <LabelInput
              onSubmit={handleRenameUtils}
              preset={data.nodeLabel}
              toggleLabelInputLabel={toggleLabelInputLabel}
            />
          ) : (
            <NodeContainerHoverMenu
              handleDelete={handleDelete}
              handleDeleteWithChildren={handleDeleteWithChildren}
              handleRename={handleRename}
              isMenuOpen={menuOpen}
            />
          )}
        </Stack>
      )}
    </Stack>
  );
};
