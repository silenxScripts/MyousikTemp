import { IpcMainEvent } from "electron";
import { GET_HOME_DIR } from "../../ipcEvents";
import os from "os";

const getHomeDir = async (event: IpcMainEvent) => {
  let homeDirList = os.homedir().split("\\");
  let homeName = homeDirList[homeDirList.length - 1];
  let homeDir = "MYouSik/" + homeName;
  event.reply(GET_HOME_DIR, homeDir);
};

export default getHomeDir;
