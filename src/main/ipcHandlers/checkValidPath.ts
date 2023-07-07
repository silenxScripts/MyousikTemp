import { IpcMainEvent } from "electron";
import path from "path";
import fs from "fs";
import { CHECK_VALID_PATH } from "../../ipcEvents";

const checkValidPath = (event: IpcMainEvent, pathToCheck: string) => {
  const resolvedPath = path.resolve(pathToCheck);
  const doesExists = fs.existsSync(resolvedPath);
  event.reply(CHECK_VALID_PATH, doesExists);
};

export default checkValidPath;
