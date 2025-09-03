import * as MuiIcons from "@mui/icons-material";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import React from "react";
import { DEFAULT_SUB_MENU_ICON_SIZE } from "./NodeIcons";

interface IconProps {
  iconName: string;
  iconColor: string;
  iconSize?: number;
}

const NodeIcon: React.FC<IconProps> = ({
  iconName,
  iconColor,
  iconSize = DEFAULT_SUB_MENU_ICON_SIZE,
}) => {
  const IconComponent = MuiIcons[iconName as keyof typeof MuiIcons];
  // If the icon doesn't exist, return a default icon
  if (!IconComponent) {
    return <AutoAwesomeIcon sx={{ fontSize: iconSize, color: iconColor }} />;
  }
  return <IconComponent sx={{ fontSize: iconSize, color: iconColor }} />;
};

export default NodeIcon;
