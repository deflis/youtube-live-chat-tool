import React, { useCallback, useEffect } from "react";
import { useSelector } from "react-redux";

import { Button, IconButton, InputLabel } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";

import { configThunks, selectConfigBrowserSource } from "../../modules/config";
import {
  obsThunks,
  selectObsBrowserSources,
  selectObsStatus,
} from "../../modules/obs";
import { useAppDispatch } from "../../store";
import { StyledFormControl } from "../atom/StyledFormControl";
import { StyledSelect } from "../atom/StyledSelect";
import CachedIcon from "@mui/icons-material/Cached";
export interface SelectBrowserSourcesProps {}

export function SelectBrowserSources({}: SelectBrowserSourcesProps) {
  const current = useSelector(selectConfigBrowserSource);
  const sources = useSelector(selectObsBrowserSources);
  const status = useSelector(selectObsStatus);

  const dispatch = useAppDispatch();

  const handleChange: React.ChangeEventHandler<{
    name?: string | undefined;
    value: unknown;
  }> = useCallback(
    async (event) => {
      const source = event.target.value as string;
      dispatch(configThunks.setBrowserSource(source));
    },
    [dispatch]
  );

  const handleReconnect = useCallback(() => {
    dispatch(obsThunks.connect());
  }, [dispatch]);

  const handleReload = useCallback(() => {
    dispatch(obsThunks.getBrowserSources());
  }, [dispatch]);

  useEffect(() => {
    dispatch(obsThunks.getBrowserSources());
  }, [dispatch]);

  return <>
    {!status && (
      <>
        OBSに接続していません。OBSを起動して再接続してください。
        <Button variant="contained" onClick={handleReconnect}>
          再接続
        </Button>
      </>
    )}
    {status && (
      <StyledFormControl variant="outlined">
        <InputLabel>ソース</InputLabel>
        <StyledSelect
          value={current}
          onChange={handleChange}
          endAdornment={
            <IconButton onClick={handleReload} size="large">
              <CachedIcon />
            </IconButton>
          }
        >
          {sources?.map((source) => (
            <MenuItem value={source} key={source}>
              {source}
            </MenuItem>
          ))}
        </StyledSelect>
      </StyledFormControl>
    )}
  </>;
}
