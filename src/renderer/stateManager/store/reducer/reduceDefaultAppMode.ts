import ActionTypeDef from "renderer/common/data/appStore/action/actionTypeDef";
import StoreTypeDef from "renderer/common/data/appStore/store/storeTypeDef";

const reduceDefaultAppMode = (
  state: StoreTypeDef,
  action: ActionTypeDef
): StoreTypeDef => {
  return {
    ...state,
    defaultAppMode: action.payload.mode,
  };
};

export default reduceDefaultAppMode;
