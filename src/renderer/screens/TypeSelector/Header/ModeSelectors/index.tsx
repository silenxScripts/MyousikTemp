import RadioChoices from "renderer/common/components/RadioChoices";
import styles from "./styles.module.scss";
import * as AppMode from "renderer/common/data/appModes";
import { useDispatch, useSelector } from "react-redux";
import StoreTypeDef from "renderer/common/data/appStore/store/storeTypeDef";
import setDefaultAppMode from "renderer/stateManager/store/actions/setDefaultAppMode";
import { useTheme } from "next-themes";

const ModeSelectors = () => {
  const currDefaultAppMode = useSelector(
    (state: StoreTypeDef) => state.defaultAppMode
  );
  const dispatch = useDispatch();
  const { theme, setTheme } = useTheme();

  const appModeList = [AppMode.LITE, AppMode.CLASSIC, AppMode.NOT_SELECTED];
  const appThemesList = ["light", "dark"];

  const handleDefaultModeChange = (value: string) => {
    dispatch(setDefaultAppMode(value));
  };

  const handleThemeChange = (value: string) => {
    setTheme(value);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.mode_block}>
        <h1>Default mode</h1>
        <RadioChoices
          choices={appModeList}
          currentChoice={currDefaultAppMode}
          handleChange={handleDefaultModeChange}
        />
      </div>
      <div className={styles.mode_block}>
        <h1>App theme</h1>
        <RadioChoices
          choices={appThemesList}
          currentChoice={theme}
          handleChange={handleThemeChange}
        />
      </div>
    </div>
  );
};

export default ModeSelectors;
