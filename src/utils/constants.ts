export const AppConstants = {
  // Colors
  colors: {
    primary: "#2F2F2F",
    secondary: "#3f51b5",
    error: "#f44336",
    success: "#4caf50",
    warning: "#ff9800",
    info: "#2196f3",
    background: "#fafafa",
    paper: "#ffffff",
    text: {
      primary: "rgba(0, 0, 0, 0.87)",
      secondary: "rgba(0, 0, 0, 0.6)",
      disabled: "rgba(0, 0, 0, 0.38)",
    },
  },

  // Typography
  fonts: {
    primary: "Vollkorn",
    secondary: "Roboto",
  },

  // Spacing
  spacing: {
    xs: 4,
    small: 8,
    medium: 16,
    large: 24,
    xl: 32,
    xxl: 48,
  },

  // Border Radius
  borderRadius: {
    small: 4,
    medium: 8,
    large: 12,
    round: "50%",
  },

  // Breakpoints
  breakpoints: {
    xs: 0,
    sm: 600,
    md: 960,
    lg: 1280,
    xl: 1920,
  },

  // Z-index
  zIndex: {
    appBar: 1100,
    drawer: 1200,
    modal: 1300,
    snackbar: 1400,
    tooltip: 1500,
  },

  // Animation
  animation: {
    duration: {
      shortest: 150,
      shorter: 200,
      short: 250,
      standard: 300,
      complex: 375,
      enteringScreen: 225,
      leavingScreen: 195,
    },
    easing: {
      easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
      easeOut: "cubic-bezier(0.0, 0, 0.2, 1)",
      easeIn: "cubic-bezier(0.4, 0, 1, 1)",
      sharp: "cubic-bezier(0.4, 0, 0.6, 1)",
    },
  },

  // Routes
  routes: {
    home: "/",
    tour: "/:id",
    register: "/register",
    login: "/login",
  },
} as const;

// Types
export type AppColor = keyof typeof AppConstants.colors;
export type AppSpacing = keyof typeof AppConstants.spacing;
export type AppBorderRadius = keyof typeof AppConstants.borderRadius;
export type AppBreakpoint = keyof typeof AppConstants.breakpoints;
export type AppRoute = keyof typeof AppConstants.routes;
