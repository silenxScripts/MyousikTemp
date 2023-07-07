import { IpcMainEvent } from "electron";
import path from "path";
import fs from "fs";
import { DELETE_FILE } from "../../ipcEvents";

const deleteFile = (event: IpcMainEvent, args) => {
  const filePath = path.resolve(args);
  fs.unlink(filePath, (err) => {
    if (err) {
      event.reply(DELETE_FILE, [
        "An error occured!",
        "File couldn't be deleted!",
      ]);
    }
  });
};

export default deleteFile;
