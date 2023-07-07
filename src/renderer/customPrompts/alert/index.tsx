import CustomButton from "renderer/common/components/CustomButton";
import styles from "./styles.module.scss";
import { Context } from "renderer/stateManager/context/appContext";
import { useContext } from "react";

const Alert = () => {
  const { setAlertState, alertState } = useContext(Context);

  return (
    <div
      className={styles.wrapper}
      style={{
        display: alertState.messages[0] !== "" ? "flex" : "none",
      }}
    >
      <div className={styles.prompt}>
        <img src={alertState.mode} alt="X" />
        {alertState.messages.map((message, index) => (
          <li key={index}>{message}</li>
        ))}
        <div className={styles.button_wrapper}>
          <CustomButton
            title="Close"
            width="fit-content"
            callback={() => {
              setAlertState({
                mode: "",
                messages: [""],
              });
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Alert;
