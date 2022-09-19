import { Channel } from "./config";
import { YouTubeVideos } from "./YouTubeVideos";

export type IpcResultValue<TResult = void, TError = any> =
  | {
      status: true;
      result: TResult;
    }
  | {
      status: false;
      error: TError;
    };

export type IpcResult<TResult = void, TError = any> = Promise<
  IpcResultValue<TResult, TError>
>;

export interface ObsIpc {
  connect(): IpcResult;
  getStatus(): IpcResult<boolean>;
  onStatusChange(handler: (status: boolean) => void): IpcResult<() => void>;
  getBrowserSources(): IpcResult<string[]>;
  setLiveChatUrl(id: string): IpcResult;
}

export interface YouTubeIpc {
  videosByChannel(id: string): IpcResult<YouTubeVideos>;
}

export interface BrowserIpc {
  chat(videoId: string): IpcResult;
}

export interface ConfigIpc {
  getChannels(): IpcResult<Channel[]>;
  setChannels(channels: Channel[]): IpcResult;
  addChannel(id: string): IpcResult;
  getBrowserSource(): IpcResult<string>;
  setBrowserSource(source: string): IpcResult<void>;
}
