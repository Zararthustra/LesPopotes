import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // display switch color according to route
  useEffect(() => {
    console.log(location.pathname);
    if (location.pathname === "/lapopote") {
      document.querySelector(".slider").style.background = "var(--popote)";
      document.querySelector(".slider").style.setProperty('--switch', "var(--dark-popote)")
    } else if (location.pathname === "/lespopotes") {
      document.querySelector(".slider").style.background = "var(--popotes)";
      document.querySelector(".slider").style.setProperty('--switch', "var(--dark-popotes)")
    } else {
      document.querySelector(".slider").style.background = "grey";
      document.querySelector(".slider").style.setProperty('--switch', "var(--dark)")
    }
  }, [location.pathname]);

  const onSwitch = () => {
    if (location.pathname === "/lapopote") {
      navigate("lespopotes");
      document.querySelector(".slider").style.background = "var(--popotes)";
      document.querySelector(".slider").style.setProperty('--switch', "var(--dark-popotes)")

    } else {
      navigate("lapopote");
      document.querySelector(".slider").style.background = "var(--popote)";
      document.querySelector(".slider").style.setProperty('--switch', "var(--dark-popote)")

    }
  };

  return (
    <div className="navbar">
      <label className="switch">
        <input type="checkbox" />
        <span className="slider round" onClick={onSwitch}></span>
      </label>
      <div className="home" onClick={() => navigate("/")} />
      <div className="profile" onClick={() => navigate("profile")} />
    </div>
  );
};
