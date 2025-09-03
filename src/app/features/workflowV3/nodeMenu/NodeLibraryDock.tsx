import React, { useState, useMemo } from "react";
import Drawer from "@mui/material/Drawer";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Divider,
  TextField,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { templates } from "../../../components/PipelineIcons";
import { nodeCategories, nodeSubCategories } from "../mock/mockNodeCategories";
import { INodeCategory, INodeSubCategory } from "../mock/mockNodeCategories";

interface NodeLibraryDockProps {
  open: boolean;
  onClose: () => void;
}

const NodeLibraryDock: React.FC<NodeLibraryDockProps> = ({ open, onClose }) => {
  const [selectedNodeCategory, setSelectedNodeCategory] =
    useState<INodeCategory | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredSubCategories = useMemo(() => {
    if (!searchQuery.trim()) return [];
    return nodeSubCategories.filter((sub) =>
      sub.nodeName.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const showSearchResults = searchQuery.trim().length > 0;

  const handleSubCategoryClick = (sub: INodeSubCategory) => {
    const matchedCategory = nodeCategories.find(
      (cat) => cat.type === sub.nodeType
    );
    setSelectedNodeCategory(matchedCategory || null);
    setSearchQuery(""); // optional: clear search after selection
  };

  const subCategoriesToShow = showSearchResults
    ? filteredSubCategories
    : nodeSubCategories.filter(
        (cat) => cat.nodeType === selectedNodeCategory?.type
      );

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      ModalProps={{ BackdropProps: { invisible: true } }}
      PaperProps={{
        elevation: 0,
        sx: {
          width: 360,
          height: "100%",
          backgroundColor: "orange",
          boxShadow: "none",
        },
      }}
    >
      <Box sx={{ width: 360, p: 2, height: "100%", overflowY: "auto" }}>
        {/* Search */}
        <TextField
          fullWidth
          size="small"
          variant="outlined"
          placeholder="Search apps..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{ mb: 2, backgroundColor: "white", borderRadius: 1 }}
        />

        {/* Categories */}
        {!showSearchResults && (
          <>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              CATEGORIES
            </Typography>
            <Grid container columns={12} spacing={1}>
              {nodeCategories.map((cat) => (
                <Grid columnGap={3} key={cat.nodeCategoryName}>
                  <Card
                    onClick={() => setSelectedNodeCategory(cat)}
                    sx={{
                      textAlign: "center",
                      cursor: "pointer",
                      border:
                        selectedNodeCategory === cat
                          ? "2px solid #1976d2"
                          : "1px solid #e0e0e0",
                      boxShadow: "none",
                    }}
                  >
                    <CardContent sx={{ p: 1 }}>
                      <Avatar
                        src={cat.nodeCategoryIcon}
                        alt={cat.nodeCategoryName}
                        sx={{ width: 40, height: 40, mx: "auto", mb: 0.5 }}
                      />
                      <Typography variant="caption" noWrap>
                        {cat.nodeCategoryName}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
            <Divider sx={{ my: 2 }} />
          </>
        )}

        {/* Subcategories */}
        <Typography variant="subtitle2" sx={{ mb: 1 }}>
          {showSearchResults
            ? `SEARCH RESULTS`
            : selectedNodeCategory
            ? `${selectedNodeCategory.nodeCategoryName} APPS`
            : "SELECT A CATEGORY"}
        </Typography>
        <Grid container columns={12} spacing={1}>
          {subCategoriesToShow.map((sub) => (
            <Grid columnGap={3} key={sub.nodeName}>
              <Card
                onClick={() => handleSubCategoryClick(sub)}
                sx={{
                  textAlign: "center",
                  boxShadow: "none",
                  cursor: "pointer",
                }}
              >
                <CardContent sx={{ p: 1 }}>
                  <Avatar
                    src={sub.nodeIcon}
                    alt={sub.nodeName}
                    sx={{ width: 40, height: 40, mx: "auto", mb: 0.5 }}
                  />
                  <Typography variant="caption" noWrap>
                    {sub.nodeName}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Drawer>
  );
};

export default NodeLibraryDock;
