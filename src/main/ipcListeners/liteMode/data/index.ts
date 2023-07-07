import { IpcMain } from "electron";
import { GET_HOME_DIR, GET_LITE_PLAYLIST } from "../../../../ipcEvents";
import getHomeDir from "../../../ipcHandlers/getHomeDir";
import getLitePlaylist from "../../../ipcHandlers/getLitePlaylist";

const registerLiteDataEvents = (ipcMain: IpcMain) => {
  ipcMain.on(GET_HOME_DIR, getHomeDir);
  ipcMain.on(GET_LITE_PLAYLIST, getLitePlaylist);
};

export default registerLiteDataEvents;
