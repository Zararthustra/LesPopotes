import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { refreshPage } from "../assets/utils/refreshPage";
import { Host } from "../assets/utils/host";
import axios from "axios";

export const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation().pathname;
  const userID = localStorage.getItem("userid");
  const [notifsToCheck, setNotifsToCheck] = useState(0);

  // Display the switch box color according to route /^\/lapopote\/.*/
  useEffect(() => {
    let slider = document.querySelector(".slider").style;
    let profileIcon = document.getElementById("profile").classList;
    let homeIcon = document.getElementById("home").classList;

    const getNotifs = async () => {
      const resNotif = await axios.get(`${Host}api/notification/${userID}`);
      if (resNotif.data.length > 0) {
        setNotifsToCheck(resNotif.data.filter((notif) => notif.isChecked === false).length)
      }
    }

    if (location.match(/lapopote/)) {
      slider.background = "var(--popote)";
      slider.animation = "none"
      slider.setProperty("--switch", "var(--dark-popote)");
    } else if (location.match(/lespopotes/)) {
      slider.background = "var(--popotes)";
      slider.animation = "none"
      slider.setProperty("--switch", "var(--dark-popotes)");
    } else if (location === '/') {
      slider.background = "grey";
      slider.animation = "clickBait 3s infinite"
      slider.webkitAnimation = "clickBait 3s infinite"
    }
     else {
      slider.background = "grey";
      slider.animation = "none"
      slider.setProperty("--switch", "var(--dark)");
      if (location === "/accueil") homeIcon.add("activeIcon");
      if (location === "/profil") profileIcon.add("activeIcon");
    }
    getNotifs()
  }, [location, userID]);

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
      navigate("accueil");
      document.body.scrollTop = 0; // For Safari
      document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
      currentIcon.add("activeIcon");
      profileIcon.remove("activeIcon");
    } else if (id === "profile" && currentIcon.length === 1) {
      navigate("profil");
      document.body.scrollTop = 0; // For Safari
      document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
      currentIcon.add("activeIcon");
      homeIcon.remove("activeIcon");
    } else {
      const redirect = id === "home" ? "accueil" : "profil";
      navigate(redirect);
      document.body.scrollTop = 0; // For Safari
      document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    }
  };

  return (
    <div className="navbar">
      <label className="switch">
        <input type="checkbox" />
        <span
          className="slider round"
          onClick={onSwitch}
          title="La popote / Les popotes"
        ></span>
      </label>
      <div
        id="home"
        className="homeNav"
        onClick={() => activeIcon("home")}
        title="Accueil"
      />
      <div
        id="back"
        className="backNav"
        onClick={() => navigate(-1)}
        title="Page précédente"
      />
      <div
        id="refresh"
        className="refreshNav"
        onClick={() => refreshPage()}
        title="Actualiser la page"
      />
      <div
        id="profile"
        className="profileNav"
        onClick={() => activeIcon("profile")}
        title="Profil"
      >
        {notifsToCheck > 0 && <div className="notificationChip">{notifsToCheck}</div>}
      </div>
    </div>
  );
};
