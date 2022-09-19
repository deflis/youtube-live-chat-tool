import { ipcMain } from "electron";
import { fetchYouTubeVideosByChannel } from "../util/fetch.js";
import { toIpcResult } from "../util/toIpcResult.js";

export function initYouTube() {
  ipcMain.handle(
    "youtube.videosByChannel",
    toIpcResult((event, id: string) => fetchYouTubeVideosByChannel(id))
  );
}
