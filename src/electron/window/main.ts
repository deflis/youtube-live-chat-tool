import { BrowserWindow } from "electron";
import { join } from "path";

import { ConfigStore } from "../../interface/config";
import { IpcEvent } from "../ipc/browser";

let window: BrowserWindow | null = null;

export function createWindow(store: ConfigStore) {
  if (window) {
    window.show();
    return;
  }
  const { width, height } = store.get("mainWindowSize", {
    width: 800,
    height: 600,
  });
  const win = (window = new BrowserWindow({
    width,
    height,
    webPreferences: {
      worldSafeExecuteJavaScript: true,
      nodeIntegration: false,
      contextIsolation: true,
      preload: join(__dirname, "preload.js"),
    },
  }));
  win.on("resize", () => {
    if (win) {
      const [width, height] = win.getSize();
      store.set("mainWindowSize", { width, height });
    }
  });
  const handler = (channel: string, ...args: any[]) => {
    win.webContents.send(channel, ...args);
  };
  win.on("close", () => {
    window = null;
    IpcEvent.off("ipc", handler);
  });
  IpcEvent.on("ipc", handler);

  win.loadFile(join(__dirname, "../browser/index.html"));
}
