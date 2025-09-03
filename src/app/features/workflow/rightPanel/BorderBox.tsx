import {
  Box,
  IconButton,
  Stack,
  SvgIconProps,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { PropsWithChildren, ReactElement } from "react";

export interface IconButtonConfig {
  iconLabel: string;
  tooltipText: string;
  onClick: () => void;
  icon: ReactElement<SvgIconProps>;
}

interface BorderedBoxProps extends PropsWithChildren {
  title: string;
  subTitle?: string;
  childStackStyle?: React.CSSProperties;
  iconButtons?: IconButtonConfig[];
}

const styles = {
  heading: {
    position: "absolute",
    top: "-14px",
    left: "16px",
    background: "white",
    padding: "0 8px",
    color: "#1e417a",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  buttons: {
    position: "absolute",
    top: "-14px",
    right: "16px",
    background: "white",
    padding: "0 8px",
    color: "#1e417a",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
};

export default function BorderedBox({
  title,
  iconButtons = [],
  children,
  childStackStyle,
  subTitle,
}: BorderedBoxProps) {
  return (
    <Box
      sx={{
        position: "relative",
        border: "2px solid #c4c4c4",
        borderRadius: "8px",
        padding: "16px",
        marginTop: "24px",
      }}
    >
      {/* Heading on the Top Border with Multiple Icon Buttons */}
      <Box sx={styles.heading}>
        <Typography component="div" fontSize={"small"}>
          {title}
        </Typography>
      </Box>
      <Box sx={styles.buttons}>
        <Box sx={{ display: "flex", gap: "8px" }}>
          {iconButtons.map((button, index) => (
            <Tooltip key={index} title={button.tooltipText}>
              <IconButton
                onClick={button.onClick}
                aria-label={button.iconLabel}
                size="small"
              >
                {button.icon}
              </IconButton>
            </Tooltip>
          ))}
        </Box>
      </Box>

      {/* Box Content */}
      <Typography component="div" fontSize={"small"} color={"#c4c4c4"}>
        {subTitle}
      </Typography>
      <Stack sx={{ gap: 1, ...childStackStyle }}>{children}</Stack>
    </Box>
  );
}
