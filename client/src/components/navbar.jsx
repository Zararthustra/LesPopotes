import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation().pathname;

  // Display the switch box color according to route /^\/lapopote\/.*/
  useEffect(() => {
    let slider = document.querySelector(".slider").style;
    let profileIcon = document.getElementById("profile").classList;
    let homeIcon = document.getElementById("home").classList;

    if (location.match(/lapopote/)) {
      slider.background = "var(--popote)";
      slider.setProperty("--switch", "var(--dark-popote)");
    } else if (location.match(/lespopotes/)) {
      slider.background = "var(--popotes)";
      slider.setProperty("--switch", "var(--dark-popotes)");
    } else {
      slider.background = "grey";
      slider.setProperty("--switch", "var(--dark)");
      if (location === "/") homeIcon.add("activeIcon");
      if (location === "/profile") profileIcon.add("activeIcon");
    }
  }, [location]);

  const onSwitch = () => {
    let slider = document.querySelector(".slider").style;
    let homeIcon = document.getElementById("home").classList;
    let profileIcon = document.getElementById("profile").classList;

    profileIcon.remove("activeIcon");
    homeIcon.remove("activeIcon");

    if (location.match(/lapopote/)) {
      navigate("lespopotes");
      document.body.scrollTop = 0; // For Safari
      document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
      slider.background = "var(--popotes)";
      slider.setProperty("--switch", "var(--dark-popotes)");
    } else {
      navigate("lapopote");
      document.body.scrollTop = 0; // For Safari
      document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
      slider.background = "var(--popote)";
      slider.setProperty("--switch", "var(--dark-popote)");
    }
  };

  const activeIcon = (id) => {
    let currentIcon = document.getElementById(id).classList;
    let homeIcon = document.getElementById("home").classList;
    let profileIcon = document.getElementById("profile").classList;

    if (id === "home" && currentIcon.length === 1) {
      navigate("/");
      document.body.scrollTop = 0; // For Safari
      document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
      currentIcon.add("activeIcon");
      profileIcon.remove("activeIcon");
    } else if (id === "profile" && currentIcon.length === 1) {
      navigate("profile");
      document.body.scrollTop = 0; // For Safari
      document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
      currentIcon.add("activeIcon");
      homeIcon.remove("activeIcon");
    } else {
      if (id === "home") id = "/";
      navigate(id);
      document.body.scrollTop = 0; // For Safari
      document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    }
  };

  return (
    <div className="navbar">
      <label className="switch">
        <input type="checkbox" />
        <span className="slider round" onClick={onSwitch}></span>
      </label>
      <div id="home" className="homeNav" onClick={() => activeIcon("home")} />
      <div
        id="profile"
        className="profileNav"
        onClick={() => activeIcon("profile")}
      />
    </div>
  );
};
