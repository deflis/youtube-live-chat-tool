import React, { useCallback } from "react";
import { useSelector } from "react-redux";

import { InputLabel, MenuItem } from "@material-ui/core";

import { selectVideoId, systemThunks } from "../../modules/system";
import { selectYouTubeVideos } from "../../modules/youtube";
import { useAppDispatch } from "../../store";
import { StyledFormControl } from "../atom/StyledFormControl";
import { StyledSelect } from "../atom/StyledSelect";

export function SelectVideo() {
  const videos = useSelector(selectYouTubeVideos);
  const current = useSelector(selectVideoId);
  const dispatch = useAppDispatch();
  const handleChange: React.ChangeEventHandler<{
    value: unknown;
  }> = useCallback(async (event) => {
    const id = event.target.value as string;
    dispatch(systemThunks.setVideoId(id));
  }, []);

  return (
    <>
      {videos && (
        <StyledFormControl variant="outlined">
          <InputLabel>動画</InputLabel>
          <StyledSelect value={current} onChange={handleChange}>
            {videos?.videos.map(({ id, title }) => (
              <MenuItem value={id} key={id}>
                {title}
              </MenuItem>
            ))}
          </StyledSelect>
        </StyledFormControl>
      )}
    </>
  );
}
