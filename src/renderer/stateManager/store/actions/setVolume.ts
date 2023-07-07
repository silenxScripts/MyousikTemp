import * as ActionTypes from "renderer/common/data/appStore/action/actionTypeData";

const setVolume = (volume: number) => ({
  type: ActionTypes.SET_VOLUME,
  payload: {
    volume,
  },
});

export default setVolume;
