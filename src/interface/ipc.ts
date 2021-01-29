import { Channel } from "./config";
import { YouTubeVideos } from "./YouTubeVideos";

export type IpcResut<TResult = void, TError = undefined> = Promise<{
  status: "ok" | "ng";
  result?: TResult;
  error?: TError;
}>;

export interface ObsIpc {
  connect(): Promise<boolean>;
  getStatus(): Promise<boolean>;
  onStatusChange(handler: (status: boolean) => void): Promise<() => void>;
  getBrowserSources(): Promise<string[]>;
  setLiveChatUrl(id: string): Promise<boolean>;
}

export interface YouTubeIpc {
  videosByChannel(id: string): Promise<YouTubeVideos>;
}

export interface BrowserIpc {
  chat(videoId: string): Promise<void>;
}

export interface ConfigIpc {
  getChannels(): Promise<Channel[]>;
  setChannels(channels: Channel[]): Promise<void>;
  addChannel(id: string): Promise<void>;
  getBrowserSource(): Promise<string>;
  setBrowserSource(source: string): Promise<void>;
}
