import Store from "electron-store";

export type ConfigStore = Store<Config>;

export interface Config {
  youtubeCss: string;
  channels: Channel[];
  mainWindowSize: WindowSize;
  chatWindowSize: WindowSize;
  obsConnectOption?: { address?: string; password?: string; secure?: boolean };
  browserSource: string;
}

export interface Channel {
  id: string;
  name: string;
}

export interface WindowSize {
  width: number;
  height: number;
}

