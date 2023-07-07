import { IpcMain, IpcMainEvent } from "electron";
import { TYPE_SELECTOR_WINDOW_CLOSE } from "../../../ipcEvents";
import handleTypeSelectorClose from "../../ipcHandlers/handleTypeSelectorClose";
import Main from "../../main";

const registerApplicationEvents = (ipcMain: IpcMain) => {
  ipcMain.on(
    TYPE_SELECTOR_WINDOW_CLOSE,
    async (event: IpcMainEvent, args: Array<string>) => {
      handleTypeSelectorClose(
        event,
        args,
        Main.closeTypeSelectorWindow,
        Main.createMainWindow
      );
    }
  );
};

export default registerApplicationEvents;
