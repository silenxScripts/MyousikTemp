import { createContext, useState, useMemo, ReactNode } from "react";
import PropTypes from "prop-types";
import ContextTypeDef from "renderer/common/data/appContext/contextTypeDef";
import AlertStateTypeDef from "renderer/common/data/appContext/alertStateTypeDef";
import ChoicesStateTypeDef from "renderer/common/data/appContext/choicesStateTypeDef";

export const Context = createContext<ContextTypeDef>({
  alertState: {
    mode: "",
    messages: [""],
  },
  setAlertState: () => {},
  choicesState: {
    message: "",
    choices: ["Yes", "No"],
    callback: () => {},
  },
  setChoicesState: () => {},
  liteDirectFilePath: "",
  setLiteDirectFilePath: () => {},
  liteDirectFilesList: [],
  setLiteDirectFilesList: () => {},
  menuMode: "",
  setMenuMode: () => {},
  isLoading: false,
  setIsLoading: () => {},
});

type AppContextProps = {
  children: ReactNode;
};

const AppContext = ({ children }: AppContextProps) => {
  const [alertState, setAlertState] = useState<AlertStateTypeDef>({
    mode: "",
    messages: [""],
  });

  const [choicesState, setChoicesState] = useState<ChoicesStateTypeDef>({
    message: "",
    choices: ["Yes", "No"],
    callback: () => {},
  });

  const [liteDirectFilePath, setLiteDirectFilePath] = useState("");
  const [liteDirectFilesList, setLiteDirectFilesList] = useState([""]);
  const [menuMode, setMenuMode] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const values = useMemo(() => {
    return {
      alertState,
      setAlertState,
      choicesState,
      setChoicesState,
      liteDirectFilePath,
      setLiteDirectFilePath,
      liteDirectFilesList,
      setLiteDirectFilesList,
      menuMode,
      setMenuMode,
      isLoading,
      setIsLoading,
    };
  }, [
    alertState,
    choicesState,
    liteDirectFilePath,
    menuMode,
    isLoading,
    liteDirectFilesList,
  ]);

  return <Context.Provider value={values}>{children}</Context.Provider>;
};

AppContext.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppContext;
