import { CSSObject, Stack, Typography } from "@mui/material";
import React, { useMemo } from "react";

interface IHoverProps {
  title: string;
}
const styles = (): { [key: string]: React.CSSProperties | CSSObject } => ({
  container: {
    position: "absolute",
    top: "2%",
    left: "41%",
    backgroundColor: "white",
    p: 1,
    borderRadius: 4,
    boxShadow: "0px 4px 10px #1e417a",
  },
  title: {
    fontSize: "small",
    color: "default.main",
  },
});

const HoverText = ({ title }: IHoverProps) => {
  const defaultStyle = useMemo(() => styles(), []);

  return (
    <Stack sx={defaultStyle.container}>
      <Typography
        variant="h6"
        color={"primary"}
        component="body"
        sx={defaultStyle.title}
      >
        {title}
      </Typography>
    </Stack>
  );
};

export default HoverText;
