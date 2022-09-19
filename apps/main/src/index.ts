import { app } from "electron";
import { initObs } from "./ipc/obs.js";
import { initBrowser } from "./ipc/browser.js";
import { initYouTube } from "./ipc/youtube.js";
import { initConfig } from "./ipc/config.js";

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
