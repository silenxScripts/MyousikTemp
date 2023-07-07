import styles from "./styles.module.scss";
import play from "../../../../../../assets/prIcons/play.png";
import pause from "../../../../../../assets/prIcons/pause.png";
import { useDrag } from "react-dnd";
import { FILE_ITEM } from "renderer/common/data/draggableItem";
import { Context } from "renderer/stateManager/context/appContext";
import { useContext, useEffect, useState } from "react";

type props = {
  title: string;
  path: string;
};

const FileItem = ({ title, path }: props) => {
  const {
    liteDirectFilePath,
    setLiteDirectFilePath,
    isLoading,
    setLiteDirectFilesList,
  } = useContext(Context);

  const [isPlaying, setIsPlaying] = useState(false);

  const [{ isDragging }, dragRef] = useDrag({
    type: FILE_ITEM,
    item: { filePath: path },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const handleSetFilePlaying = () => {
    if (isPlaying) {
      if (!isLoading) {
        setLiteDirectFilePath("");
      }
      return;
    }
    setLiteDirectFilePath(path);
    setLiteDirectFilesList([""]);
  };

  useEffect(() => {
    setIsPlaying(liteDirectFilePath === path);
  }, [liteDirectFilePath]);

  return (
    <div
      ref={dragRef}
      className={styles.wrapper}
      style={{
        opacity: isDragging ? ".4" : "1",
      }}
      onClick={handleSetFilePlaying}
    >
      <span />
      {isPlaying ? <img src={pause} alt="X" /> : <img src={play} alt="X" />}
      <h1>
        {title.slice(0, 24)}
        {".."}
      </h1>
    </div>
  );
};

export default FileItem;
