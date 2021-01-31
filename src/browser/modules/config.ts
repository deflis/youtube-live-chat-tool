import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import { Channel } from "../../interface/config";
import { fromIpcResult } from "../../util/fromIpcResult";
import { RootState } from "../rootReducer";

type State = {
  channels: Channel[];
  browserSource: string;
};

const initialState: State = {
  channels: [],
  browserSource: "",
};

const getChannels = createAsyncThunk("config/getChannel", () =>
  fromIpcResult(window.config.getChannels())
);

const setChannels = createAsyncThunk(
  "config/setChannels",
  async (channels: Channel[]) => {
    await fromIpcResult(window.config.setChannels(channels));
    return channels;
  }
);
const addChannel = createAsyncThunk("config/addChannel", async (id: string) => {
  await fromIpcResult(window.config.addChannel(id));
  return fromIpcResult(window.config.getChannels());
});

const getBrowserSource = createAsyncThunk("config/getBrowserSource", () =>
  fromIpcResult(window.config.getBrowserSource())
);

const setBrowserSource = createAsyncThunk(
  "config/setBrowserSource",
  async (source: string) => {
    await fromIpcResult(window.config.setBrowserSource(source));
    return source;
  }
);

const configModule = createSlice({
  name: "config",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getChannels.fulfilled, (state, action) => {
      return {
        ...state,
        channels: action.payload,
      };
    });
    builder.addCase(setChannels.fulfilled, (state, action) => {
      return {
        ...state,
        channels: action.payload,
      };
    });
    builder.addCase(addChannel.fulfilled, (state, action) => {
      return {
        ...state,
        channels: action.payload,
      };
    });
    builder.addCase(getBrowserSource.fulfilled, (state, action) => {
      return {
        ...state,
        browserSource: action.payload,
      };
    });
    builder.addCase(setBrowserSource.fulfilled, (state, action) => {
      return {
        ...state,
        browserSource: action.payload,
      };
    });
  },
});

export const configThunks = {
  getChannels,
  setChannels,
  addChannel,
  getBrowserSource,
  setBrowserSource,
};

export const selectConfig = (state: RootState) => state.config;

export const selectConfigChannels = createSelector(
  selectConfig,
  (state) => state.channels
);
export const selectConfigBrowserSource = createSelector(
  selectConfig,
  (state) => state.browserSource
);

export default configModule;
