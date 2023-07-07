import styles from "./styles.module.scss";
import { motion } from "framer-motion";
import bopClickVariant from "renderer/common/motions/bopClick";

type props = {
  modeName: string;
  sentences: Array<string>;
  img: string;
  callback: (modeName: string) => void;
};

const AppModeCard = ({ modeName, sentences, img, callback }: props) => {
  return (
    <motion.div
      onClick={() => callback(modeName)}
      className={styles.wrapper}
      variants={bopClickVariant}
      whileHover={{
        scale: 1.05,
      }}
      whileTap={"click"}
    >
      <img src={img} alt="X" />
      <div className={styles.info}>
        <h1>{modeName}</h1>
        <ul>
          {sentences.map((value, index) => (
            <li key={index}>{value}</li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

export default AppModeCard;
