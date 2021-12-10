import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation().pathname;
  
  // Display the switch box color according to route /^\/lapopote\/.*/
  useEffect(() => {
    let slider = document.querySelector(".slider").style
    if (location.match(/lapopote/)) {
      slider.background = "var(--popote)";
      slider.setProperty('--switch', "var(--dark-popote)")
    } else if (location.match(/lespopotes/)) {
      slider.background = "var(--popotes)";
      slider.setProperty('--switch', "var(--dark-popotes)")
    } else {
      slider.background = "grey";
      slider.setProperty('--switch', "var(--dark)")
    }
  }, [location]);
  
  const onSwitch = () => {
    let slider = document.querySelector(".slider").style
    if (location.match(/lapopote/)) {
      navigate("lespopotes");
      slider.background = "var(--popotes)";
      slider.setProperty('--switch', "var(--dark-popotes)")

    } else {
      navigate("lapopote");
      slider.background = "var(--popote)";
      slider.setProperty('--switch', "var(--dark-popote)")

    }
  };

  return (
    <div className="navbar">
      <label className="switch">
        <input type="checkbox" />
        <span className="slider round" onClick={onSwitch}></span>
      </label>
      <div className="homeNav" onClick={() => navigate("/")} />
      <div className="profileNav" onClick={() => navigate("profile")} />
    </div>
  );
};
