import React, { useState } from "react";
import {
  Stack,
  Button,
  IconButton,
  Switch,
  Typography,
  Menu,
  MenuItem,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import HistoryIcon from "@mui/icons-material/History";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import EditIcon from "@mui/icons-material/Edit";
import BoltIcon from "@mui/icons-material/Bolt";

const WorkflowToolbar = ({
  onSaveWorkFlow,
  isActive,
  onToggleActive,
  menuItems,
  onMenuItemSelect,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [view, setView] = useState("editor");

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = (selectedItem) => {
    setAnchorEl(null);
    if (selectedItem) {
      onMenuItemSelect(selectedItem); // Call the function with selected value
    }
  };
  return (
    <Stack
      sx={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between", // Spread items across
        p: 1,
        backgroundColor: "#F5F7FA",
        borderRadius: "8px",
      }}
    >
      {/* Toggle Switch */}
      <Stack direction="row" alignItems="center" gap={0.5}>
        <Switch checked={isActive} onChange={onToggleActive} size="small" />
        <Typography variant="body2">
          {isActive ? "Active" : "Inactive"}
        </Typography>
      </Stack>

      {/* Center - View Switcher */}
      <ToggleButtonGroup
        value={view}
        exclusive
        onChange={(_, newValue) => {
          if (newValue) setView(newValue);
        }}
        sx={{
          backgroundColor: "#FFFFFF",
          borderRadius: "8px",
          overflow: "hidden",
          boxShadow: 1,
        }}
      >
        <ToggleButton
          value="editor"
          sx={{
            textTransform: "none",
            border: "none",
            "&.Mui-selected": { backgroundColor: "#E3F2FD" },
          }}
        >
          <EditIcon sx={{ fontSize: 16, marginRight: 0.5 }} />
          Editor
        </ToggleButton>

        <ToggleButton
          value="executions"
          sx={{
            textTransform: "none",
            border: "none",
            "&.Mui-selected": { backgroundColor: "#E3F2FD" },
          }}
        >
          <BoltIcon sx={{ fontSize: 16, marginRight: 0.5 }} />
          Executions
        </ToggleButton>
      </ToggleButtonGroup>

      {/* Right Side - History, Save, and More Menu */}
      <Stack direction="row" alignItems="center" gap={1}>
        <Button variant="outlined" size="small" startIcon={<HistoryIcon />}>
          History
        </Button>

        <Button
          variant="contained"
          size="small"
          sx={{ bgcolor: "#1C3D6C", "&:hover": { bgcolor: "#162F50" } }}
          startIcon={<SaveIcon sx={{ color: "#FFF" }} />}
          onClick={onSaveWorkFlow}
        >
          Save
        </Button>

        <IconButton size="small" onClick={handleMenuOpen}>
          <MoreHorizIcon />
        </IconButton>

        {/* More Options Menu */}
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={() => handleMenuClose(null)}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
        >
          {menuItems.map((item) => (
            <MenuItem key={item} onClick={() => handleMenuClose(item)}>
              {item}
            </MenuItem>
          ))}
        </Menu>
      </Stack>
    </Stack>
  );
};

export default WorkflowToolbar;



// import React, { useState } from "react";
// import {
//   Stack,
//   Button,
//   IconButton,
//   Switch,
//   Typography,
//   Menu,
//   MenuItem,
//   ToggleButton,
//   ToggleButtonGroup,
// } from "@mui/material";
// import SaveIcon from "@mui/icons-material/Save";
// import HistoryIcon from "@mui/icons-material/History";
// import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
// import EditIcon from "@mui/icons-material/Edit";
// import BoltIcon from "@mui/icons-material/Bolt";

// const WorkflowToolbar = ({
//   onSaveWorkFlow,
//   isActive,
//   onToggleActive,
//   menuItems,
//   onMenuItemSelect,
// }) => {
//   const [anchorEl, setAnchorEl] = useState(null);
//   const open = Boolean(anchorEl);
//   const [view, setView] = useState("editor");

//   const handleMenuOpen = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleMenuClose = (selectedItem) => {
//     setAnchorEl(null);
//     if (selectedItem) {
//       onMenuItemSelect(selectedItem); // Call the function with selected value
//     }
//   };
//   return (
//     <Stack
//       sx={{
//         flexDirection: "row",
//         alignItems: "center",
//         justifyContent: "space-between", // Spread items across
//         p: 1,
//         backgroundColor: "#F5F7FA",
//         borderRadius: "8px",
//       }}
//     >

//       {/* Center - View Switcher */}
//       <ToggleButtonGroup
//         value={view}
//         exclusive
//         onChange={(_, newValue) => {
//           if (newValue) setView(newValue);
//         }}
//         sx={{
//           backgroundColor: "#FFFFFF",
//           borderRadius: "8px",
//           overflow: "hidden",
//           boxShadow: 1,
//         }}
//       >
//         <ToggleButton
//           value="editor"
//           sx={{
//             textTransform: "none",
//             border: "none",
//             "&.Mui-selected": { backgroundColor: "#E3F2FD" },
//           }}
//         >
//           <EditIcon sx={{ fontSize: 16, marginRight: 0.5 }} />
//           Editor
//         </ToggleButton>

//         <ToggleButton
//           value="executions"
//           sx={{
//             textTransform: "none",
//             border: "none",
//             "&.Mui-selected": { backgroundColor: "#E3F2FD" },
//           }}
//         >
//           <BoltIcon sx={{ fontSize: 16, marginRight: 0.5 }} />
//           Executions
//         </ToggleButton>
//       </ToggleButtonGroup>

//       {/* Right Side - History, Save, and More Menu */}
//       <Stack direction="row" alignItems="center" gap={1}>
//         <Button
//           variant="contained"
//           size="small"
//           sx={{ bgcolor: "#1C3D6C", "&:hover": { bgcolor: "#162F50" } }}
//           startIcon={<SaveIcon sx={{ color: "#FFF" }} />}
//           onClick={onSaveWorkFlow}
//         >
//           Save
//         </Button>

//         <IconButton size="small" onClick={handleMenuOpen}>
//           <MoreHorizIcon />
//         </IconButton>

//         {/* More Options Menu */}
//         <Menu
//           anchorEl={anchorEl}
//           open={open}
//           onClose={() => handleMenuClose(null)}
//           anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
//           transformOrigin={{ vertical: "top", horizontal: "right" }}
//         >
//           {menuItems.map((item) => (
//             <MenuItem key={item} onClick={() => handleMenuClose(item)}>
//               {item}
//             </MenuItem>
//           ))}
//         </Menu>
//       </Stack>
//     </Stack>
//   );
// };

// export default WorkflowToolbar;
