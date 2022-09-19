import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import React, { useCallback } from "react";
import { ObsStatus } from "../atom/ObsStatus";
import MenuIcon from "@mui/icons-material/Menu";
import { styled } from "@mui/material/styles";
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
        <IconButton edge="start" color="inherit" size="large">
          <MenuIcon />
        </IconButton>
        <HeaderTitile variant="h6">YouTube Live Chat Tool</HeaderTitile>
        <IconButton edge="end" color="inherit" onClick={handleConnect} size="large">
          <ObsStatus />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
