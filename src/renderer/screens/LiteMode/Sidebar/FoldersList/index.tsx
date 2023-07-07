import React, { useEffect, useState } from "react";
import { GET_LITE_FOLDERS } from "ipcEvents";
import FolderItem from "../FolderItem";

type props = {
  setActiveFolderPath: React.Dispatch<React.SetStateAction<string>>;
};

const FolderList = ({ setActiveFolderPath }: props) => {
  const [foldersList, setFoldersList] = useState([]);

  const handleFoldersChange = (args) => {
    setFoldersList(args);
  };

  const refreshFoldersList = () => {
    window.electron.ipcRenderer.sendMessage(GET_LITE_FOLDERS);
  };

  useEffect(() => {
    const handleGetLiteFolders = (args) => {
      handleFoldersChange(args);
    };

    const getLiteFolderInterval = setInterval(() => {
      refreshFoldersList();
    }, 100);

    window.electron.ipcRenderer.on(GET_LITE_FOLDERS, handleGetLiteFolders);

    return () => {
      clearInterval(getLiteFolderInterval);
      window.electron.ipcRenderer.removeAllListeners(GET_LITE_FOLDERS);
    };
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: "10px",
        paddingBottom: "10px",
      }}
    >
      {foldersList.map((folder, index) => {
        const lis = folder.split("\\");
        const title = lis[lis.length - 1];
        return (
          <FolderItem
            title={title}
            folderPath={folder}
            setActiveFolderPath={setActiveFolderPath}
            key={index}
          />
        );
      })}
    </div>
  );
};

export default FolderList;
