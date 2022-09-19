import React, { useEffect } from "react";

import { Container, Grid, Paper, styled, Typography } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";

import { systemThunks } from "../modules/system";
import { useAppDispatch } from "../store";
import { ObsStatusToast } from "./atom/ObsStatus";
import { Steps } from "./atom/Steps";
import { Header } from "./common/Header";
import { ChatControls } from "./form/ChatControls";
import { SelectBrowserSources } from "./form/SelectBrowserSources";
import { SelectChannel } from "./form/SelectChannel";
import { SelectVideo } from "./form/SelectVideo";
import MyThemeProvider from "./MyThemeProvider";

const StyledPaper = styled(Paper)(({ theme }) => ({
  margin: theme.spacing(1),
}));

const Title = styled(Typography)(({ theme }) => ({
  margin: theme.spacing(1),
}));

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
        <StyledPaper>
          <Grid container>
            <Grid item xs={12}>
              <Steps />
            </Grid>
            <Grid item xs={12} spacing={2}>
              <Title variant="subtitle1">OBSの設定</Title>
              <SelectBrowserSources />
            </Grid>
            <Grid item xs={12}>
              <Title variant="subtitle1">YouTubeの設定</Title>
            </Grid>
            <Grid item xs={12}>
              <SelectChannel />
            </Grid>
            <Grid item xs={12}>
              <SelectVideo />
            </Grid>
            <Grid item xs={12}>
              <ChatControls />
            </Grid>
          </Grid>
        </StyledPaper>
      </Container>
      <ObsStatusToast />
    </MyThemeProvider>
  );
};
