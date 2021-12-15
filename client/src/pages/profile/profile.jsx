import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import { Modifymyprofile } from "./modifymyprofile";
import { Monprofil } from "./myprofile";

export const Profile = () => {
  const navigate = useNavigate();
  const location = useLocation().pathname;

  const toggleActiveLink = (id) => {
    let activeLink = document.getElementById(id).classList;
    let favorites = document.getElementById("favorites").classList;
    let mesrecettes = document.getElementById("mesrecettes").classList;
    let mypopotes = document.getElementById("mypopotes").classList;

    if (id === "mypopotes" && activeLink.length === 1) {
      activeLink.add("activePopotes");
      favorites.remove("activePopote");
      mesrecettes.remove("activePopote");
    } else if (id === "favorites" && activeLink.length === 1) {
      activeLink.add("activePopote");
      mypopotes.remove("activePopotes");
      mesrecettes.remove("activePopote");
    } else if (id === "mesrecettes" && activeLink.length === 1) {
      activeLink.add("activePopote");
      mypopotes.remove("activePopotes");
      favorites.remove("activePopote");
    }
  };

  if (location === "/profile/modifier") return <Modifymyprofile />;

  return (
    <div className="headerContainer">
      <h1 className="title profile" onClick={() => navigate("/profil")}>
        Profil
      </h1>
      <div className="links">
        <Link
          onClick={() => toggleActiveLink("favorites")}
          id="favorites"
          className="navlink"
          to="favorites"
        >
          Mes Favoris
        </Link>
        <Link
          onClick={() => toggleActiveLink("mesrecettes")}
          id="mesrecettes"
          className="navlink"
          to="mesrecettes"
        >
          Mes Recettes
        </Link>
        <Link
          onClick={() => toggleActiveLink("mypopotes")}
          id="mypopotes"
          className="navlink"
          to="mespopotes"
        >
          Mes Popotes
        </Link>
      </div>
      {location === "/profil" ? <Monprofil /> : <Outlet />}
    </div>
  );
};
