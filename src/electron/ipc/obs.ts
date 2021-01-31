import { ipcMain } from "electron";
import Obs from "obs-websocket-js";
import { ConfigStore } from "../../interface/config";
import { IpcResultValue } from "../../interface/ipc";
import { toIpcResult } from "../../util/toIpcResult";
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

export function initObs(store: ConfigStore) {
  ipcMain.handle(
    "obs.connect",
    async (event) =>
      ({
        status: await connect(store),
      } as IpcResultValue)
  );
  ipcMain.handle(
    "obs.getStatus",
    (event) => ({ status: true, result: status } as IpcResultValue<boolean>)
  );
  ipcMain.handle(
    "obs.getBrowserSources",
    toIpcResult((event) => {
      return getBrowserSources();
    })
  );
  ipcMain.handle(
    "obs.setLiveChatUrl",
    toIpcResult((event, id) => setLiveChatUrl(store.get("browserSource"), id))
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
