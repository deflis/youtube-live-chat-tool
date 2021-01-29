import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../rootReducer";

type State = {};

const initialState: State = {};

const chat = createAsyncThunk("browser/chat", async (id: string) => {
  return window.browser.chat(id);
});

const browserModule = createSlice({
  name: "browser",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(chat.fulfilled, (state, action) => {
      return {
        ...state,
        channels: action.payload,
      };
    });
  },
});

export const browserThunks = {
  chat,
};

export const selectBrowser = (state: RootState) => state.browser;

export default browserModule;
