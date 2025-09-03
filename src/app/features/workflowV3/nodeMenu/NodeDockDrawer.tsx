import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
  Divider,
  Typography,
  Box,
  IconButton,
  Tooltip,
  styled,
  Theme,
} from "@mui/material";
import {
  Apps as AppsIcon,
  Memory as MemoryIcon,
  ManageAccounts as ManageAccountsIcon,
  Schema as SchemaIcon,
  Assistant as AssistantIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  Height,
} from "@mui/icons-material";

// Import your mock data (you'll need to adjust the path)
import { nodeCategories, nodeSubCategories } from "../mock/mockNodeCategories";

// Define types for your data
interface NodeCategory {
  _id: string;
  nodeCategoryName: string;
  nodeCategoryIcon: string;
  nodeCategoryColor: string;
  type: string;
}

interface NodeSubCategory {
  _id: string;
  nodeName: string;
  nodeLabel: string;
  nodeIcon: string;
  nodeIconColor: string;
  nodeCategoryType: string;
  nodeType: string;
}

// Custom styled components
const StyledDrawer = styled(Drawer)({
  "& .MuiDrawer-paper": {
    width: 350,
    marginTop:"5%",
    height: "80%",
    overflowX: "hidden",
    transition: "width 0.3s ease",
  },
});

const CategoryHeader = styled(ListItem)(({ theme }: { theme: Theme }) => ({
  paddingLeft: theme.spacing(3),
  fontWeight: "bold",
  "& .MuiListItemIcon-root": {
    minWidth: "40px",
  },
}));

const SubCategoryItem = styled(ListItem)(({ theme }: { theme: Theme }) => ({
  paddingLeft: theme.spacing(5),
  "& .MuiListItemIcon-root": {
    minWidth: "40px",
  },
}));

const SearchContainer = styled(Box)(({ theme }: { theme: Theme }) => ({
  padding: theme.spacing(2),
}));

// Icon mapping for categories
const getCategoryIcon = (iconName: string) => {
  switch (iconName) {
    case "Memory":
      return <MemoryIcon />;
    case "ManageAccounts":
      return <ManageAccountsIcon />;
    case "Apps":
      return <AppsIcon />;
    case "Schema":
      return <SchemaIcon />;
    case "Assistant":
      return <AssistantIcon />;
    default:
      return <AppsIcon />;
  }
};

interface NodeDockDrawerProps {
  open: boolean;
  onClose?: () => void;
}

const NodeDockDrawer: React.FC<NodeDockDrawerProps> = ({ open, onClose }) => {
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>(
    nodeCategories.reduce((acc, category) => {
      acc[category._id] = false;
      return acc;
    }, {} as Record<string, boolean>)
  );

  const [searchTerm, setSearchTerm] = useState("");

  const toggleCategory = (categoryId: string) => {
    setOpenCategories((prev) => ({
      ...prev,
      [categoryId]: !prev[categoryId],
    }));
  };

  // Filter categories and subcategories based on search term
  const filteredCategories = nodeCategories.filter((category) =>
    category.nodeCategoryName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredSubCategories = (categoryId: string) => {
    return nodeSubCategories.filter(
      (subCategory) =>
        subCategory.nodeCategoryType ===
          nodeCategories.find((c) => c._id === categoryId)?.type &&
        (subCategory.nodeLabel
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
          subCategory.nodeName.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  };

  return (
    <StyledDrawer
      variant="permanent"
      anchor="right"
      open={open}
      onClose={onClose}
    >
      <SearchContainer>
        <Typography variant="h6" gutterBottom>
          Node Library
        </Typography>
        <input
          type="text"
          placeholder="Search for an app..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: "100%",
            padding: "8px",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
        />
      </SearchContainer>
      <Divider />

      {/* Recommended section */}
      <List>
        <CategoryHeader>
          <ListItemText primary="RECOMMENDED" />
        </CategoryHeader>
        <ListItem>
          <ListItemText primary="API platform by Workato" />
        </ListItem>
        <ListItem>
          <ListItemText primary="Google Drive" />
        </ListItem>
      </List>
      <Divider />

      {/* Categories section */}
      <List>
        <CategoryHeader>
          <ListItemText primary="OTHER APPS" />
        </CategoryHeader>

        {filteredCategories.map((category) => {
          const subCategories = filteredSubCategories(category._id);
          if (subCategories.length === 0 && searchTerm) return null;

          return (
            <React.Fragment key={category._id}>
              <ListItem onClick={() => toggleCategory(category._id)}>
                <ListItemIcon style={{ color: category.nodeCategoryColor }}>
                  {getCategoryIcon(category.nodeCategoryIcon)}
                </ListItemIcon>
                <ListItemText primary={category.nodeCategoryName} />
                {openCategories[category._id] ? (
                  <ExpandLessIcon />
                ) : (
                  <ExpandMoreIcon />
                )}
              </ListItem>

              <Collapse
                in={openCategories[category._id]}
                timeout="auto"
                unmountOnExit
              >
                <List component="div" disablePadding>
                  {subCategories.map((subCategory) => (
                    <Tooltip
                      key={subCategory._id}
                      title={
                        subCategory.nodeToolTip || subCategory.nodeDescription
                      }
                      placement="right"
                    >
                      <SubCategoryItem>
                        <ListItemIcon
                          style={{ color: subCategory.nodeIconColor }}
                        >
                          {/* For SVG icons, you would need to parse the SVG string */}
                          {getCategoryIcon(subCategory.nodeIcon)}
                        </ListItemIcon>
                        <ListItemText primary={subCategory.nodeLabel} />
                      </SubCategoryItem>
                    </Tooltip>
                  ))}
                </List>
              </Collapse>
            </React.Fragment>
          );
        })}
      </List>
    </StyledDrawer>
  );
};

export default NodeDockDrawer;
