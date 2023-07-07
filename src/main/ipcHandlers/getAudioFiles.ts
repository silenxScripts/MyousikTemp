import { GET_AUDIO_FILES } from "../../ipcEvents";
import { IpcMainEvent } from "electron";
import path from "path";
import fs from "fs";

const getAudioFiles = (event: IpcMainEvent, args: string) => {
  const configPath = path.resolve(__dirname, "../../../assets/config.json");
  const rawBuffer = fs.readFileSync(configPath);
  const stringData = rawBuffer.toString();
  const configData = JSON.parse(stringData);
  const allowedFileTypes = configData.allowedFileTypes;

  const folderPath = path.resolve(args);
  const files = fs.readdirSync(folderPath);
  const filesToSend: Array<string> = [];

  files.map((file) => {
    const fileType = file.slice(file.length - 3);
    if (allowedFileTypes.includes(fileType)) {
      filesToSend.push(`${folderPath}\\${file}`);
    }
  });

  event.reply(GET_AUDIO_FILES, filesToSend);
};

export default getAudioFiles;
