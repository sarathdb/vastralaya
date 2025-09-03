import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  Button,
  Divider,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import Drawer from "@mui/material/Drawer";
// import Grid2 from '@mui/material/Unstable_Grid2';
import Grid2 from "@mui/material/Grid2";
import React, { useCallback, useMemo, useState } from "react";
import { NodeTypes } from "../enum/NodeTypes";
import { IStyles } from "../model/IStyles";
import { INodeCategory, INodeSubCategory } from "../model/NodeData";
import NodeMenuItem from "./NodeMenuItem";
import SubMenuItem from "./SubMenuItem";
import { NodeLibraryTypes } from "../enum/NodeLibraryType";

interface NodeLibraryMenuProps {
  open: boolean;
  onClose: () => void;
  nodeCategories: INodeCategory[];
  nodeSubCategories: INodeSubCategory[];
  onSelect: (nodeSubCategory: INodeSubCategory, libraryType: string) => void;
  libraryType: string;
}

const styles = (searchQuery: string): IStyles => ({
  root: {
    width: 400,
    height: "100%",
    backgroundColor: "white",
    boxShadow: "0px 4px 10px #1e417a",
    borderRadius: "12px",
  },

  container: { width: 360, p: 2, height: "100%", overflowY: "auto" },
  searchField: { mb: 2, backgroundColor: "white", borderRadius: 1 },

  footerContainer: {
    p: 2,
    borderTop: "1px solid #ddd",
    display: "flex",
    justifyContent: "flex-end",
  },
  closeButton: {
    textTransform: "capitalize",
    color: "#1E417A",
    backgroundColor: "#ffffff",
    borderColor: "#1E417A",
    border: `1px solid rgba(30, 65, 122, 0.50)`,
    boxShadow: "none",
    "&:hover": { color: "#ffffff !important" },
  },
  searchClose: {
    visibility: searchQuery ? "visible" : "hidden",
    border: "none",
    borderRadius: "100%",
    boxSizing: "border-box",
  },
  nodeGrid: {
    width: "85px",
    height: "85px",
  },
});

const NodeLibraryMenu: React.FC<NodeLibraryMenuProps> = ({
  open,
  onClose,
  nodeCategories,
  nodeSubCategories,
  onSelect,
  libraryType,
}) => {
  const [selectedNodeCategory, setSelectedNodeCategory] =
    useState<INodeCategory | null>(
      nodeCategories?.find((el) => el.nodeCategoryName === "Integrations")
    );
  const [searchQuery, setSearchQuery] = useState("");
  const defaultStyle = useMemo(() => styles(searchQuery), [searchQuery]);
  const showSearchResults = useMemo(
    () => searchQuery.trim().length > 0,
    [searchQuery]
  );
  const filteredSubCategories = useMemo(() => {
    if (showSearchResults) {
      setSelectedNodeCategory(null);
      return nodeSubCategories?.filter((sub) =>
        sub.nodeLabel.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return [];
  }, [nodeSubCategories, searchQuery, showSearchResults]);

  const displaySubcategories = useMemo(() => {
    return (
      showSearchResults
        ? filteredSubCategories
        : nodeSubCategories?.filter(
            (sub) => sub.nodeCategoryType === selectedNodeCategory?.type
          )
    ).filter(
      (node) =>
        node.nodeType !== NodeTypes.SwitchEnd &&
        node.nodeType !== NodeTypes.Join
    );
  }, [
    showSearchResults,
    filteredSubCategories,
    nodeSubCategories,
    selectedNodeCategory?.type,
  ]);

  const handleSubCategoryClick = useCallback(
    (sub: INodeSubCategory) => {
      const matchedCategory = nodeCategories?.find(
        (cat) => cat.type === sub.nodeType
      );
      onSelect(sub, libraryType);
      setSelectedNodeCategory(matchedCategory || null);
      setSearchQuery("");
    },
    [libraryType, nodeCategories, onSelect]
  );

  const handleCategoryClick = useCallback((category: INodeCategory) => {
    setSelectedNodeCategory(category);
    setSearchQuery("");
  }, []);

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      ModalProps={{ BackdropProps: { invisible: true } }}
      PaperProps={{
        elevation: 3,
        sx: defaultStyle.root,
      }}
    >
      <Box sx={defaultStyle.container}>
        {/* Search */}
        <TextField
          fullWidth
          size="small"
          variant="outlined"
          placeholder="Search apps..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={defaultStyle.searchField}
          InputProps={{
            startAdornment: (
              <SearchIcon fontSize="small" sx={{ marginRight: "5px" }} />
            ),
            endAdornment: (
              <IconButton
                title={"Clear"}
                aria-label={"Clear"}
                size="small"
                sx={defaultStyle.searchClose}
                onClick={() => {
                  setSearchQuery("");
                }}
              >
                <ClearIcon fontSize="small" sx={{ margin: "0 !important" }} />
              </IconButton>
            ),
          }}
        />

        {/* Categories */}
        {!showSearchResults && (
          <>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              Categories
            </Typography>
            <Grid2 container columns={12} spacing={1}>
              {nodeCategories?.map((cat, index) => (
                <Grid2
                  columnGap={3}
                  key={cat.nodeCategoryName}
                  sx={defaultStyle.nodeGrid}
                >
                  <NodeMenuItem
                    key={`${cat.type}-${index}`}
                    selectedNodeCategory={selectedNodeCategory}
                    nodeCategory={cat}
                    onClickPanelItem={handleCategoryClick}
                  />
                </Grid2>
              ))}
            </Grid2>
            <Divider sx={{ my: 2 }} />
          </>
        )}

        {/* Subcategories (Search Filtered or Based on Selected Category) */}
        <Typography variant="subtitle2" sx={{ mb: 1 }}>
          {searchQuery.trim()
            ? `Search Results`
            : selectedNodeCategory
            ? `${selectedNodeCategory.nodeCategoryName}`
            : "Select a category"}
        </Typography>
        <Grid2 container columns={12} spacing={1}>
          {displaySubcategories?.map((sub, index) => (
            <Grid2 columnGap={3} key={sub.nodeName} sx={defaultStyle.nodeGrid}>
              <SubMenuItem
                key={`${selectedNodeCategory?.type}- ${sub.nodeName}-${index}`}
                OnSelectNode={() => handleSubCategoryClick(sub)}
                node={sub}
              />
            </Grid2>
          ))}
        </Grid2>
      </Box>

      {/* Footer with Close Button */}
      <Box sx={defaultStyle.footerContainer}>
        <Button
          variant="contained"
          size="small"
          sx={defaultStyle.closeButton}
          onClick={onClose}
        >
          Close
        </Button>
      </Box>
    </Drawer>
  );
};

export default NodeLibraryMenu;
