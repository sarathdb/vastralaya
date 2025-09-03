import { createTheme } from "@mui/material";
import { AppConstants } from "./constants";

const AppTheme = createTheme({
  palette: {
    primary: {
      main: AppConstants.colors.primary,
    },
    secondary: {
      main: AppConstants.colors.secondary,
    },
    error: {
      main: AppConstants.colors.error,
    },
    background: {
      default: AppConstants.colors.background,
      paper: AppConstants.colors.paper,
    },
  },
  typography: {
    fontFamily: AppConstants.fonts.primary,
    h1: {
      fontFamily: AppConstants.fonts.primary,
      fontWeight: 600,
    },
    h2: {
      fontFamily: AppConstants.fonts.primary,
      fontWeight: 600,
    },
    h3: {
      fontFamily: AppConstants.fonts.primary,
      fontWeight: 400,
    },
    h4: {
      fontFamily: AppConstants.fonts.primary,
      fontWeight: 500,
    },
    h5: {
      fontFamily: AppConstants.fonts.primary,
      fontWeight: 500,
    },
    h6: {
      fontFamily: AppConstants.fonts.primary,
      fontWeight: 500,
    },
    body1: {
      fontFamily: AppConstants.fonts.primary,
    },
    body2: {
      fontFamily: AppConstants.fonts.primary,
      fontSize: 14,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: AppConstants.borderRadius.medium,
          padding: AppConstants.spacing.medium,
          fontFamily: AppConstants.fonts.primary,
          backgroundColor: AppConstants.colors.primary,
          color: AppConstants.colors.paper,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: AppConstants.borderRadius.large,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: AppConstants.borderRadius.small,
            color: AppConstants.colors.primary,
          },
        },
      },
    },
  },
});

export default AppTheme;
