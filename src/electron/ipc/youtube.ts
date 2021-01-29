import { ipcMain } from "electron";
import { fetchYouTubeVideosByChannel } from "../../util/fetch";

export function initYouTube() {
  ipcMain.handle("youtube.videosByChannel", (event, id: string) =>
    fetchYouTubeVideosByChannel(id)
  );
}
