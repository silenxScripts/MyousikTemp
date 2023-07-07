import { useContext } from "react";
import { Context } from "renderer/stateManager/context/appContext";
import FilePlayer from "./FilePlayer";
import { SETTINGS } from "renderer/common/data/menuModes";
import PlayListManager from "./PlayListManager";

const Menu = ({ setIsExplorerVis }) => {
  const { liteDirectFilePath, menuMode, liteDirectFilesList } =
    useContext(Context);

  if (liteDirectFilePath.length !== 0)
    return (
      <FilePlayer
        filePath={liteDirectFilePath}
        playList={liteDirectFilesList}
      />
    );

  if (menuMode === SETTINGS) return <h1>Settings</h1>;
  else return <PlayListManager setIsExplorerVis={setIsExplorerVis} />;
};

export default Menu;
