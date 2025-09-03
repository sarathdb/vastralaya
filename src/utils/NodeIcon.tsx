import * as MuiIcons from '@mui/icons-material';
import React from 'react';
import { DEFAULT_MENU_ICON_SIZE } from './NodeIcons';
import SvgRenderer from './SvgRenderer';

interface IconProps {
  iconName?: string; // Make iconName optional
  iconColor?: string; // Make iconColor optional
  iconSize?: number;
}

const NodeIcon: React.FC<IconProps> = ({
  iconName,
  iconColor = '#000', // Provide default color
  iconSize = DEFAULT_MENU_ICON_SIZE,
}) => {
  // Early return if iconName is undefined or empty
  if (!iconName) {
    return null;
  }

  try {
    // Check if iconName exists in MuiIcons
    const IconComponent = MuiIcons[iconName as keyof typeof MuiIcons];

    // If the icon exists in MUI icons, render it
    if (IconComponent) {
      return <IconComponent sx={{ fontSize: iconSize, color: iconColor }} />;
    }

    // Otherwise, try to render it as an SVG
    return <SvgRenderer svg={iconName} fontSize="large" color="primary" />;
  } catch (error) {
    console.error('Error rendering icon:', error);
    return null; // Return null on error
  }
};

export default NodeIcon;
