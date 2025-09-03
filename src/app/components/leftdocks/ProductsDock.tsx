import React from "react";
import Drawer from "@mui/material/Drawer";
import { Box, Typography, IconButton } from "@mui/material";
import CheckroomIcon from "@mui/icons-material/Checkroom";
import DressIcon from "@mui/icons-material/DryCleaningOutlined";
import AccessoriesIcon from "@mui/icons-material/DiamondOutlined";
import NewArrivalsIcon from "@mui/icons-material/NewReleasesOutlined";
import SaleIcon from "@mui/icons-material/LocalOfferOutlined";
import TrendingIcon from "@mui/icons-material/TrendingUpOutlined";
import FavoriteIcon from "@mui/icons-material/FavoriteBorderOutlined";
import CollectionsIcon from "@mui/icons-material/CollectionsOutlined";

const productCategories = [
  { name: "Clothing", icon: <CheckroomIcon sx={{ fontSize: 40 }} /> },
  { name: "Dresses", icon: <DressIcon sx={{ fontSize: 40 }} /> },
  { name: "Accessories", icon: <AccessoriesIcon sx={{ fontSize: 40 }} /> },
  { name: "New Arrivals", icon: <NewArrivalsIcon sx={{ fontSize: 40 }} /> },
  { name: "Sale", icon: <SaleIcon sx={{ fontSize: 40 }} /> },
  { name: "Trending", icon: <TrendingIcon sx={{ fontSize: 40 }} /> },
  { name: "Wishlist", icon: <FavoriteIcon sx={{ fontSize: 40 }} /> },
  { name: "Collections", icon: <CollectionsIcon sx={{ fontSize: 40 }} /> },
];

interface ProductsDockProps {
  open: boolean;
  onClose: () => void;
}

const ProductsDock: React.FC<ProductsDockProps> = ({ open, onClose }) => {
  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: 100,
          height: "50%",
          marginTop: 30,
          backgroundColor: "transparent",
        },
      }}
    >
      <Typography
        variant="h6"
        color="primary"
        sx={{
          p: 2,
          position: "sticky",
          top: 0,
          backgroundColor: "#f5f5f5",
          zIndex: 1,
        }}
      >
        Categories
      </Typography>
      <Box
        sx={{
          overflow: "auto",
          // height: "calc(100% - 56px)",
          height: "100%",

          backgroundColor: "white",
        }}
      >
        {productCategories.map((category) => (
          <Box
            key={category.name}
            sx={{
              display: "flex",
              alignItems: "center",
              p: 2,
              "&:hover": {
                backgroundColor: "rgba(0, 0, 0, 0.04)",
                cursor: "pointer",
              },
            }}
          >
            <IconButton color="primary" size="large">
              {category.icon}
            </IconButton>
            {/* <Typography variant="body1" sx={{ ml: 2 }}>
              {category.name}
            </Typography> */}
          </Box>
        ))}
      </Box>
    </Drawer>
  );
};

export default ProductsDock;
