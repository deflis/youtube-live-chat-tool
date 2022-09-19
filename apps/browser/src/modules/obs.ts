import {
  createAsyncThunk,
  createSelector,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { fromIpcResult } from "../util/fromIpcResult";
import { AsyncThunkConfig, RootState } from "../rootReducer";

type State = { status: boolean; browserSources: string[] };

const initialState: State = {
  status: false,
  browserSources: [],
};
const listenStatusChange = createAsyncThunk<void, void, AsyncThunkConfig>(
  "obs/listenStatusChange",
  async (_, { dispatch, signal }) => {
    const unsubscribe = await fromIpcResult(
      window.obs.onStatusChange((status) => {
        dispatch(obsModule.actions.changeStatus(status));
        dispatch(getBrowserSources());
      })
    );
    signal.addEventListener("abort", () => {
      unsubscribe();
    });
    return;
  }
);

const connect = createAsyncThunk("obs/connect", () =>
  fromIpcResult(window.obs.connect())
);

const getStatus = createAsyncThunk("obs/getStatus", () =>
  fromIpcResult(window.obs.getStatus())
);

const getBrowserSources = createAsyncThunk("obs/getBrowserSources", () =>
  fromIpcResult(window.obs.getBrowserSources())
);

const setLiveChatUrl = createAsyncThunk("obs/setLiveChatUrl", (id: string) =>
  fromIpcResult(window.obs.setLiveChatUrl(id))
);

const obsModule = createSlice({
  name: "obs",
  initialState,
  reducers: {
    changeStatus: (state, action: PayloadAction<boolean>) => {
      return { ...state, status: action.payload };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(connect.fulfilled, (state) => {
      return {
        ...state,
      };
    });
    builder.addCase(getStatus.fulfilled, (state, action) => {
      return {
        ...state,
        status: action.payload,
      };
    });
    builder.addCase(getBrowserSources.fulfilled, (state, action) => {
      return {
        ...state,
        browserSources: action.payload,
      };
    });
    builder.addCase(setLiveChatUrl.fulfilled, (state, action) => {
      return {
        ...state,
      };
    });
  },
});

export const obsThunks = {
  listenStatusChange,
  connect,
  getStatus,
  getBrowserSources,
  setLiveChatUrl,
};

export const selectObs = (state: RootState) => state.obs;

export const selectObsBrowserSources = createSelector(
  selectObs,
  (state) => state.browserSources
);
export const selectObsStatus = createSelector(
  selectObs,
  (state) => state.status
);

export default obsModule;
