import Logo from "./Logo";
import ModeSelectors from "./ModeSelectors";

const Header = () => {
  return (
    <div
      style={{
        height: "50%",
        padding: "1rem",
        display: "flex",
      }}
    >
      <Logo />
      <ModeSelectors />
    </div>
  );
};

export default Header;
