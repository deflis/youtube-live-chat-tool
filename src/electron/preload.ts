import { contextBridge, ipcRenderer } from "electron";
import { BrowserIpc, ConfigIpc, ObsIpc, YouTubeIpc } from "../interface/ipc";

contextBridge.exposeInMainWorld("obs", {
  connect: () => {
    return ipcRenderer.invoke("obs.connect");
  },
  getStatus: () => {
    return ipcRenderer.invoke("obs.getStatus");
  },
  onStatusChange: async (f) => {
    const listener = (e: Electron.IpcRendererEvent, status: boolean) =>
      f(status);
    ipcRenderer.on("obs.onStatusChange", listener);
    return () => {
      ipcRenderer.off("obs.onStatusChange", listener);
    };
  },
  getBrowserSources: () => {
    return ipcRenderer.invoke("obs.getBrowserSources");
  },
  setLiveChatUrl: (id) => {
    return ipcRenderer.invoke("obs.setLiveChatUrl", id);
  },
} as ObsIpc);

contextBridge.exposeInMainWorld("youtube", {
  videosByChannel: (channelId) => {
    return ipcRenderer.invoke("youtube.videosByChannel", channelId);
  },
} as YouTubeIpc);

contextBridge.exposeInMainWorld("browser", {
  chat: (videoId) => {
    return ipcRenderer.invoke("browser.chat", videoId);
  },
} as BrowserIpc);

contextBridge.exposeInMainWorld("config", {
  getChannels: () => {
    return ipcRenderer.invoke("config.getChannels");
  },
  setChannels: (channels) => {
    return ipcRenderer.invoke("config.setChannels", channels);
  },
  addChannel: (id) => {
    return ipcRenderer.invoke("config.addChannel", id);
  },
  getBrowserSource: () => {
    return ipcRenderer.invoke("config.getBrowserSource");
  },
  setBrowserSource: (source) => {
    return ipcRenderer.invoke("config.setBrowserSource", source);
  },
} as ConfigIpc);
