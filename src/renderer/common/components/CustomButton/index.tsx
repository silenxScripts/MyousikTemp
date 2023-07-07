import { motion } from "framer-motion";
import bopClickVariant from "renderer/common/motions/bopClick";

type props = {
  title?: string;
  style?: object;
  padding?: Array<number>;
  width?: string;
  callback?: () => void;
};

const CustomButton = ({
  title = "Default",
  style = {},
  padding = [10, 20],
  width = "80%",
  callback = () => {},
}: props) => {
  return (
    <motion.button
      variants={bopClickVariant}
      whileHover={"hover"}
      whileTap={"click"}
      style={{
        background: "#0663e5",
        color: "white",
        width: width,
        borderRadius: 10,
        border: 0,
        alignSelf: "center",
        padding: `${padding[0]}px ${padding[1]}px`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        ...style,
      }}
      onClick={callback}
    >
      {title}
    </motion.button>
  );
};

export default CustomButton;
