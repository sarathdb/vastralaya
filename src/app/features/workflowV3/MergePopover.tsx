import React, { useMemo, useState } from "react";
import {
  Box,
  Button,
  Popover,
  TextField,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Checkbox,
} from "@mui/material";
import { Node } from "@xyflow/react";
import DeviceHubIcon from "@mui/icons-material/DeviceHub"; // Example node icon

interface IMergePopover {
  open: boolean;
  anchorEl: null | HTMLElement;
  inputValue: string;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSave: () => void;
  handleClose: () => void;
  availableNodes: Node[];
  selectedNodes: string[];
}

export const MergePopover = ({
  open,
  anchorEl,
  inputValue,
  handleInputChange,
  handleSave,
  handleClose,
  availableNodes,
}: IMergePopover) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedNodeIds, setSelectedNodeIds] = useState<string[]>([]);

  const filteredNodes = useMemo(() => {
    return availableNodes?.filter((node) =>
      (node?.data?.label as string)
        ?.toLowerCase()
        ?.includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, availableNodes]);

  const isSelected = (id: string) => selectedNodeIds.includes(id);

  const handleNodeSelect = (id: string) => {
    // If already selected, remove it; otherwise add it
    if (selectedNodeIds.includes(id)) {
      setSelectedNodeIds(selectedNodeIds.filter((nid) => nid !== id));
    } else {
      setSelectedNodeIds([...selectedNodeIds, id]);
    }
  };

  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
    >
      <Box sx={{ p: 2, width: 300 }}>
        <Typography variant="subtitle1" gutterBottom>
          Merge Nodes
        </Typography>

        {/* Label Field */}
        <TextField
          fullWidth
          value={inputValue}
          onChange={handleInputChange}
          label="Label"
          size="small"
          variant="outlined"
          sx={{ mb: 2 }}
        />

        {/* Search */}
        <TextField
          fullWidth
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          label="Search nodes"
          size="small"
          variant="outlined"
        />

        {/* Node List */}
        <List dense sx={{ maxHeight: 200, overflowY: "auto", mt: 1 }}>
          {filteredNodes.map((node) => (
            <ListItem key={node.id} onClick={() => handleNodeSelect(node.id)}>
              <ListItemIcon>
                <DeviceHubIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary={node.data.label as string} />
            </ListItem>
          ))}
        </List>

        {/* Actions */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            gap: 1,
            mt: 2,
          }}
        >
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSave} variant="contained">
            Save
          </Button>
        </Box>
      </Box>
    </Popover>
  );
};
