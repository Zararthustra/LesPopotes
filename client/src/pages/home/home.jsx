import { useEffect } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";

export const Home = () => {
  const navigate = useNavigate();
  const location = useLocation().pathname;

  useEffect(() => {
    let bestof = document.getElementById("bestof").classList;
    let lastpubs = document.getElementById("lastpubs").classList;

    if (location === "/accueil/bestof") {
      bestof.add("activePopote");
      lastpubs.remove("activePopote");
    } else if (location === "/accueil/nouveautes") {
      lastpubs.add("activePopote");
      bestof.remove("activePopote");
    }
  }, [location]);

  return (
    <div className="headerContainer">
      <h1 className="title home" onClick={() => navigate("/accueil")}>
        Accueil
      </h1>
      <div className="links">
        <Link id="bestof" className="navlink" to="bestof">
          Best Of
        </Link>
        <Link id="lastpubs" className="navlink" to="nouveautes">
          Nouveautés
        </Link>
      </div>
      <Outlet />
    </div>
  );
};
