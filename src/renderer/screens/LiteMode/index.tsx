import Menu from "./Menu";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { useState } from "react";

const LiteMode = () => {
  const [isExplorerVis, setIsExplorerVis] = useState<boolean>(true);

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        display: "flex",
      }}
    >
      <Navbar explorerVis={isExplorerVis} setExplorerVis={setIsExplorerVis} />
      <Sidebar isVis={isExplorerVis} />
      <Menu setIsExplorerVis={setIsExplorerVis} />
    </div>
  );
};

export default LiteMode;
