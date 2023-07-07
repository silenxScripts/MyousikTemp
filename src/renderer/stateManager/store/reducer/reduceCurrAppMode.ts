import ActionTypeDef from "renderer/common/data/appStore/action/actionTypeDef";
import StoreTypeDef from "renderer/common/data/appStore/store/storeTypeDef";

const reduceCurrAppMode = (
  state: StoreTypeDef,
  action: ActionTypeDef
): StoreTypeDef => {
  return {
    ...state,
    currAppMode: action.payload.mode,
  };
};

export default reduceCurrAppMode;
