import React, { useCallback } from "react";
import { useSelector } from "react-redux";

import { Box, Button, Grid, styled } from "@mui/material";

import { selectObsStatus } from "../../modules/obs";
import {
  systemThunks,
  selectIsSetVideoId,
  selectVideoId,
} from "../../modules/system";
import { useAppDispatch } from "../../store";

const Spacing = styled(Box)(({ theme }) => ({
  margin: theme.spacing(1),
}));

export const ChatControls = () => {
  const dispatch = useAppDispatch();
  const status = useSelector(selectObsStatus);
  const enable = useSelector(selectIsSetVideoId);
  const videoId = useSelector(selectVideoId);

  const openBrowser = useCallback(() => {
    dispatch(systemThunks.openBrowserChat());
  }, [dispatch]);
  const changeSource = useCallback(() => {
    dispatch(systemThunks.changeBrowserSource());
  }, [dispatch]);
  return (
    <Grid container spacing={3}>
      {enable && (
        <Grid item>
          <Spacing>
            <Button variant="contained" color="primary" onClick={openBrowser}>
              チャットを開く
            </Button>
          </Spacing>
        </Grid>
      )}
      {enable && (
        <Grid item>
          <Spacing>
            <Button
              variant="contained"
              color="primary"
              component="a"
              href={`https://www.youtube.com/watch?v=${videoId}`}
              target="_blank"
            >
              ブラウザで開く
            </Button>
          </Spacing>
        </Grid>
      )}
      {enable && (
        <Grid item>
          <Spacing>
            <Button
              variant="contained"
              color="primary"
              component="a"
              href={`https://studio.youtube.com/video/${videoId}/livestreaming`}
              target="_blank"
            >
              ライブ配信ページを開く
            </Button>
          </Spacing>
        </Grid>
      )}
       {enable && status && (
        <Grid item>
          <Spacing>
            <Button variant="contained" color="primary" onClick={changeSource}>
              OBSに設定
            </Button>
          </Spacing>
        </Grid>
      )}
    </Grid>
  );
};
