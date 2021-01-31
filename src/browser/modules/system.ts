import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import { AsyncThunkConfig, RootState } from "../rootReducer";
import { browserThunks } from "./browser";
import { configThunks } from "./config";
import { obsThunks } from "./obs";
import { youtubeThunks } from "./youtube";

type State = {
  channelId: string;
  videoId: string;
};

const initialState: State = {
  channelId: "",
  videoId: "",
};

const onload = createAsyncThunk<void, void, AsyncThunkConfig>(
  "system/onload",
  async (_, { dispatch }) => {
    await Promise.all([
      dispatch(configThunks.getBrowserSource()),
      dispatch(configThunks.getChannels()),
    ]);
    await dispatch(obsThunks.listenStatusChange());
    await Promise.all([
      dispatch(obsThunks.connect()),
      dispatch(obsThunks.getStatus()),
      dispatch(obsThunks.getBrowserSources()),
    ]);
  }
);

const setChannelId = createAsyncThunk<string, string, AsyncThunkConfig>(
  "system/setChannelId",
  async (id, { dispatch }) => {
    if (id !== "") {
      dispatch(youtubeThunks.videosByChannel(id));
    }
    return id;
  }
);

const setVideoId = createAsyncThunk<string, string, AsyncThunkConfig>(
  "system/setVideoId",
  async (id) => {
    return id;
  }
);

const openBrowserChat = createAsyncThunk<void, void, AsyncThunkConfig>(
  "system/openBrowserChat",
  async (_, { dispatch, getState }) => {
    const state = getState();
    dispatch(browserThunks.chat(state.system.videoId));
    return;
  }
);

const changeBrowserSource = createAsyncThunk<void, void, AsyncThunkConfig>(
  "system/changeBrowserSource",
  async (_, { dispatch, getState }) => {
    const state = getState();
    dispatch(obsThunks.setLiveChatUrl(state.system.videoId));
    return;
  }
);

const systemModule = createSlice({
  name: "system",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(onload.fulfilled, (state) => state);
    builder.addCase(setChannelId.fulfilled, (state, action) => {
      return { ...state, channelId: action.payload };
    });
    builder.addCase(setVideoId.fulfilled, (state, action) => {
      return { ...state, videoId: action.payload };
    });
    builder.addCase(openBrowserChat.fulfilled, (state) => state);
    builder.addCase(changeBrowserSource.fulfilled, (state) => state);
  },
});

export const systemThunks = {
  onload,
  setChannelId,
  setVideoId,
  openBrowserChat,
  changeBrowserSource,
};

export const selectSystem = (state: RootState) => state.system;

export const selectChannelId = createSelector(
  selectSystem,
  (state) => state.channelId
);
export const selectVideoId = createSelector(
  selectSystem,
  (state) => state.videoId
);

export const selectIsSetVideoId = createSelector(
  selectSystem,
  (state) => state.videoId !== ""
);
export const selectSystemSteps = createSelector(
  (state: RootState) => state.system.channelId,
  (state: RootState) => state.system.videoId,
  (state: RootState) => state.obs.status,
  (channelId, videoId, status) => {
    if (channelId === "") return 0;
    if (videoId === "") return 1;
    if (!status) return 2;
    return 3;
  }
);

export default systemModule;
