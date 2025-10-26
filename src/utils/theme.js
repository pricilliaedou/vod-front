import { createTheme } from "@mui/material/styles";
const theme = createTheme({
  cssVariables: true,
  typography: {
    fontFamily: '"Montserrat", sans-serif',
    allVariants: {
      color: "#5b5b5b",
    },
  },
  palette: {
    text: {
      primary: "#5b5b5b",
      secondary: "#5b5b5b",
    },
    primary: {
      light: "#C9C8FF",
      main: "#A09EFD",
      dark: "#6B69E6",
    },
    secondary: {
      light: "#FFF1C9",
      main: "#FFD45C",
      dark: "#FFC133",
    },
    tertiary: {
      light: "#E2F2E2",
      main: "#B6F2E2",
      dark: "#99E6E6",
    },
    quaternary: {
      light: "#FFE2E2",
      main: "#FF9979",
      dark: "#FF795C",
    },
    error: {
      main: "#FF0000",
    },
    warning: {
      main: "#FF0000",
    },
    info: {
      main: "#FF0000",
    },
    success: {
      main: "#FF0000",
    },
  },
});

export default theme;
