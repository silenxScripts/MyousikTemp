import * as ActionTypes from "renderer/common/data/appStore/action/actionTypeData";

const setCurrAppMode = (mode: string) => ({
  type: ActionTypes.SET_CURR_APP_MODE,
  payload: {
    mode,
  },
});

export default setCurrAppMode;
