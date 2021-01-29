import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Radio,
} from "@material-ui/core";

import { configThunks, selectConfigChannels } from "../../modules/config";
import { useAppDispatch } from "../../store";
import { current } from "@reduxjs/toolkit";
import { swapArrayElements } from "../../../util/array";

export function EditChannels({
  open,
  toggleOpen,
}: {
  open: boolean;
  toggleOpen: () => void;
}) {
  const configChannels = useSelector(selectConfigChannels);
  const [selected, setSelected] = useState("");

  const [channels, setChannels] = useState(configChannels);

  const dispatch = useAppDispatch();
  useEffect(() => {
    setSelected("");
    setChannels(configChannels);
  }, [configChannels, open]);

  const handleOk = useCallback(() => {
    dispatch(configThunks.setChannels(channels));
    toggleOpen();
  }, [channels, dispatch]);

  const index = useMemo(() => channels.map((_) => _.id).indexOf(selected), [
    channels,
    selected,
  ]);

  const handleDelete = useCallback(() => {
    setChannels((array) => array.filter((x) => x.id !== selected));
  }, [selected]);
  const handleUp = useCallback(() => {
    setChannels((array) => swapArrayElements(array, index - 1));
  }, [index]);
  const handleDown = useCallback(() => {
    setChannels((array) => swapArrayElements(array, index));
  }, [index]);

  const disableUp = useMemo(
    () => channels.length < 1 || index === -1 || index < 1,
    [channels, index]
  );
  const disableDown = useMemo(
    () => channels.length < 1 || index === -1 || index >= channels.length - 1,
    [channels, index]
  );

  return (
    <Dialog open={open} onClose={toggleOpen} fullWidth>
      <DialogTitle>チャンネル管理</DialogTitle>
      <DialogContent>
        <Button onClick={handleUp} disabled={disableUp}>
          ↑
        </Button>
        <Button onClick={handleDown} disabled={disableDown}>
          ↓
        </Button>
        <Button onClick={handleDelete} disabled={index === -1}>
          削除
        </Button>
        <List>
          {channels.map(({ id, name }) => (
            <ListItem key={id} button onClick={() => setSelected(id)}>
              <ListItemIcon>
                <Radio edge="start" checked={id === selected} tabIndex={-1} />
              </ListItemIcon>
              <ListItemText id={id} primary={name} secondary={id} />
            </ListItem>
          ))}
        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={toggleOpen} color="primary">
          キャンセル
        </Button>
        <Button onClick={handleOk} color="primary">
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
}
