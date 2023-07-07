import bopClickVariant from "renderer/common/motions/bopClick";
import styles from "./styles.module.scss";
import { motion } from "framer-motion";

type props = {
  choices: Array<string>;
  currentChoice: string | undefined;
  handleChange: (value: string) => void;
  wrapperStyle?: object;
  itemStyle?: object;
};

const RadioChoices = ({
  choices,
  currentChoice,
  handleChange,
  wrapperStyle = {},
  itemStyle = {},
}: props) => {
  return (
    <div className={styles.wrapper} style={wrapperStyle}>
      {choices.map((choice, index) => (
        <motion.span
          key={index}
          variants={bopClickVariant}
          whileHover={"hover"}
          whileTap={"click"}
          style={{
            ...itemStyle,
            background: currentChoice === choice ? "#0453c0" : "#0663e5",
          }}
          onClick={() => {
            handleChange(choice);
          }}
        >
          <h2>{`${choice[0].toUpperCase()}${choice.slice(1)}`}</h2>
        </motion.span>
      ))}
    </div>
  );
};

export default RadioChoices;
