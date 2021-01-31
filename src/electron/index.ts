import { app } from "electron";
import { initObs } from "./ipc/obs";
import { initBrowser } from "./ipc/browser";
import { initYouTube } from "./ipc/youtube";
import { initConfig } from "./ipc/config";

app.once("ready", () => {
  const store = initConfig();
  initObs(store);
  initYouTube();
  initBrowser(store);

  app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
      app.quit();
    }
  });
});
