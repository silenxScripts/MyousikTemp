import { BrowserWindow, IpcMainEvent, dialog } from "electron";
import path from "path";
import fs from "fs";

const addLiteDir = (event: IpcMainEvent, mainWindow: BrowserWindow) => {
  dialog
    .showOpenDialog(mainWindow, {
      properties: ["openDirectory"],
    })
    .then((result) => {
      // Check if the dialog was canceled
      if (result.canceled) {
        return;
      }

      // Get the selected folder or file path
      const folderPath = result.filePaths[0];

      const configPath = path.resolve(__dirname, "../../../assets/config.json");
      const rawBuffer = fs.readFileSync(configPath);
      const stringDara = rawBuffer.toString();
      const data = JSON.parse(stringDara);
      data.liteMode.folders.push(folderPath);
      fs.writeFileSync(configPath, JSON.stringify(data));

      // Continue with your program logic using the selected path
    })
    .catch((err) => {
      dialog.showErrorBox(
        "Internal Erorr",
        "Folder couldn't be loaded! try again, restart the application if problems persists."
      );
    });
};

export default addLiteDir;
