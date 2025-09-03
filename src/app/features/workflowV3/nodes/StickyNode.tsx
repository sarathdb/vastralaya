import React from "react";
import CheckIcon from "@mui/icons-material/Check";
import EditIcon from "@mui/icons-material/Edit";
import PaletteIcon from "@mui/icons-material/Palette";
import {
  Box,
  Button,
  IconButton,
  Paper,
  Popover,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { Node } from "@xyflow/react";
// import { ResizableBox } from 'react-resizable';

import { NodeProps, useUpdateNodeInternals } from "@xyflow/react";
import { INodeData } from "../model/NodeData";

const colorOptions = [
  { label: "Yellow", value: "#fff59d" },
  { label: "Teal", value: "#b2dfdb" },
  { label: "Pink", value: "#f8bbd0" },
  { label: "Indigo", value: "#c5cae9" },
];

const StickyNode: React.FC<NodeProps<Node<INodeData>>> = ({ id, data }) => {
  const [text, setText] = useState(data.text);
  const [color, setColor] = useState(data.color || "#fff59d");
  const [editMode, setEditMode] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [resizing, setResizing] = useState(false);

  const [size, setSize] = useState({
    width: 200,
    height: 100,
  });

  const updateNodeInternals = useUpdateNodeInternals();

  const handleResize = (
    _: unknown,
    data: { size: { width: number; height: number } }
  ) => {
    // setWidth(data.size.width);
    // setHeight(data.size.height);
    setSize({ width: data.size.width, height: data.size.height });
    updateNodeInternals(id); // 🔥 tells React Flow to recompute layout
  };

  // const [resizing, setResizing] = useState(false);
  // const updateNodeInternals = useUpdateNodeInternals();

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

  const startResize = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setResizing(true);

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
      updateNodeInternals(id);
    };

    const onMouseUp = () => {
      setResizing(false);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      updateNodeInternals(id);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  };

  return (
    <Paper
      elevation={3}
      sx={{
        width: size.width,
        height: size.height,
        backgroundColor: color,
        padding: 1,
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        zIndex: 1, // 👍 ensures it shows above edges
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {editMode ? (
        <Box>
          <TextField
            fullWidth
            multiline
            variant="standard"
            value={text}
            onChange={(e) => setText(e.target.value)}
            sx={{ backgroundColor: "transparent" }}
          />
          <Button
            startIcon={<CheckIcon />}
            onClick={handleSave}
            fullWidth
            sx={{ mt: 1 }}
          >
            Save
          </Button>
        </Box>
      ) : (
        <Box display="flex" flexDirection="column" gap={1}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <IconButton size="small" onClick={() => setEditMode(true)}>
                <EditIcon fontSize="small" />
              </IconButton>
              {/* <IconButton size="small" onClick={() => data.onDelete?.(id)}>
                <DeleteIcon fontSize="small" />
              </IconButton> */}
            </Box>
          </Box>
        </Box>
      )}

      {hovered && (
        <IconButton
          size="small"
          sx={{ position: "absolute", top: 4, right: 4 }}
          onClick={openColorPicker}
        >
          <PaletteIcon fontSize="small" />
        </IconButton>
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
                  color === option.value ? "2px solid black" : "1px solid gray",
              }}
            />
          ))}
        </Box>
      </Popover>

      <Box
        onMouseDown={startResize}
        sx={{
          position: "absolute",
          bottom: 0,
          right: 0,
          width: 14,
          height: 14,
          cursor: "nwse-resize",
          backgroundColor: "rgba(0, 0, 0, 0.3)",
          borderRadius: 1,
        }}
      />
    </Paper>
  );
};

export default StickyNode;
