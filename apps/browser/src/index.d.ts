import { BrowserIpc, ConfigIpc, ObsIpc, YouTubeIpc } from "ipc-interfaces/ipc";

declare module "*.png";
declare module "*.jpg";
declare module "*.gif";

declare global {
  interface Window {
    obs: ObsIpc;
    youtube: YouTubeIpc;
    browser: BrowserIpc;
    config: ConfigIpc;
  }
}
