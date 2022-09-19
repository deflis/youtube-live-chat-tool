import { app, BrowserWindow, ipcMain } from "electron";
import { EventEmitter } from "events";

import { ConfigStore } from "ipc-interfaces/config.js";
import { createChatViewer } from "../window/chat.js";
import { createWindow } from "../window/main.js";

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
