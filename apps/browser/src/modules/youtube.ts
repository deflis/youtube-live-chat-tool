import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import { YouTubeVideos } from "ipc-interfaces/YouTubeVideos";
import { fromIpcResult } from "../util/fromIpcResult";
import { RootState } from "../rootReducer";

type State = {
  videos?: YouTubeVideos;
};

const initialState: State = {};

const videosByChannel = createAsyncThunk(
  "youtube/videosByChannel",
  (id: string) => fromIpcResult(window.youtube.videosByChannel(id))
);

const youtubeModule = createSlice({
  name: "youtube",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(videosByChannel.fulfilled, (state, action) => {
      return {
        ...state,
        videos: action.payload,
      };
    });
  },
});

export const youtubeThunks = {
  videosByChannel,
};

export const selectYouTube = (state: RootState) => state.youtube;

export const selectYouTubeVideos = createSelector(
  selectYouTube,
  (state) => state.videos
);

export default youtubeModule;
