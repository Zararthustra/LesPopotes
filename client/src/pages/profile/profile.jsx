import { useEffect } from "react";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import { Monprofil } from "./myprofile";

export const Profile = () => {
  const navigate = useNavigate();
  const location = useLocation().pathname;

  useEffect(() => {
    let favorites = document.getElementById("favorites").classList;
    let mesrecettes = document.getElementById("mesrecettes").classList;
    let mypopotes = document.getElementById("mypopotes").classList;

    if (location === "/profil/mespopotes") {
      mypopotes.add("activePopotes");
      favorites.remove("activePopote");
      mesrecettes.remove("activePopote");
    } else if (location === "/profil/favorites") {
      favorites.add("activePopote");
      mypopotes.remove("activePopotes");
      mesrecettes.remove("activePopote");
    } else if (location === "/profil/mesrecettes") {
      mesrecettes.add("activePopote");
      mypopotes.remove("activePopotes");
      favorites.remove("activePopote");
    }
  }, [location]);

  return (
    <div className="headerContainer">
      <h1 className="title profile" onClick={() => navigate("/profil")}>
        Profil
      </h1>
      <div className="links">
        <Link id="favorites" className="navlink" to="favorites">
          Mes Favoris
        </Link>
        <Link id="mesrecettes" className="navlink" to="mesrecettes">
          Mes Recettes
        </Link>
        <Link id="mypopotes" className="navlink" to="mespopotes">
          Mes Popotes
        </Link>
      </div>
      {location === "/profil" ? <Monprofil /> : <Outlet />}
    </div>
  );
};
