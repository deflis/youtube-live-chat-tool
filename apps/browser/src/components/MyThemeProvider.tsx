import React from "react";
import {
  ThemeProvider,
  StyledEngineProvider,
  createTheme,
  DeprecatedThemeOptions,
  Theme,
  adaptV4Theme,
  ThemeOptions,
} from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { blue, red } from "@mui/material/colors";

const theme: ThemeOptions = {
  typography: {
    fontFamily: ['"Noto Sans JP"', "sans-serif"].join(","),
  },
  components: {
    MuiSelect: {
      styleOverrides: {
        icon: {
          position: "relative",
          marginLeft: "-22px",
        },
      },
    },
  },
};

const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: blue,
    secondary: red,
  },
  ...theme,
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: blue[100],
    },
    secondary: {
      main: red[100],
    },
  },
  ...theme,
});

const darkmode = window.matchMedia("(prefers-color-scheme: dark)").matches;

const MyThemeProvider: React.FC = ({ children }) => {
  const currentTheme: Theme = darkmode ? darkTheme : lightTheme;

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={currentTheme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </StyledEngineProvider>
  );
};
export default MyThemeProvider;
