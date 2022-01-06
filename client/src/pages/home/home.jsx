import { Link, Outlet, useNavigate } from "react-router-dom";

export const Home = () => {
  const navigate = useNavigate();

  const toggleActiveLink = (id) => {
    let activeLink = document.getElementById(id).classList;
    let bestof = document.getElementById("bestof").classList;
    let lastpubs = document.getElementById("lastpubs").classList;

    if (id === "bestof" && activeLink.length === 1) {
      activeLink.add("activePopote");
      lastpubs.remove("activePopote");
    } else if (id === "lastpubs" && activeLink.length === 1) {
      activeLink.add("activePopote");
      bestof.remove("activePopote");
    }
  };

  return (
    <div className="headerContainer">
      <h1 className="title home" onClick={() => navigate("/accueil")}>
        Accueil
      </h1>
      <div className="links">
        <Link
          onClick={() => toggleActiveLink("bestof")}
          id="bestof"
          className="navlink"
          to="bestof"
        >
          Best Of
        </Link>
        <Link
          onClick={() => toggleActiveLink("lastpubs")}
          id="lastpubs"
          className="navlink"
          to="nouveautes"
        >
          Nouveautés
        </Link>
      </div>
      <Outlet />
    </div>
  );
};
