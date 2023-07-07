import { IpcMainEvent } from "electron";
import path from "path";
import fs from "fs";
import { GET_ALL_LITE_AUDIO_FILES } from "../../ipcEvents";

const getAllLiteAudios = (event: IpcMainEvent) => {
  const configPath = path.join(__dirname, "../../../assets/config.json");
  const rawBuffer = fs.readFileSync(configPath);
  const stringData = rawBuffer.toString();
  const configData = JSON.parse(stringData);
  const list = configData.liteMode.folders;
  const allowedFileTypes = configData.allowedFileTypes;
  let allAudioList: Array<string> = [];

  list.forEach((folderPath: string) => {
    const files = fs.readdirSync(folderPath);
    files.map((file) => {
      const fileType = file.slice(file.length - 3);
      if (allowedFileTypes.includes(fileType)) {
        allAudioList.push(`${folderPath}\\${file}`);
      }
    });
  });

  event.reply(GET_ALL_LITE_AUDIO_FILES, allAudioList);
};

export default getAllLiteAudios;
