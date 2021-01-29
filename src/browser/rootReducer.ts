import { combineReducers } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import browserModule from "./modules/browser";
import configModule from "./modules/config";
import obsModule from "./modules/obs";
import systemModule from "./modules/system";
import youtubeModule from "./modules/youtube";
import { AppDispatch } from "./store";

const rootReducer = combineReducers({
  browser: browserModule.reducer,
  config: configModule.reducer,
  obs: obsModule.reducer,
  youtube: youtubeModule.reducer,
  system: systemModule.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export type AsyncThunkConfig<T = unknown> = {
  state: RootState;
  dispatch: AppDispatch;
  rejectValue: T;
};

export default rootReducer;
