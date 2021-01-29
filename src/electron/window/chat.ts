import {
  BrowserWindow,
  Menu,
  MenuItem,
  MenuItemConstructorOptions,
  shell,
} from "electron";
import { ConfigStore } from "../../interface/config";
import { liveChatUrl } from "../../util/youtube";
import { createWindow } from "./main";

const windows = new Map<string, BrowserWindow>();

export function createChatViewer(store: ConfigStore, id: string) {
  if (windows.has(id)) {
    windows.get(id)?.show();
    return;
  }
  const { width, height } = store.get("chatWindowSize", {
    width: 800,
    height: 600,
  });
  const win = new BrowserWindow({
    width,
    height,
    webPreferences: {
      worldSafeExecuteJavaScript: true,
      nodeIntegration: false,
      contextIsolation: true,
    },
  });
  windows.set(id, win);
  // ElectronのMenuの設定
  const templateMenu: (MenuItemConstructorOptions | MenuItem)[] = [
    {
      label: "ウィンドウ",
      submenu: [
        {
          id: "alwaysOnTop",
          label: "常に最前面に表示",
          type: "checkbox",
          checked: false,
          click: (item) => {
            const alwaysOnTop = !win.isAlwaysOnTop();
            win.setAlwaysOnTop(alwaysOnTop);
            item.checked = alwaysOnTop;
          },
        },
        {
          type: "separator",
        },
        {
          label: "メイン画面を開く",
          click: () => {
            createWindow(store);
          },
        },
        {
          role: "close",
          label: "閉じる",
        },
      ],
    },
  ];
  const menu = Menu.buildFromTemplate(templateMenu);
  win.setMenu(menu);

  win.on("resize", () => {
    const [width, height] = win.getSize();
    store.set("chatWindowSize", { width, height });
  });

  win.webContents.on("page-title-updated", (_, title) => {
    win.setTitle(title);
  });
  win.webContents.on("did-finish-load", () => {
    win.webContents.insertCSS(store.get("youtubeCss", ""));
  });
  win.on("close", () => {
    windows.delete(id);
  });
  win.webContents.on("new-window", (event, url) => {
    event.preventDefault();
    shell.openExternal(url);
  });
  win.loadURL(liveChatUrl(id));
}
