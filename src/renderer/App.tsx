import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import StoreTypeDef from "renderer/common/data/appStore/store/storeTypeDef";
import setCurrAppMode from "renderer/stateManager/store/actions/setCurrAppMode";
import * as AppModes from "renderer/common/data/appModes";
import TypeSelector from "./screens/TypeSelector";
import { CURRENT_WINDOW_NAME, TYPE_SELECTOR_WINDOW_CLOSE } from "ipcEvents";
import setDefaultAppMode from "./stateManager/store/actions/setDefaultAppMode";
import LiteMode from "./screens/LiteMode";

const App = () => {
  const dispatch = useDispatch();
  const currAppMode = useSelector((state: StoreTypeDef) => state.currAppMode);
  const defaultAppMode = useSelector(
    (state: StoreTypeDef) => state.defaultAppMode
  );

  useEffect(() => {
    window.electron.ipcRenderer.on(CURRENT_WINDOW_NAME, (windowName) => {
      if (windowName === "type-selector-window") {
        dispatch(setCurrAppMode(AppModes.NOT_SELECTED));
        if (defaultAppMode !== AppModes.NOT_SELECTED) {
          dispatch(setCurrAppMode(defaultAppMode));
          window.electron.ipcRenderer.sendMessage(TYPE_SELECTOR_WINDOW_CLOSE, [
            "",
          ]);
        }
      }
    });
  }, []);

  if (currAppMode === AppModes.NOT_SELECTED) return <TypeSelector />;
  else if (currAppMode === AppModes.LITE) return <LiteMode />;

  return (
    <div>
      <h1>Current {currAppMode}</h1>
      <h1>Default {defaultAppMode}</h1>
      <button
        onClick={() => {
          dispatch(setDefaultAppMode(AppModes.NOT_SELECTED));
        }}
      >
        Turn default to not selected
      </button>
    </div>
  );
};

export default App;
