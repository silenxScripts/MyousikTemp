import styles from "./styles.module.scss";
import themes from "../../../../../assets/prIcons/theme.png";
import modes from "../../../../../assets/prIcons/modes.png";
import setting from "../../../../../assets/prIcons/settings.png";
import { useTheme } from "next-themes";
import { Tooltip } from "@mui/material";
import { motion } from "framer-motion";
import bopClickVariant from "renderer/common/motions/bopClick";
import DriveFileMoveIcon from "@mui/icons-material/DriveFileMove";
import { useContext } from "react";
import { Context } from "renderer/stateManager/context/appContext";
import { SETTINGS } from "renderer/common/data/menuModes";

type props = {
  setExplorerVis: React.Dispatch<React.SetStateAction<boolean>>;
  explorerVis: boolean;
};

const Navbar = ({ setExplorerVis, explorerVis }: props) => {
  const { theme, setTheme } = useTheme();
  const { setMenuMode, setLiteDirectFilePath } = useContext(Context);

  const handleThemeToggle = () => {
    const isDark = theme === "dark";
    if (!isDark) {
      setTheme("dark");
      return;
    }
    setTheme("light");
  };

  const handleOpenSettings = () => {
    setMenuMode(SETTINGS);
    setLiteDirectFilePath("");
  };

  return (
    <div className={styles.wrapper}>
      <div
        className={styles.header}
        onClick={() => setExplorerVis(!explorerVis)}
      >
        <DriveFileMoveIcon
          sx={{
            transform: !explorerVis ? "rotateY(0deg)" : "rotateY(-180deg)",
            transitionDelay: 0.3,
            color: "#f44336",
          }}
        />
      </div>
      <div className={styles.icon_bar}>
        <Tooltip title="Toggle themes" placement="right">
          <motion.div
            className={styles.icon}
            onClick={handleThemeToggle}
            variants={bopClickVariant}
            whileHover={"hover"}
            whileTap={"click"}
          >
            <img src={themes} alt="" />
          </motion.div>
        </Tooltip>
        <Tooltip title="Set mode" placement="right">
          <motion.div
            className={styles.icon}
            variants={bopClickVariant}
            whileHover={"hover"}
            whileTap={"click"}
          >
            <img src={modes} alt="" />
          </motion.div>
        </Tooltip>
        <Tooltip title="Settings" placement="right">
          <motion.div
            className={styles.icon}
            variants={bopClickVariant}
            whileHover={"hover"}
            whileTap={"click"}
            onClick={handleOpenSettings}
          >
            <img src={setting} alt="" />
          </motion.div>
        </Tooltip>
      </div>
    </div>
  );
};

export default Navbar;
