import { IpcMainEvent } from "electron";
import path from "path";
import fs from "fs";
import { GET_LITE_PLAYLIST } from "../../ipcEvents";

const getLitePlaylist = (event: IpcMainEvent) => {
  const configPath = path.join(__dirname, "../../../assets/config.json");
  const rawBuffer = fs.readFileSync(configPath);
  const stringData = rawBuffer.toString();
  const data = JSON.parse(stringData);
  const list = data.liteMode.playlist;
  event.reply(GET_LITE_PLAYLIST, list);
};

export default getLitePlaylist;
