import { IpcMain } from "electron";
import {
  CHECK_VALID_PATH,
  DELETE_FILE,
  GET_AUDIO_FILES,
} from "../../../ipcEvents";
import deleteFile from "../../ipcHandlers/deleteFile";
import getAudioFiles from "../../ipcHandlers/getAudioFiles";
import checkValidPath from "../../ipcHandlers/checkValidPath";

const registerCommonEvents = (ipcMain: IpcMain) => {
  ipcMain.on(GET_AUDIO_FILES, (event, args) => getAudioFiles(event, args));
  ipcMain.on(DELETE_FILE, (event, args) => deleteFile(event, args));
  ipcMain.on(CHECK_VALID_PATH, (event, args) => checkValidPath(event, args));
};

export default registerCommonEvents;
