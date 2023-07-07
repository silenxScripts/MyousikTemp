import ActionTypeDef from "renderer/common/data/appStore/action/actionTypeDef";
import StoreTypeDef from "renderer/common/data/appStore/store/storeTypeDef";

const reduceVolume = (
  state: StoreTypeDef,
  action: ActionTypeDef
): StoreTypeDef => {
  return {
    ...state,
    volume: action.payload.volume,
  };
};

export default reduceVolume;
