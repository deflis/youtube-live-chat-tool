import { ipcMain } from "electron";
import Store from "electron-store";
import { Channel, Config } from "ipc-interfaces/config.js";
import { fetchYouTubeVideosByChannel } from "../util/fetch.js";
import { toIpcResult } from "../util/toIpcResult.js";

export function initConfig() {
  const store = new Store<Config>({
    defaults: {
      channels: [],
      youtubeCss:
        "#panel-pages, yt-live-chat-message-input-renderer, yt-live-chat-viewer-engagement-message-renderer { display: none !important; }",
      mainWindowSize: {
        width: 800,
        height: 600,
      },
      chatWindowSize: {
        width: 300,
        height: 600,
      },
      browserSource: "",
    },
  });
  ipcMain.handle(
    "config.getChannels",
    toIpcResult(async (event) => {
      return store.get("channels");
    })
  );

  ipcMain.handle(
    "config.setChannels",
    toIpcResult((event, channels: Channel[]) => {
      store.set("channels", channels);
    })
  );
  ipcMain.handle(
    "config.addChannel",
    toIpcResult(async (event, id: string) => {
      const channels = store.get("channels").filter((_) => _.id !== id);
      const { name } = await fetchYouTubeVideosByChannel(id);
      store.set("channels", [...channels, { id, name }]);
    })
  );
  ipcMain.handle(
    "config.getBrowserSource",
    toIpcResult((event) => {
      return store.get("browserSource");
    })
  );
  ipcMain.handle(
    "config.setBrowserSource",
    toIpcResult((event, source: string) => {
      return store.set("browserSource", source);
    })
  );
  return store;
}
