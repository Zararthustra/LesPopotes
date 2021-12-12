import { Link, Outlet } from "react-router-dom";

export const Profile = () => {
  const toggleActiveLink = (id) => {
    let activeLink = document.getElementById(id).classList;
    let myprofile = document.getElementById("myprofile").classList;
    let favorites = document.getElementById("favorites").classList;
    let creations = document.getElementById("creations").classList;
    let mypopotes = document.getElementById("mypopotes").classList;

    if (id === "mypopotes" && activeLink.length === 1) {
      activeLink.add("activePopotes");
      myprofile.remove("activeProfile");
      favorites.remove("activePopote");
      creations.remove("activePopote");
    } else if (id === "myprofile" && activeLink.length === 1) {
      activeLink.add("activeProfile");
      mypopotes.remove("activePopotes");
      favorites.remove("activePopote");
      creations.remove("activePopote");
    } else if (id === "favorites" && activeLink.length === 1) {
      activeLink.add("activePopote");
      mypopotes.remove("activePopotes");
      myprofile.remove("activeProfile");
      creations.remove("activePopote");
    } else if (id === "creations" && activeLink.length === 1) {
      activeLink.add("activePopote");
      mypopotes.remove("activePopotes");
      myprofile.remove("activeProfile");
      favorites.remove("activePopote");
    }
  };

  return (
    <div className="headerContainer">
      <h1 className="title profile">Profil</h1>
      <div className="links">
        <Link
          onClick={() => toggleActiveLink("myprofile")}
          id="myprofile"
          className="navlink"
          to="monprofil"
        >
          Mon Profil
        </Link>
        <Link
          onClick={() => toggleActiveLink("favorites")}
          id="favorites"
          className="navlink"
          to="favorites"
        >
          Mes Favoris
        </Link>
        <Link
          onClick={() => toggleActiveLink("creations")}
          id="creations"
          className="navlink"
          to="creations"
        >
          Mes Creations
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
      <Outlet />
    </div>
  );
};
