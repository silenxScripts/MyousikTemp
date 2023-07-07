import { IpcMain } from "electron";
import registerApplicationEvents from "./application";
import registerLiteDataEvents from "./liteMode/data";
import registerLiteFolderEvents from "./liteMode/folders";
import registerCommonEvents from "./common";
import registerLiteAudioEvents from "./liteMode/audio";

const registerAllEvents = (ipcMain: IpcMain) => {
  registerApplicationEvents(ipcMain);
  registerCommonEvents(ipcMain);
  registerLiteDataEvents(ipcMain);
  registerLiteFolderEvents(ipcMain);
  registerLiteAudioEvents(ipcMain);
};

export default registerAllEvents;
