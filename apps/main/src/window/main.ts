import { BrowserWindow, shell } from "electron";
import { join } from "path";

import { ConfigStore } from "ipc-interfaces/config.js";
import { IpcEvent } from "../ipc/browser.js";

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
      nodeIntegration: false,
      contextIsolation: true,
      preload: join(__dirname, "../preload.js"),
    },
  }));
  win.setMenu(null);
  win.on("resize", () => {
    if (win) {
      const [width, height] = win.getSize();
      store.set("mainWindowSize", { width, height });
    }
  });
  win.webContents.on("new-window", (event, url) => {
    event.preventDefault();
    shell.openExternal(url);
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
  win.webContents.openDevTools();
}
