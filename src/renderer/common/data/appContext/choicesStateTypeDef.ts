import React from "react";

type ChoicesStateTypeDef = {
  message: string;
  choices: Array<string>;
  callback: (choice: string) => void;
};

export default ChoicesStateTypeDef;
