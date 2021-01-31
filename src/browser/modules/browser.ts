import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fromIpcResult } from "../../util/fromIpcResult";
import { RootState } from "../rootReducer";

type State = {};

const initialState: State = {};

const chat = createAsyncThunk("browser/chat", (id: string) =>
  fromIpcResult(window.browser.chat(id))
);

const browserModule = createSlice({
  name: "browser",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(chat.fulfilled, (state, action) => state);
  },
});

export const browserThunks = {
  chat,
};

export const selectBrowser = (state: RootState) => state.browser;

export default browserModule;
