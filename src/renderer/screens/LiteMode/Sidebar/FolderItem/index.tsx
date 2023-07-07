import styles from "./styles.module.scss";
import folder from "../../../../../../assets/prIcons/folder.png";
import React, { useContext } from "react";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import DeleteIcon from "@mui/icons-material/Delete";
import { CHECK_VALID_PATH, REMOVE_FOLDER_FROM_LITE } from "ipcEvents";
import { Context } from "renderer/stateManager/context/appContext";
import { messageType } from "renderer/common/data/appContext/alertStateTypesData";

type props = {
  title: string;
  folderPath: string;
  setActiveFolderPath: React.Dispatch<React.SetStateAction<string>>;
};

const FolderItem = ({ title, folderPath, setActiveFolderPath }: props) => {
  const { setAlertState } = useContext(Context);

  const handleFolderClick = () => {
    window.electron.ipcRenderer.sendMessage(CHECK_VALID_PATH, folderPath);
    window.electron.ipcRenderer.once(CHECK_VALID_PATH, (doesExists) => {
      if (doesExists) {
        setActiveFolderPath(folderPath);
        return;
      }
      setAlertState({
        messages: [
          `Folder at ${folderPath} wasn't found!`,
          "The name or location might've changed!",
        ],
        mode: messageType,
      });
      window.electron.ipcRenderer.sendMessage(
        REMOVE_FOLDER_FROM_LITE,
        folderPath
      );
    });
  };

  const handleFolderRemove = () => {
    window.electron.ipcRenderer.sendMessage(
      REMOVE_FOLDER_FROM_LITE,
      folderPath
    );
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <img src={folder} alt="" />
        <h1>
          {title.slice(0, 16)}
          {title.length >= 16 ? ".." : ""}
        </h1>
        <DeleteIcon
          onClick={handleFolderRemove}
          sx={{
            marginLeft: "auto",
            marginRight: "10px",
            cursor: "pointer",
          }}
          color="primary"
        />
        <ArrowCircleRightIcon
          onClick={handleFolderClick}
          sx={{ cursor: "pointer" }}
          color="primary"
        />
      </div>
    </div>
  );
};

export default FolderItem;
