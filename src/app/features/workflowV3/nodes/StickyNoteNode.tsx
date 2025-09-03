import CheckIcon from "@mui/icons-material/Check";
import EditIcon from "@mui/icons-material/Edit";
import PaletteIcon from "@mui/icons-material/Palette";
import {
  Box,
  Button,
  IconButton,
  Paper,
  Popover,
  Stack,
  TextField,
} from "@mui/material";
import { Node, NodeProps } from "@xyflow/react";
import React, { useMemo, useState } from "react";
import "reactflow/dist/style.css";
import { INodeData } from "../model/NodeData";

import "react-quill/dist/quill.snow.css";
import RichTextEditor from "./RichTextEditor";
import RichTextViewer from "./RichTextViewer";

import { useUpdateNodeInternals } from "@xyflow/react"; // for node update trigger
import { StickyNoteNodeHoverMenu } from "./StickNoteNodeHoverMenu";
import { NodeTypes } from "../enum/NodeTypes";

import { IStyles } from "../model/IStyles";
import "./StickyNoteNode.css";

const colorOptions = [
  { label: "Yellow", value: "#fff59d" },
  { label: "Teal", value: "#b2dfdb" },
  { label: "Pink", value: "#f8bbd0" },
  { label: "Indigo", value: "#c5cae9" },
];

const styles = (): IStyles => ({
  footerContainer: {
    p: 2,
    borderTop: "1px solid #ddd",
    display: "flex",
    justifyContent: "flex-end",
    paddingRight: 0,
  },
  saveButton: {
    textTransform: "capitalize",
    color: "#1E417A",
    backgroundColor: "#ffffff",
    borderColor: "#1E417A",
    border: `1px solid rgba(30, 65, 122, 0.50)`,
    boxShadow: "none",
    "&:hover": { color: "#ffffff !important" },
  },
});

export const StickyNoteNode: React.FC<NodeProps<Node<INodeData>>> = ({
  data,
}) => {
  const [editMode, setEditMode] = useState(false);
  const [text, setText] = useState(data.text);
  const [color, setColor] = useState(data.color || "#fff59d");
  const [hovered, setHovered] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const [isResizing, setIsResizing] = useState(false);

  const updateNodeInternals = useUpdateNodeInternals();

  const defaultStyle = useMemo(() => styles(), []);

  // const [size, setSize] = useState({
  //   width: 200,
  //   height: 100,
  // });

  const [size, setSize] = useState({
    width: 500,
    height: 400,
  });

  const [content, setContent] = useState(
    "<p>Hello <strong>world</strong>!</p>"
  );

  const handleSave = () => {
    // data.onTextChange?.(text);
    // data.onColorChange?.(color);
    setEditMode(false);
  };

  const openColorPicker = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const closeColorPicker = () => {
    setAnchorEl(null);
  };

  const handleColorChange = (newColor: string) => {
    setColor(newColor);
    // data.onColorChange?.(newColor);
    closeColorPicker();
  };

  const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    setIsResizing(true); // Disable dragging

    const startX = e.clientX;
    const startY = e.clientY;
    const startWidth = size.width;
    const startHeight = size.height;

    const onMouseMove = (moveEvent: MouseEvent) => {
      const newWidth = startWidth + (moveEvent.clientX - startX);
      const newHeight = startHeight + (moveEvent.clientY - startY);
      setSize({
        width: Math.max(120, newWidth),
        height: Math.max(80, newHeight),
      });
    };

    const onMouseUp = () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
      setIsResizing(false); // Re-enable dragging
      updateNodeInternals(data.id);
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };

  return (
    <Box
      sx={{ width: size.width, height: size.height }}
      className={isResizing ? "nodrag" : ""}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Paper
        elevation={3}
        sx={{
          backgroundColor: color,
          padding: 1,
          width: size.width,
          height: size.height,
          position: "relative",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        {editMode ? (
          <Box
            className={isResizing ? "nodrag" : ""}
            sx={{
              pointerEvents: "all",
              cursor: "text",
              maxHeight: size.height,
            }}
          >
            <RichTextEditor
              value={content}
              onChange={setContent}
              height={300}
            />

            <Box sx={defaultStyle.footerContainer}>
              <Button
                variant="contained"
                size="small"
                sx={defaultStyle.saveButton}
                onClick={handleSave}
              >
                Save
              </Button>
            </Box>
          </Box>
        ) : (
          <Box
            display="flex"
            flexDirection="column"
            gap={1}
            sx={{ overflowY: "auto", maxHeight: size.height }}
          >
            <RichTextViewer htmlContent={content} />
          </Box>
        )}
        <Popover
          open={!!anchorEl}
          anchorEl={anchorEl}
          onClose={closeColorPicker}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        >
          <Box sx={{ p: 1 }}>
            {colorOptions.map((option) => (
              <Button
                key={option.value}
                onClick={() => handleColorChange(option.value)}
                sx={{
                  backgroundColor: option.value,
                  width: 30,
                  height: 30,
                  minWidth: 0,
                  m: 0.5,
                  border:
                    color === option.value
                      ? "2px solid black"
                      : "1px solid gray",
                }}
              />
            ))}
          </Box>
        </Popover>
        <Box
          onMouseDown={onMouseDown}
          sx={{
            position: "absolute",
            bottom: 4,
            right: 4,
            width: 16,
            height: 16,
            cursor: "nwse-resize",
            backgroundColor: "rgba(0, 0, 0, 0.3)",
            border: "2px solid white",
            borderRadius: "4px",
            zIndex: 10,
          }}
        />
      </Paper>
      <StickyNoteNodeHoverMenu
        isMenuOpen={hovered}
        nodeType={NodeTypes.StickyNote}
        handleColorPallette={openColorPicker}
        handleEdit={() => setEditMode(true)}
      />
    </Box>
  );
};
