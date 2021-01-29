import { ipcMain } from "electron";
import Store from "electron-store";
import { Channel, Config } from "../../interface/config";
import { fetchYouTubeVideosByChannel } from "../../util/fetch";

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
  ipcMain.handle("config.getChannels", async (event) => {
    return store.get("channels");
  });
  ipcMain.handle("config.setChannels", (event, channels: Channel[]) => {
    store.set("channels", channels);
  });
  ipcMain.handle("config.addChannel", async (event, id: string) => {
    const channels = store.get("channels").filter((_) => _.id !== id);
    const { name } = await fetchYouTubeVideosByChannel(id);
    store.set("channels", [...channels, { id, name }]);
  });
  ipcMain.handle("config.getBrowserSource", (event) => {
    return store.get("browserSource");
  });
  ipcMain.handle("config.setBrowserSource", (event, source: string) => {
    return store.set("browserSource", source);
  });
  return store;
}
