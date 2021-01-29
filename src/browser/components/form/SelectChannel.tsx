import React, { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { useToggle } from "react-use";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  InputLabel,
  MenuItem,
  TextField,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

import { configThunks, selectConfigChannels } from "../../modules/config";
import { selectChannelId, systemThunks } from "../../modules/system";
import { useAppDispatch } from "../../store";
import { StyledFormControl } from "../atom/StyledFormControl";
import { StyledSelect } from "../atom/StyledSelect";

export function SelectChannel() {
  const [addModal, toggleAddModal] = useToggle(false);
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
    <>
      <StyledFormControl variant="outlined">
        <InputLabel>チャンネル</InputLabel>
        <StyledSelect
          value={current}
          onChange={handleChange}
          endAdornment={
            <IconButton onClick={toggleAddModal}>
              <AddIcon />
            </IconButton>
          }
        >
          {channels.map(({ id, name }) => (
            <MenuItem value={id} key={id}>
              {name}
            </MenuItem>
          ))}
        </StyledSelect>
      </StyledFormControl>
      <AddDialog open={addModal} toggleOpen={toggleAddModal} />
    </>
  );
}

function AddDialog({
  open,
  toggleOpen,
}: {
  open: boolean;
  toggleOpen: () => void;
}) {
  const [newId, setNewId] = useState("");
  const dispatch = useAppDispatch();

  const handleChangeNewId: React.ChangeEventHandler<HTMLInputElement> = useCallback(
    async (event) => {
      const source = event.target.value as string;
      setNewId(source);
    },
    []
  );
  const handleOk = useCallback(() => {
    dispatch(configThunks.addChannel(newId));
    toggleOpen();
  }, [newId, dispatch]);

  return (
    <Dialog open={open} onClose={toggleOpen}>
      <DialogTitle>チャンネル追加</DialogTitle>
      <DialogContent>
        <DialogContentText>
          https://www.youtube.com/channel/{"{id}"}のid部分を入力してください
        </DialogContentText>
        <TextField
          autoFocus
          label="チャンネルID"
          fullWidth
          value={newId}
          onChange={handleChangeNewId}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={toggleOpen} color="primary">
          Cancel
        </Button>
        <Button onClick={handleOk} color="primary">
          Subscribe
        </Button>
      </DialogActions>
    </Dialog>
  );
}
