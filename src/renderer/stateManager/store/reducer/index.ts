import ActionTypeDef from "renderer/common/data/appStore/action/actionTypeDef";
import StoreTypeDef from "renderer/common/data/appStore/store/storeTypeDef";
import * as AppModes from "renderer/common/data/appModes";
import * as ActionTypes from "renderer/common/data/appStore/action/actionTypeData";
import reduceCurrAppMode from "./reduceCurrAppMode";
import reduceDefaultAppMode from "./reduceDefaultAppMode";
import reduceVolume from "./reduceVolume";

const initialState: StoreTypeDef = {
  currAppMode: AppModes.NOT_SELECTED,
  defaultAppMode: AppModes.CLASSIC,
  volume: 0.5,
};

const reducer = (
  state: StoreTypeDef = initialState,
  action: ActionTypeDef
): StoreTypeDef => {
  const type = action.type;

  if (type === ActionTypes.SET_CURR_APP_MODE) {
    const updatedState = reduceCurrAppMode(state, action);
    return updatedState;
  } else if (type === ActionTypes.SET_DEFAULT_APP_MODE) {
    const updatedState = reduceDefaultAppMode(state, action);
    return updatedState;
  } else if (type === ActionTypes.SET_VOLUME) {
    const updatedState = reduceVolume(state, action);
    return updatedState;
  } else {
    return state;
  }
};

export default reducer;
