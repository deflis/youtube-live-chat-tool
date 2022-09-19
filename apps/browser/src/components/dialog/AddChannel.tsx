import React, { useCallback, useEffect, useState } from "react";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";

import { configThunks } from "../../modules/config";
import { useAppDispatch } from "../../store";

export function AddChannel({
  open,
  toggleOpen,
}: {
  open: boolean;
  toggleOpen: () => void;
}) {
  const [newId, setNewId] = useState("");
  const dispatch = useAppDispatch();
  useEffect(() => {
    setNewId("");
  }, [open]);

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
          {"https://www.youtube.com/channel/{id} のid部分を入力してください"}
        </DialogContentText>
        <TextField
          variant="standard"
          autoFocus
          label="チャンネルID"
          fullWidth
          value={newId}
          onChange={handleChangeNewId} />
      </DialogContent>
      <DialogActions>
        <Button onClick={toggleOpen} color="primary">
          キャンセル
        </Button>
        <Button onClick={handleOk} color="primary">
          追加
        </Button>
      </DialogActions>
    </Dialog>
  );
}
