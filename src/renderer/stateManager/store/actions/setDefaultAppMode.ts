import * as ActionTypes from "renderer/common/data/appStore/action/actionTypeData";

const setDefaultAppMode = (mode: string) => ({
  type: ActionTypes.SET_DEFAULT_APP_MODE,
  payload: {
    mode,
  },
});

export default setDefaultAppMode;
