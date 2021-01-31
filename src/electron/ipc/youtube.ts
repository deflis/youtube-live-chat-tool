import { ipcMain } from "electron";
import { fetchYouTubeVideosByChannel } from "../../util/fetch";
import { toIpcResult } from "../../util/toIpcResult";

export function initYouTube() {
  ipcMain.handle(
    "youtube.videosByChannel",
    toIpcResult((event, id: string) => fetchYouTubeVideosByChannel(id))
  );
}
