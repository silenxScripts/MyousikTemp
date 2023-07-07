import React from "react";
import AlertStateTypeDef from "./alertStateTypeDef";
import ChoicesStateTypeDef from "./choicesStateTypeDef";

type ContextTypeDef = {
  alertState: AlertStateTypeDef;
  setAlertState: React.Dispatch<React.SetStateAction<AlertStateTypeDef>>;
  choicesState: ChoicesStateTypeDef;
  setChoicesState: React.Dispatch<React.SetStateAction<ChoicesStateTypeDef>>;
  liteDirectFilePath: string;
  setLiteDirectFilePath: React.Dispatch<React.SetStateAction<string>>;
  liteDirectFilesList: Array<string>;
  setLiteDirectFilesList: React.Dispatch<React.SetStateAction<Array<string>>>;
  menuMode: string;
  setMenuMode: React.Dispatch<React.SetStateAction<string>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

export default ContextTypeDef;
