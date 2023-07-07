import Header from "./Header";
import Selector from "./Selector";

const TypeSelector = () => {
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Header />
      <Selector />
    </div>
  );
};

export default TypeSelector;
