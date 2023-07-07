import { DELETE_FILE, GET_AUDIO_FILES } from "ipcEvents";
import styles from "./styles.module.scss";
import { useState, useEffect, useContext } from "react";
import FileItem from "../FileItem";
import bin from "../../../../../../assets/prIcons/bin.png";
import { DndProvider, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { FILE_ITEM } from "renderer/common/data/draggableItem";
import { Context } from "renderer/stateManager/context/appContext";
import * as AlertModes from "renderer/common/data/appContext/alertStateTypesData";

type props = {
  folderPath: string;
};

const FolderView = ({ folderPath }: props) => {
  const [files, setFiles] = useState([]);
  const { setChoicesState, setAlertState } = useContext(Context);

  const handleFilesChange = (args) => {
    setFiles(args);
  };

  const handleFileDelete = (item) => {
    const filePath = item.filePath;
    setChoicesState({
      message: `Do you want to delete the file ${filePath}`,
      choices: ["Yes", "No"],
      callback(choice) {
        if (choice !== "Yes") return;
        window.electron.ipcRenderer.sendMessage(DELETE_FILE, filePath);
      },
    });
  };

  useEffect(() => {
    const handleGetFiles = (args) => {
      handleFilesChange(args);
    };

    const getFilesInterval = setInterval(() => {
      window.electron.ipcRenderer.sendMessage(GET_AUDIO_FILES, folderPath);
    }, 100);

    window.electron.ipcRenderer.on(GET_AUDIO_FILES, handleGetFiles);

    return () => {
      clearInterval(getFilesInterval);
      window.electron.ipcRenderer.removeAllListeners(GET_AUDIO_FILES);
      window.electron.ipcRenderer.removeAllListeners(DELETE_FILE);
    };
  }, []);

  useEffect(() => {
    window.electron.ipcRenderer.once(DELETE_FILE, (args) => {
      if (typeof args === typeof [] && args) {
        setAlertState({
          messages: args,
          mode: AlertModes.errorType,
        });
      }
    });
  }, []);

  const [{ isOver }, drop] = useDrop({
    accept: FILE_ITEM, // Replace 'YOUR_ITEM_TYPE' with your custom item type
    drop: (item) => {
      handleFileDelete(item);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  return (
    <DndProvider backend={HTML5Backend}>
      <div className={styles.files_list}>
        {files.map((file, index) => {
          const fileSplitList = file.split("\\");
          const title = fileSplitList[fileSplitList.length - 1];
          return <FileItem title={title} path={file} key={index} />;
        })}
      </div>
      <hr className={styles.saperator} />
      <div
        className={styles.delete_dropper}
        onClick={() => {}}
        style={{
          background: isOver ? "#df2525" : "",
        }}
        ref={drop}
      >
        <img src={bin} alt="X" />
      </div>
    </DndProvider>
  );
};

export default FolderView;
