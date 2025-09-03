import React, { useEffect, useMemo, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  CSSObject,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Popover,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Node } from "@xyflow/react";

import ClearIcon from "@mui/icons-material/HighlightOff";
import DeviceHubIcon from "@mui/icons-material/DeviceHub";
// import NodeIcon from "../utils/NodeIcon";
// import {
//   DEFAULT_MENU_ICON_SIZE,
//   DEFAULT_SUB_MENU_ICON_SIZE,
// } from "../utils/NodeIcons";

interface IMergePopover {
  open: boolean;
  anchorEl: null | HTMLElement;
  handleClose: () => void;
  handleMergeNodes: (nodes: Node[]) => void;
  availableNodes: Node[];
  selectedNodes: Node[];
}

interface IStyles {
  [key: string]: React.CSSProperties | CSSObject;
}

const styles = (): IStyles => ({
  cancelButton: {
    textTransform: "capitalize",
    color: "#1E417A",
    backgroundColor: "#ffffff",
    borderColor: "#1E417A",
    border: `1px solid rgba(30, 65, 122, 0.50)`,
    boxShadow: "none",
    "&:hover": { color: "#ffffff !important" },
  },
});

const MergePopover = ({
  open,
  anchorEl,
  handleClose,
  handleMergeNodes,
  availableNodes,
  selectedNodes,
}: IMergePopover) => {
  const defaultStyle = useMemo(() => styles(), []);

  const [searchTerm, setSearchTerm] = useState("");
  const [selNodes, setSelNodes] = useState<Node[]>(selectedNodes);

  const filteredNodes = useMemo(() => {
    return availableNodes?.filter((node) =>
      (node.data?.nodeName as string)
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, availableNodes]);

  const isNodeSelected = (curNode: Node) => {
    return selNodes.findIndex((node) => node.id === curNode.id) > -1;
  };

  const handleToggle = (node: Node) => () => {
    let filteredNodes = [];
    if (isNodeSelected(node)) {
      filteredNodes = selNodes.filter((sNode) => sNode.id !== node.id);
    } else {
      filteredNodes = [...selNodes, node];
    }
    setSelNodes(filteredNodes);
    handleMergeNodes(filteredNodes);
  };

  const handleClearSearch = () => {
    setSearchTerm("");
  };

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    let updated: Node[];
    if (event.target.checked) {
      const toAdd = filteredNodes.filter(
        (node) => !selNodes.some((n) => n.id === node.id)
      );
      updated = [...selNodes, ...toAdd];
    } else {
      updated = selNodes.filter(
        (node) => !filteredNodes.some((f) => f.id === node.id)
      );
    }
    setSelNodes(updated);
    handleMergeNodes(updated);
  };

  const allFilteredSelected =
    filteredNodes.length > 0 &&
    filteredNodes.every((node) => selNodes.some((n) => n.id === node.id));

  const someFilteredSelected =
    filteredNodes.some((node) => selNodes.some((n) => n.id === node.id)) &&
    !allFilteredSelected;

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
      <Stack sx={{ width: 250, p: 2 }}>
        <TextField
          label="Search"
          variant="standard"
          onChange={(e) => setSearchTerm(e.target.value)}
          value={searchTerm}
          InputProps={{
            endAdornment: searchTerm && (
              <IconButton size="small" onClick={handleClearSearch}>
                <ClearIcon />
              </IconButton>
            ),
          }}
        />

        {/* Select All Checkbox */}
        <Box
          display="flex"
          alignItems="center"
          mt={2}
          justifyContent={"space-between"}
        >
          <Typography variant="body2">Select All</Typography>
          <Checkbox
            checked={allFilteredSelected}
            indeterminate={someFilteredSelected}
            onChange={handleSelectAll}
          />
        </Box>

        {/* Node List */}
        <List dense sx={{ maxHeight: 200, overflowY: "auto", mt: 1 }}>
          {filteredNodes.map((node) => (
            <ListItem
              key={node.id}
              secondaryAction={
                <Checkbox
                  edge="end"
                  onChange={handleToggle(node)}
                  checked={isNodeSelected(node)}
                  inputProps={{
                    "aria-labelledby": node.data?.nodeLabel as string,
                  }}
                />
              }
              disablePadding
            >
              <ListItemButton onClick={handleToggle(node)}>
                <ListItemAvatar>
                  <DeviceHubIcon />
                  {/* <NodeIcon
                    iconName={node?.data?.nodeIcon as string}
                    iconColor={node?.data?.nodeIconColor as string}
                    iconSize={DEFAULT_SUB_MENU_ICON_SIZE}
                  /> */}
                </ListItemAvatar>
                <ListItemText
                  id={node.data?.nodeLabel as string}
                  primary={node?.data?.nodeLabel as string}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        {/* Footer Buttons */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            gap: 1,
            mt: 2,
          }}
        >
          <Button
            disabled={false}
            variant="contained"
            size="small"
            sx={defaultStyle.cancelButton}
            onClick={handleClose}
          >
            Close
          </Button>
          <Button
            sx={{
              textTransform: "capitalize",
              backgroundColor: "#1E417A",
            }}
            variant="contained"
            size="small"
            color="primary"
            onClick={() => handleMergeNodes(selNodes)}
          >
            Save
          </Button>
        </Box>
      </Stack>
    </Popover>
  );
};

export default MergePopover;
