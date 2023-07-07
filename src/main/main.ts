import path from "path";
import {
  app,
  BrowserWindow,
  shell,
  ipcMain,
  Menu,
  IpcMainEvent,
} from "electron";
import { autoUpdater } from "electron-updater";
import log from "electron-log";
import { resolveHtmlPath } from "./util";
import {
  ADD_FOLDER_TO_LITE,
  CURRENT_WINDOW_NAME,
  DELETE_FILE,
  GET_AUDIO_FILES,
  GET_HOME_DIR,
  GET_LITE_FOLDERS,
  TYPE_SELECTOR_WINDOW_CLOSE,
} from "../ipcEvents";
import handleTypeSelectorClose from "./ipcHandlers/handleTypeSelectorClose";
import getHomeDir from "./ipcHandlers/getHomeDir";
import addLiteDir from "./ipcHandlers/addLiteDir";
import getLiteFolders from "./ipcHandlers/getLiteFolders";
import getAudioFiles from "./ipcHandlers/getAudioFiles";
import deleteFile from "./ipcHandlers/deleteFile";
import * as ipcEvents from "../ipcEvents";
import registerAllEvents from "./ipcListeners";

class AppUpdater {
  constructor() {
    log.transports.file.level = "info";
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify();
  }
}

let typeSelectorWindow: BrowserWindow | null = null;
let mainWindow: BrowserWindow | null = null;

if (process.env.NODE_ENV === "production") {
  const sourceMapSupport = require("source-map-support");
  sourceMapSupport.install();
}

const isDebug =
  process.env.NODE_ENV === "development" || process.env.DEBUG_PROD === "true";

if (isDebug) {
  require("electron-debug")();
}

const installExtensions = async () => {
  const installer = require("electron-devtools-installer");
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ["REACT_DEVELOPER_TOOLS"];

  return installer
    .default(
      extensions.map((name) => installer[name]),
      forceDownload
    )
    .catch(console.log);
};

const createTypeSelectorWindow = async () => {
  if (isDebug) {
    await installExtensions();
  }

  const RESOURCES_PATH = app.isPackaged
    ? path.join(process.resourcesPath, "assets")
    : path.join(__dirname, "../../assets");

  const getAssetPath = (...paths: string[]): string => {
    return path.join(RESOURCES_PATH, ...paths);
  };

  let height = 500;
  let width = 600;

  typeSelectorWindow = new BrowserWindow({
    show: false,
    width: width,
    height: height,
    maxHeight: height,
    maxWidth: width,
    minHeight: height,
    minWidth: width,
    icon: getAssetPath("icon.png"),
    webPreferences: {
      preload: app.isPackaged
        ? path.join(__dirname, "preload.js")
        : path.join(__dirname, "../../.erb/dll/preload.js"),

      contextIsolation: true,
      sandbox: true,
      webSecurity: true,
    },
  });

  typeSelectorWindow.loadURL(resolveHtmlPath("index.html"));

  const mainMenu = Menu.buildFromTemplate([]);
  Menu.setApplicationMenu(mainMenu);

  typeSelectorWindow.on("ready-to-show", () => {
    if (!typeSelectorWindow) {
      throw new Error('"typeSelectorWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      typeSelectorWindow.minimize();
    } else {
      typeSelectorWindow.show();
    }
    typeSelectorWindow.webContents.send(
      CURRENT_WINDOW_NAME,
      "type-selector-window"
    );
  });

  typeSelectorWindow.on("closed", () => {
    typeSelectorWindow = null;
  });

  // Open urls in the user's browser
  typeSelectorWindow.webContents.setWindowOpenHandler((edata) => {
    shell.openExternal(edata.url);
    return { action: "deny" };
  });
};

const closeTypeSelectorWindow = () => {
  if (typeSelectorWindow) {
    typeSelectorWindow.close();
    typeSelectorWindow = null;
  }
};

const createMainWindow = async () => {
  if (isDebug) {
    await installExtensions();
  }

  const RESOURCES_PATH = app.isPackaged
    ? path.join(process.resourcesPath, "assets")
    : path.join(__dirname, "../../assets");

  const getAssetPath = (...paths: string[]): string => {
    return path.join(RESOURCES_PATH, ...paths);
  };

  let width = 1024;
  let height = 600;

  mainWindow = new BrowserWindow({
    title: "main_window",
    show: false,
    minWidth: width,
    minHeight: height,
    icon: getAssetPath("icon.png"),
    webPreferences: {
      preload: app.isPackaged
        ? path.join(__dirname, "preload.js")
        : path.join(__dirname, "../../.erb/dll/preload.js"),

      contextIsolation: true,
      sandbox: true,
      webSecurity: true,
    },
  });

  mainWindow.loadURL(resolveHtmlPath("index.html"));

  // mainWindow.maximize();

  const mainMenu = Menu.buildFromTemplate([]);
  Menu.setApplicationMenu(mainMenu);

  mainWindow.on("ready-to-show", () => {
    if (!mainWindow) {
      throw new Error('"typeSelectorWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
    }
    mainWindow.webContents.send(CURRENT_WINDOW_NAME, "main-window");
  });

  mainWindow.on("closed", () => {
    typeSelectorWindow = null;
  });

  // Open urls in the user's browser
  mainWindow.webContents.setWindowOpenHandler((edata) => {
    shell.openExternal(edata.url);
    return { action: "deny" };
  });
};

const closeMainWindow = () => {
  if (mainWindow) {
    mainWindow.close();
    mainWindow = null;
  }
};
/**
 * Add event listeners...
 */
registerAllEvents(ipcMain);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app
  .whenReady()
  .then(() => {
    // Can I send message from here?
    createTypeSelectorWindow();
    app.on("activate", () => {
      if (typeSelectorWindow === null) createTypeSelectorWindow();
    });
  })
  .catch(console.log);

export default {
  createTypeSelectorWindow,
  createMainWindow,
  typeSelectorWindow,
  mainWindow,
  closeTypeSelectorWindow,
  closeMainWindow,
};
