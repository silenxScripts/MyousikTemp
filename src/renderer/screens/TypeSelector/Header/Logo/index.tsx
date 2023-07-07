import { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { motion } from "framer-motion";

const Logo = () => {
  const [secondAnimation, setSecondAnimation] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSecondAnimation(true);
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.logo_bg_animation_wrapper}>
        {[1, 2, 3, 4].map((value) => (
          <motion.span
            key={value}
            style={{
              background: "#0663e5",
              zIndex: !(value % 2 === 0) ? 3 : 1,
            }}
            initial={{
              left: "-100%",
              opacity: 0,
              rotate: "0deg",
              height: "5px",
            }}
            animate={{
              opacity: value / 2,
              marginRight: secondAnimation
                ? `${value * 17}%`
                : `${value * 15}%`,
              left: "0%",
              height: secondAnimation ? "40px" : "5px",
              rotate: secondAnimation ? "360deg" : "45deg",
              marginTop: secondAnimation ? "10px" : "0px",
            }}
            transition={{
              delay: value / 5,
            }}
          />
        ))}
      </div>
      <div className={styles.logo_heading}>
        <h1>M</h1>
        <h1>Yo</h1>
        <h1>u</h1>
        <h1>Sik</h1>
      </div>
      <div className={styles.info}></div>
    </div>
  );
};

export default Logo;
