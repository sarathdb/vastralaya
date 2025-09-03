import { useEffect, useState, marquee } from "react";
import "../styles.css";


const HeaderButton = ({ headerButtonAction, title }) => {
  const [mouseIsHover, setMouseHover] = useState(false);

  const handleMouseEnter = () => {
    console.log("Mouse Enter");
    setMouseHover(true);
  };

  const handleMouseLeave = () => {
    setMouseHover(false);
    console.log("Mouse Leave");
  };
  const handleMouseUp = () => {
    // setMouseHover(false);
    console.log("Mouse Up");
  };

  return (
    <button
      id="header-button-id"
      className="header-button"
      onClick={headerButtonAction}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        backgroundColor: mouseIsHover ? "brown" : "transparent",
        color: mouseIsHover ? "white" : "brown",
      }}
    >
      {title}
    </button>
  );
};

export default HeaderButton;
