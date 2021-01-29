import React, { useEffect } from "react";

import { Container } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";

import { systemThunks } from "../modules/system";
import { useAppDispatch } from "../store";
import { ObsStatusToast } from "./atom/ObsStatus";
import { SelectBrowserSources } from "./atom/SelectBrowserSources";
import { Header } from "./common/Header";
import { SelectChannelAndVideo } from "./form/SelectChannelAndVideo";
import MyThemeProvider from "./MyThemeProvider";

export const App = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(systemThunks.onload());
  }, [dispatch]);
  return (
    <MyThemeProvider>
      <CssBaseline />
      <Header />
      <Container>
        <SelectChannelAndVideo />
        <SelectBrowserSources />
      </Container>
      <ObsStatusToast />
    </MyThemeProvider>
  );
};
