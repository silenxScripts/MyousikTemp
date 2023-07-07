import { TYPE_SELECTOR_WINDOW_CLOSE } from "ipcEvents";
import AppModeCard from "./AppModeCard";
import AppModeData from "./appModesData";
import { useDispatch } from "react-redux";
import setCurrAppMode from "renderer/stateManager/store/actions/setCurrAppMode";

const Selector = () => {
  const dispatch = useDispatch();

  const handleAppModeCallBack = (modeName: string) => {
    window.electron.ipcRenderer.sendMessage(TYPE_SELECTOR_WINDOW_CLOSE, [""]);
    dispatch(setCurrAppMode(modeName));
  };

  return (
    <div
      style={{
        flex: 1,
        padding: "1rem",
        display: "flex",
      }}
    >
      {AppModeData.map((data, index) => (
        <AppModeCard
          key={index}
          img={data.img}
          modeName={data.appMode}
          sentences={data.sentences}
          callback={handleAppModeCallBack}
        />
      ))}
    </div>
  );
};

export default Selector;
