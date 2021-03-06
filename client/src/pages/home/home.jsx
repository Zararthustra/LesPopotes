import { useEffect } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";

export const Home = () => {
  const navigate = useNavigate();
  const location = useLocation().pathname;

  useEffect(() => {
    let bestof = document.getElementById("bestof").classList;
    let lastpubs = document.getElementById("lastpubs").classList;
    let accueil = document.getElementById("accueil").classList;

    if (location === "/accueil/bestof") {
      bestof.add("activePopote");
      lastpubs.remove("activePopote");
      accueil.remove("activePopote");
    } else if (location === "/accueil/nouveautes") {
      lastpubs.add("activePopote");
      bestof.remove("activePopote");
      accueil.remove("activePopote");
    } else if (location === "/accueil") {
      accueil.add("activePopote");
      lastpubs.remove("activePopote");
      bestof.remove("activePopote");
    }
  }, [location]);

  const goPopotes = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    navigate("/lespopotes");
  };
  const goPopote = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    navigate("/lapopote");
  };

  return (
    <>
      <div className="headerContainer">
        <h1 className="title home" onClick={() => navigate("/accueil")}>
          Accueil
        </h1>
        <div className="links">
          <Link id="accueil" className="navlink" to="/accueil">
            Accueil
          </Link>
          <Link id="bestof" className="navlink" to="bestof">
            Les mieux notées
          </Link>
          <Link id="lastpubs" className="navlink" to="nouveautes">
            Nouveautés
          </Link>
        </div>
      </div>
      {location !== "/accueil" ? (
        <Outlet />
      ) : (
        <main className="homeContainer">
          <div className="homeTitle">
            <h1>
              Le
              <div className="popotesTitle">Réseau Social</div>
            </h1>
            <h1>
              des
              <div className="popoteTitle">Recettes</div>
            </h1>
          </div>
          <div className="presentation1">
            <h1 className="homeText">En deux clics,</h1>
            <h1 className="homeText">naviguez entre</h1>
            <div
              onClick={() => goPopote()}
              className="homeSwitchImagePresentation"
            >
              <img
                src={require("../../assets/images/lapopote-switch.png").default}
                alt="la popote"
              />
              <h1 className="popoteTitle">La Popote</h1>
            </div>
            <h1 className="homeText">et</h1>

            <div
              onClick={() => goPopotes()}
              className="homeSwitchImagePresentation"
            >
              <img
                src={
                  require("../../assets/images/lespopotes-switch.png").default
                }
                alt="les popotes"
              />
              <h1 className="popotesTitle">Les Popotes</h1>
            </div>
          </div>
          <div
            onClick={() => navigate("/lespopotes")}
            className="presentation2 joinPopotes"
          />
          <h1 className="joinPopotesH1" onClick={() => navigate("/lespopotes")}>
            Rejoignez les Popotes !
          </h1>
        </main>
      )}
    </>
  );
};
