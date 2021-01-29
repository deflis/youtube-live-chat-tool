import React, { useCallback, useEffect, useState } from "react";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { FormControl, InputLabel } from "@material-ui/core";
import { Toast } from "./Toast";
import { useSelector } from "react-redux";
import { configThunks, selectConfigBrowserSource } from "../../modules/config";
import { obsThunks, selectObsBrowserSources } from "../../modules/obs";
import { useAppDispatch } from "../../store";
import { StyledSelect } from "./StyledSelect";
import { StyledFormControl } from "./StyledFormControl";

export interface SelectBrowserSourcesProps {}

export function SelectBrowserSources({}: SelectBrowserSourcesProps) {
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
  useEffect(() => {
    dispatch(obsThunks.getBrowserSources());
  }, [dispatch]);
  const current = useSelector(selectConfigBrowserSource);
  const sources = useSelector(selectObsBrowserSources);

  return (
    <>
      <StyledFormControl variant="outlined">
        <InputLabel>ソース</InputLabel>
        <StyledSelect value={current} onChange={handleChange}>
          {sources?.map((source) => (
            <MenuItem value={source} key={source}>
              {source}
            </MenuItem>
          ))}
        </StyledSelect>
      </StyledFormControl>
    </>
  );
}
