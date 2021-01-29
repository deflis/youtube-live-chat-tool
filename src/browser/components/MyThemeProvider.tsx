import React from "react";
import {
  MuiThemeProvider,
  createMuiTheme,
  ThemeOptions,
  Theme,
} from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import blue from "@material-ui/core/colors/blue";
import red from "@material-ui/core/colors/red";

declare module "@material-ui/core/styles/createMuiTheme" {
  interface Theme {}
  // allow configuration using `createMuiTheme`
  interface ThemeOptions {}
}

const theme: ThemeOptions = {
  typography: {
    fontFamily: ['"Noto Sans JP"', "sans-serif"].join(","),
  },
  overrides: {
    MuiSelect: {
      icon: {
        position: "relative",
        marginLeft: "-22px",
      },
    },
  },
};

const lightTheme = createMuiTheme(
  {
    palette: {
      type: "light",
      primary: blue,
      secondary: red,
    },
  },
  theme
);

const darkTheme = createMuiTheme(
  {
    palette: {
      type: "dark",
      primary: {
        main: blue[100],
      },
      secondary: {
        main: red[100],
      },
    },
  },
  theme
);

const darkmode = window.matchMedia("(prefers-color-scheme: dark)").matches;

const MyThemeProvider: React.FC = ({ children }) => {
  const currentTheme: Theme = darkmode ? darkTheme : lightTheme;

  return (
    <MuiThemeProvider theme={currentTheme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
};
export default MyThemeProvider;
