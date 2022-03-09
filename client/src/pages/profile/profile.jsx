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
    let myprofile = document.getElementById("myprofile").classList;

    if (location === "/profil") {
      myprofile.add("activePopotes");
      mypopotes.remove("activePopotes");
      favorites.remove("activePopote");
      mesrecettes.remove("activePopote");
    } else if (location === "/profil/mespopotes") {
      mypopotes.add("activePopotes");
      favorites.remove("activePopote");
      mesrecettes.remove("activePopote");
      myprofile.remove("activePopotes");
    } else if (location === "/profil/favorites") {
      favorites.add("activePopote");
      mypopotes.remove("activePopotes");
      mesrecettes.remove("activePopote");
      myprofile.remove("activePopotes");
    } else if (location === "/profil/mesrecettes") {
      mesrecettes.add("activePopote");
      mypopotes.remove("activePopotes");
      favorites.remove("activePopote");
      myprofile.remove("activePopotes");
    }
  }, [location]);

  return (
    <>
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
          <Link id="myprofile" className="navlink" to="/profil">
            Mon profil
          </Link>
        </div>
      </div>
      {location === "/profil" ? <Monprofil /> : <Outlet />}
    </>
  );
};
