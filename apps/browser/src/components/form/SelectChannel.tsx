import React, { useCallback } from "react";
import { useSelector } from "react-redux";
import { useToggle } from "react-use";

import {
  Box,
  Button,
  Grid,
  InputLabel,
  MenuItem,
  styled,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import BuildIcon from "@mui/icons-material/Build";

import { selectConfigChannels } from "../../modules/config";
import { selectChannelId, systemThunks } from "../../modules/system";
import { useAppDispatch } from "../../store";
import { StyledFormControl } from "../atom/StyledFormControl";
import { StyledSelect } from "../atom/StyledSelect";
import { AddChannel } from "../dialog/AddChannel";
import { EditChannels } from "../dialog/EditChannels";

const Spacing = styled(Box)(({ theme }) => ({
  margin: theme.spacing(1),
}));

export function SelectChannel() {
  const [add, toggleAdd] = useToggle(false);
  const [edit, toggleEdit] = useToggle(false);

  const current = useSelector(selectChannelId);
  const channels = useSelector(selectConfigChannels);

  const dispatch = useAppDispatch();
  const handleChange: React.ChangeEventHandler<{
    value: unknown;
  }> = useCallback(
    async (event) => {
      const value = event.target.value as string;
      dispatch(systemThunks.setChannelId(value));
    },
    [dispatch]
  );

  return (
    <Grid container>
      {channels.length > 0 && (
        <Grid item>
          <StyledFormControl variant="outlined">
            <InputLabel>チャンネル</InputLabel>
            <StyledSelect value={current} onChange={handleChange}>
              {channels.map(({ id, name }) => (
                <MenuItem value={id} key={id}>
                  {name}
                </MenuItem>
              ))}
            </StyledSelect>
          </StyledFormControl>
        </Grid>
      )}
      <Grid item>
        <Spacing>
          <Button variant="contained" onClick={toggleAdd}>
            <AddIcon />
            追加
          </Button>
        </Spacing>
      </Grid>
      {channels.length > 0 && (
        <Grid item>
          <Spacing>
            <Button variant="contained" onClick={toggleEdit}>
              <BuildIcon />
              管理
            </Button>
          </Spacing>
        </Grid>
      )}
      <AddChannel open={add} toggleOpen={toggleAdd} />
      <EditChannels open={edit} toggleOpen={toggleEdit} />
    </Grid>
  );
}
