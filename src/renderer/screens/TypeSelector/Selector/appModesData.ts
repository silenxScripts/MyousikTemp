import * as AppModes from "renderer/common/data/appModes";
import liteMode from "../../../../../assets/svgs/lite_mode.svg";
import classicMode from "../../../../../assets/svgs/classic_mode.svg";

const AppModeData = [
  {
    appMode: AppModes.LITE,
    sentences: [
      "Mp3 Player",
      "Single song loop",
      "Single playlist loop",
      "No track loop",
    ],
    img: liteMode,
  },
  {
    appMode: AppModes.CLASSIC,
    sentences: [
      "Mp3 Player",
      "Single song loop",
      "Single playlist loop",
      "Trim track loop",
    ],
    img: classicMode,
  },
];

export default AppModeData;
