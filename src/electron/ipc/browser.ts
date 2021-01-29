import { app, BrowserWindow, ipcMain } from "electron";
import { join } from "path";
import { liveChatUrl } from "../../util/youtube";
import { ConfigStore } from "../../interface/config";
import { EventEmitter } from "events";
import { createChatViewer } from "../window/chat";
import { createWindow } from "../window/main";

type IpcEventEmitter = EventEmitter & {
  emit(event: "ipc", listener: (channel: string, ...args: any[]) => void): void;
  on(event: "ipc", listener: (channel: string, ...args: any[]) => void): void;
};

export const IpcEvent: IpcEventEmitter = new EventEmitter();

export function initBrowser(store: ConfigStore) {
  createWindow(store);

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow(store);
    }
  });

  ipcMain.handle("browser.chat", (event, videoId) =>
    createChatViewer(store, videoId)
  );
}
