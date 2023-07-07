import path from "path";
import fs from "fs";
import * as Tone from "tone";
import { IpcMain, IpcMainEvent } from "electron";
import { LOAD_LITE_AUDIO } from "../../../../ipcEvents";
import getAudioDurationInSeconds from "get-audio-duration";

const registerLiteAudioEvents = (ipcMain: IpcMain) => {
  let player: Tone.Player | null;
  ipcMain.on(LOAD_LITE_AUDIO, (event: IpcMainEvent, filePath) => {
    if (player) {
      player.stop();
      player.dispose();
      player = null;
    }

    const loadAudioFile = async () => {
      const audioFilePath = path.resolve(filePath);
      const fileExists = fs.existsSync(audioFilePath);

      if (fileExists) {
        const fileBuffer = fs.readFileSync(audioFilePath);
        const bufferArray = fileBuffer.buffer.slice(
          fileBuffer.byteOffset,
          fileBuffer.byteOffset + fileBuffer.byteLength
        );
        getAudioDurationInSeconds(audioFilePath).then((duration) => {
          event.reply(LOAD_LITE_AUDIO, {
            bufferArray,
            duration,
          });
        });
      } else {
        console.error("Audio file does not exist:", audioFilePath);
      }
    };

    (async () => {
      await loadAudioFile();
    })(); // IIFE
  });
};

export default registerLiteAudioEvents;
