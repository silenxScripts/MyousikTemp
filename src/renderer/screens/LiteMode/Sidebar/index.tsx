import styles from "./styles.module.scss";
import openFolder from "../../../../../assets/prIcons/open_folder.png";
import arrowDown from "../../../../../assets/prIcons/arrow_down.png";
import { useEffect, useState } from "react";
import { ADD_FOLDER_TO_LITE, GET_HOME_DIR } from "ipcEvents";
import FolderList from "./FoldersList";
import FolderView from "./FolderView";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

type props = {
  isVis: boolean;
};

const Sidebar = ({ isVis }: props) => {
  const [homeName, setHomeName] = useState("Loading...");
  const [activeFolderPath, setActiveFolderPath] = useState("");

  const handleSelectFolder = () => {
    window.electron.ipcRenderer.sendMessage(ADD_FOLDER_TO_LITE);
    window.electron.ipcRenderer.removeAllListeners(ADD_FOLDER_TO_LITE);
  };

  const goBackToFolderList = () => {
    setActiveFolderPath("");
  };

  useEffect(() => {
    window.electron.ipcRenderer.sendMessage(GET_HOME_DIR);
    window.electron.ipcRenderer.once(GET_HOME_DIR, (homeDir) => {
      setHomeName(homeDir);
      window.electron.ipcRenderer.removeAllListeners(GET_HOME_DIR);
    });
    return () => {
      window.electron.ipcRenderer.removeAllListeners(GET_HOME_DIR);
    };
  }, []);

  if (activeFolderPath.length) {
    const activeFolderSplitList = activeFolderPath.split("\\");
    const activeFolderTitle =
      activeFolderSplitList[activeFolderSplitList.length - 1];

    return (
      <div
        className={styles.wrapper}
        style={{
          width: isVis ? "15rem" : "0",
        }}
      >
        <div className={styles.folder_header}>
          <h1>{activeFolderTitle}</h1>
          <div
            className={styles.open_folder_wrapper}
            onClick={goBackToFolderList}
          >
            <img
              src={arrowDown}
              alt="X"
              style={{ transform: "rotate(90deg) scale(1.1)" }}
            />
          </div>
        </div>
        <div className={styles.folder_view}>
          <DndProvider backend={HTML5Backend}>
            <FolderView folderPath={activeFolderPath} />
          </DndProvider>
        </div>
      </div>
    );
  }

  return (
    <div
      className={styles.wrapper}
      style={{
        width: isVis ? "15rem" : "0",
      }}
    >
      <div className={styles.folder_header}>
        <h1>{homeName}</h1>
        <div
          className={styles.open_folder_wrapper}
          onClick={handleSelectFolder}
        >
          <img src={openFolder} alt="X" />
        </div>
      </div>
      <div className={styles.folder_view}>
        <FolderList setActiveFolderPath={setActiveFolderPath} />
      </div>
    </div>
  );
};

export default Sidebar;
