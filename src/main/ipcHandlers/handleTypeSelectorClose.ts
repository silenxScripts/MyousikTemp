import { IpcMainEvent } from "electron";

const handleTypeSelectorClose = (
  event: IpcMainEvent,
  args: Array<string>,
  closeTypeSelectorWindow: () => void,
  createMainWindow: () => Promise<void>
) => {
  closeTypeSelectorWindow();
  createMainWindow();
};
export default handleTypeSelectorClose;
