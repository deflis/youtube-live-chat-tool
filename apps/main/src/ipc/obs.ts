import { ipcMain } from "electron";
import Obs from "obs-websocket-js";
import { ConfigStore } from "ipc-interfaces/config.js";
import { IpcResultValue } from "ipc-interfaces/ipc.js";
import { toIpcResult } from "../util/toIpcResult.js";
import { liveChatUrl } from "../util/youtube.js";
import { IpcEvent } from "./browser.js";

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
  const { address, password } = store.get("obsConnectOption") ?? {};
  try {
    await obs.connect(address, password);
    return true;
  } catch {
    return false;
  }
}

async function getBrowserSources() {
  const list = await obs.call("GetInputList", {
    inputKind: SOURCE_TYPE_BROWSER_SOURCE,
  });
  const sources: { inputName?: string }[] = list.inputs;
  return sources.map((source) => source.inputName!);
}

async function setLiveChatUrl(inputName: string, id: string) {
  const res = await obs.call("SetInputSettings", {
    inputName,
    inputSettings: {
      url: liveChatUrl(id),
    },
  });
  return true;
}
