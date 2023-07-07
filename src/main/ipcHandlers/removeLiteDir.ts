import { IpcMainEvent } from "electron";
import path from "path";
import fs from "fs";

const removeLiteDir = (event: IpcMainEvent, folderPath: string) => {
  const resolvedFolderPath = path.resolve(folderPath);
  const configPath = path.resolve(__dirname, "../../../assets/config.json");
  const rawBuffer = fs.readFileSync(configPath);
  const stringDara = rawBuffer.toString();
  const data = JSON.parse(stringDara);
  const newLiteFolderList = data.liteMode.folders.filter(
    (item: string) => item !== resolvedFolderPath
  );
  data.liteMode.folders = newLiteFolderList;
  fs.writeFileSync(configPath, JSON.stringify(data));
};
export default removeLiteDir;
