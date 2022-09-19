import { AppBar, IconButton, Toolbar, Typography } from "@material-ui/core";
import React, { useCallback } from "react";
import { ObsStatus } from "../atom/ObsStatus";
import MenuIcon from "@material-ui/icons/Menu";
import { styled } from "@material-ui/core/styles";
import { useAppDispatch } from "../../store";
import { obsThunks } from "../../modules/obs";

const HeaderTitile = styled(Typography)({
  flexGrow: 1,
});

export function Header() {
  const dispatch = useAppDispatch();
  const handleConnect = useCallback(() => {
    dispatch(obsThunks.connect());
  }, []);
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit">
          <MenuIcon />
        </IconButton>
        <HeaderTitile variant="h6">YouTube Live Chat Tool</HeaderTitile>
        <IconButton edge="end" color="inherit" onClick={handleConnect}>
          <ObsStatus />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
