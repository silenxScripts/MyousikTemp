import { IpcMain } from "electron";
import {
  ADD_FOLDER_TO_LITE,
  GET_ALL_LITE_AUDIO_FILES,
  GET_LITE_FOLDERS,
  REMOVE_FOLDER_FROM_LITE,
} from "../../../../ipcEvents";
import addLiteDir from "../../../ipcHandlers/addLiteDir";
import getLiteFolders from "../../../ipcHandlers/getLiteFolders";
import Main from "../../../main";
import removeLiteDir from "../../../ipcHandlers/removeLiteDir";
import getAllLiteAudios from "../../../ipcHandlers/getAllLiteAudios";

const registerLiteFolderEvents = (ipcMain: IpcMain) => {
  ipcMain.on(ADD_FOLDER_TO_LITE, (event, mainWindow) =>
    addLiteDir(event, Main.mainWindow)
  );
  ipcMain.on(GET_LITE_FOLDERS, getLiteFolders);
  ipcMain.on(REMOVE_FOLDER_FROM_LITE, removeLiteDir);
  ipcMain.on(GET_ALL_LITE_AUDIO_FILES, getAllLiteAudios);
};

export default registerLiteFolderEvents;
