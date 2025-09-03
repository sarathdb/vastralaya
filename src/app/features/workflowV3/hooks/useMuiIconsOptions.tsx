import * as MuiIcons from "@mui/icons-material";
import { useMemo } from "react";

export const useMuiIconsOptions = () => {
  return useMemo(() => {
    return Object.keys(MuiIcons).map((key) => ({
      label: key,
      value: key,
    }));
  }, []);
};
