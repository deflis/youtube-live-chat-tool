import React, { useCallback } from "react";

import { Button } from "@material-ui/core";

import { useAppDispatch } from "../../store";
import { SelectChannel } from "./SelectChannel";
import { SelectVideo } from "./SelectVideo";
import { systemThunks } from "../../modules/system";

export const SelectChannelAndVideo = () => {
  const dispatch = useAppDispatch();

  const openBrowser = useCallback(() => {
    dispatch(systemThunks.openBrowserChat());
  }, [dispatch]);
  const changeSource = useCallback(() => {
    dispatch(systemThunks.changeBrowserSource());
  }, [dispatch]);
  return (
    <div>
      <form>
        <SelectChannel />
        <SelectVideo />
        <Button onClick={openBrowser}>開く</Button>
        <Button onClick={changeSource}>OBSを変更</Button>
      </form>
    </div>
  );
};
