import Box from "@mui/material/Box";
import React, { useState } from "react";

import {
  AppBar,
  Card,
  ListItemIcon,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";

// import blackHomeIcon from "../../../assets/blackHome.svg";
// "../../../assets/blackHome.svg";
// import Tooltip from "@mui/material/Tooltip";
// import commonStore, { CommonStore } from "../../../features/home1/CommonStore";
import { Logout } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
// import { Application, SolutionConfig } from "../../api/types";

// import workFlowStore from "../workflow/workFlowStore";
// import useTranslation from "../../localization/useTranslation";
// import locales from "../../localization/locale.json";

export type IRMHeaderProps = {
  backgroundColor: string;
};

export const Header = ({ backgroundColor }: IRMHeaderProps) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const [disableDropDown] = useState<boolean>(false);

  const navigate = useNavigate();
  // const [currentLanguage, setCurrentLanguage] = useState<any>(
  //   commonStore.getLanguage()
  // );
  // let localeContent = locales;
  // const translation = useTranslation(localeContent);
  // translation.setLanguage(currentLanguage);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    // sessionStorage.clear();
    // commonStore.setApplication(null);
    // commonStore.setLanguage("en-US");
    // commonStore.setShowCompanySelection(true);
    // commonStore.setSelectedCompany(null);
    // commonStore.setCompanies([]);
    // commonStore.setSolution(null);

    navigate("/");
  };

  const open = Boolean(anchorEl);

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      id="account-menu"
      open={open}
      onClose={handleClose}
      onClick={handleClose}
      PaperProps={{
        elevation: 0,
        sx: {
          overflow: "visible",
          filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
          mt: 1.5,
          "& .MuiAvatar-root": {
            width: 32,
            height: 32,
            ml: -0.5,
            mr: 1,
          },
          "&:before": {
            content: '""',
            display: "block",
            position: "absolute",
            top: 0,
            right: 14,
            width: 10,
            height: 10,
            bgcolor: "background.paper",
            transform: "translateY(-50%) rotate(45deg)",
            zIndex: 0,
          },
        },
      }}
      transformOrigin={{ horizontal: "right", vertical: "top" }}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
    >
      <MenuItem onClick={handleLogout}>
        <ListItemIcon>
          <Logout fontSize="small" />
        </ListItemIcon>
        "Logout"
      </MenuItem>
    </Menu>
  );

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        border: 0,
        boxShadow: "none",
        borderRadius: 0,
        backgroundColor: backgroundColor,
      }}
    >
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          position="sticky"
          color="transparent"
          sx={{
            bgcolor: "white",
            borderTopLeftRadius: "24px",
          }}
        >
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            <div
              style={{
                flexDirection: "row",
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "flex-end",
                flex: 1,
                gap: "5px",
              }}
            >
              <Typography
                variant="h4"
                color={"primary.dark"}
                component="h4"
                sx={{
                  display: "flex",
                  fontFamily: "Inter",
                  fontSize: "15px",
                  color: "#1E417A",
                }}
              >
                {"VASTRALAYA"}
              </Typography>
            </div>
            {!disableDropDown && (
              <Box
                sx={{
                  display: {
                    xs: "none",
                    md: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end",
                    flex: 1,
                  },
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {/* <img src={blackHomeIcon} alt="" /> */}
                  <Typography
                    variant="h4"
                    component="h4"
                    noWrap
                    sx={{
                      font: "Inter",
                      lineHeight: "25px",
                      letterSpacing: "0.15px",
                      color: "primary.dark",
                      maxWidth: 200,
                      textOverflow: "ellipsis",
                      overflow: "hidden",
                      textTransform: "capitalize",
                      display: "flex",
                      fontFamily: "Inter",
                      fontSize: "15px",
                      paddingLeft: 1,
                    }}
                    color={"primary.dark"}
                  >
                    {"Test Company"}
                  </Typography>
                </Box>
              </Box>
            )}
          </Toolbar>
          {renderMenu}
        </AppBar>
      </Box>
    </Card>
  );
};

export default Header;
