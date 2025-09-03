import React, { useState } from "react";
import { Paper, IconButton, Popover, Box, Typography } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import SettingsIcon from "@mui/icons-material/Settings";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SearchIcon from "@mui/icons-material/Search";
import PersonIcon from "@mui/icons-material/Person";
import NotificationsIcon from "@mui/icons-material/Notifications";

// const productCategories = [
//   { name: "Clothing", icon: <CheckroomIcon sx={{ fontSize: 40 }} /> },
//   { name: "Dresses", icon: <DressIcon sx={{ fontSize: 40 }} /> },
//   { name: "Accessories", icon: <AccessoriesIcon sx={{ fontSize: 40 }} /> },
//   { name: "New Arrivals", icon: <NewArrivalsIcon sx={{ fontSize: 40 }} /> },
//   { name: "Sale", icon: <SaleIcon sx={{ fontSize: 40 }} /> },
//   { name: "Trending", icon: <TrendingIcon sx={{ fontSize: 40 }} /> },
//   { name: "Wishlist", icon: <FavoriteIcon sx={{ fontSize: 40 }} /> },
//   { name: "Collections", icon: <CollectionsIcon sx={{ fontSize: 40 }} /> },
// ];

// interface ProductsDockProps {
//   open: boolean;
//   onClose: () => void;
// }

const FloatingDock = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [popupContent, setPopupContent] = useState("");

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    content: string
  ) => {
    setAnchorEl(event.currentTarget);
    setPopupContent(content);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <Paper
        sx={{
          position: "fixed",
          top: "50%", // Center vertically
          left: 20, // Dock is on the left
          transform: "translateY(-50%)", // Ensures perfect centering
          display: "flex",
          flexDirection: "column",
          gap: 2,
          p: 1,
          borderRadius: "16px",
          boxShadow: 3,
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          maxHeight: "60vh", // Limit height for scrolling
          overflowY: "auto", // Enable vertical scrolling if needed
          width: "80px",
        }}
      >
        {[
          HomeIcon,
          FavoriteIcon,
          SettingsIcon,
          SearchIcon,
          PersonIcon,
          NotificationsIcon,
        ].map((Icon, index) => (
          <IconButton
            disableRipple
            key={index}
            sx={{
              transition: "transform 0.2s ease-in-out", // Smooth zoom effect
              "&:hover": {
                transform: "scale(1.5)", // Zoom in when hovered
              },
            }}
            onClick={(e) => handleClick(e, "content")}
          >
            <Icon fontSize="large" />
          </IconButton>
        ))}
      </Paper>

      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "center",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "center",
          horizontal: "left",
        }}
        sx={{
          "& .MuiPaper-root": { width: "500px", height: "500px", p: 2 }, // Bigger popover
        }}
      >
        <Box p={2} width={200}>
          <Typography>{popupContent}</Typography>
        </Box>
      </Popover>
    </>
  );
};

export default FloatingDock;

//   return (
//     <Paper
//       sx={{
//         position: "fixed",
//         bottom: "40%",
//         left: 20, // Dock is now positioned on the left
//         display: "flex",
//         flexDirection: "column", // Stack icons vertically
//         gap: 2,
//         p: 1,
//         borderRadius: "16px",
//         boxShadow: 3,
//         // backgroundColor: "rgba(255, 255, 255, 0.9)",
//         backgroundColor: "red",
//         width: "100px",
//       }}
//     >
//       <IconButton>
//         <HomeIcon fontSize="large" />
//       </IconButton>
//       <IconButton>
//         <FavoriteIcon fontSize="large" />
//       </IconButton>
//       <IconButton>
//         <SettingsIcon fontSize="large" />
//       </IconButton>
//       <IconButton>
//         <HomeIcon fontSize="large" />
//       </IconButton>
//       <IconButton>
//         <FavoriteIcon fontSize="large" />
//       </IconButton>
//       <IconButton>
//         <SettingsIcon fontSize="large" />
//       </IconButton>
//       <IconButton>
//         <HomeIcon fontSize="large" />
//       </IconButton>
//       <IconButton>
//         <FavoriteIcon fontSize="large" />
//       </IconButton>
//       <IconButton>
//         <SettingsIcon fontSize="large" />
//       </IconButton>
//     </Paper>
//   );
//   //   return (
//   //     // <Drawer
//   //     //   anchor="left"
//   //     //   open={open}
//   //     //   onClose={onClose}
//   //     //   PaperProps={{
//   //     //     sx: {
//   //     //       width: 100,
//   //     //       height: "50%",
//   //     //       marginTop: 30,
//   //     //       backgroundColor: "transparent",
//   //     //     },
//   //     //   }}
//   //     // >
//   //     <Paper
//   //       sx={{
//   //         position: "fixed",
//   //         //bottom: 20,
//   //         left: 20,
//   //         top: "50%",
//   //         // left: "50%",
//   //         transform: "translateY(-50%)",
//   //         display: "flex",
//   //         gap: 2,
//   //         p: 1,
//   //         borderRadius: "16px",
//   //         boxShadow: 3,
//   //         backgroundColor: "rgba(255, 255, 255, 0.9)",
//   //       }}
//   //     >
//   //       <IconButton>
//   //         <HomeIcon fontSize="large" />
//   //       </IconButton>
//   //       <IconButton>
//   //         <FavoriteIcon fontSize="large" />
//   //       </IconButton>
//   //       <IconButton>
//   //         <SettingsIcon fontSize="large" />
//   //       </IconButton>
//   //     </Paper>
//   //     // </Drawer>
//   //   );
// };

// export default FloatingDock;

//   return (
//     <Drawer
//       anchor="left"
//       open={open}
//       onClose={onClose}
//       PaperProps={{
//         sx: {
//           width: 100,
//           height: "50%",
//           marginTop: 30,
//           backgroundColor: "transparent",
//         },
//       }}
//     >
//       <Typography
//         variant="h6"
//         color="primary"
//         sx={{
//           p: 2,
//           position: "sticky",
//           top: 0,
//           backgroundColor: "#f5f5f5",
//           zIndex: 1,
//         }}
//       >
//         Categories
//       </Typography>
//       <Box
//         sx={{
//           overflow: "auto",
//           // height: "calc(100% - 56px)",
//           height: "100%",

//           backgroundColor: "white",
//         }}
//       >
//         {productCategories.map((category) => (
//           <Box
//             key={category.name}
//             sx={{
//               display: "flex",
//               alignItems: "center",
//               p: 2,
//               "&:hover": {
//                 backgroundColor: "rgba(0, 0, 0, 0.04)",
//                 cursor: "pointer",
//               },
//             }}
//           >
//             <IconButton color="primary" size="large">
//               {category.icon}
//             </IconButton>
//             {/* <Typography variant="body1" sx={{ ml: 2 }}>
//               {category.name}
//             </Typography> */}
//           </Box>
//         ))}
//       </Box>
//     </Drawer>
//   );
// };

// export default ProductsDock;
