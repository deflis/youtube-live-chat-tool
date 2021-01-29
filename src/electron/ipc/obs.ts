import { ipcMain } from "electron";
import Obs from "obs-websocket-js";
import { ConfigStore } from "../../interface/config";
import { liveChatUrl } from "../../util/youtube";
import { IpcEvent } from "./browser";

const SOURCE_TYPE_BROWSER_SOURCE = "browser_source";
const obs = new Obs();
let status = false;

obs.on("ConnectionOpened", () => {
  status = true;
  IpcEvent.emit("ipc", "obs.onStatusChange", status);
});
obs.on("ConnectionClosed", () => {
  status = false;
  IpcEvent.emit("obs.onStatusChange", status);
});

export async function initObs(store: ConfigStore) {
  await connect(store);
  ipcMain.handle("obs.connect", (event) => connect(store));
  ipcMain.handle("obs.getStatus", (event) => status);
  ipcMain.handle("obs.getBrowserSources", (event) => {
    if (!status) connect(store);
    return getBrowserSources();
  });
  ipcMain.handle("obs.setLiveChatUrl", (event, id) =>
    setLiveChatUrl(store.get("browserSource"), id)
  );
}

async function connect(store: ConfigStore): Promise<boolean> {
  const option = store.get("obsConnectOption");
  try {
    await obs.connect(option);
    return true;
  } catch {
    return false;
  }
}

async function getBrowserSources() {
  const list = await obs.send("GetSourcesList");
  const sources = (list.sources as any) as {
    name: string;
    type: string;
    typeId: string;
  }[];
  return sources
    .filter((source) => source.typeId === SOURCE_TYPE_BROWSER_SOURCE)
    .map((source) => source.name);
}

async function setLiveChatUrl(sourceName: string, id: string) {
  const res = await obs.send("SetSourceSettings", {
    sourceName,
    sourceType: SOURCE_TYPE_BROWSER_SOURCE,
    sourceSettings: {
      url: liveChatUrl(id),
    },
  });
  return res.status === "ok";
}
