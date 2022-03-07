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
          <Link id="bestof" className="navlink" to="bestof">
            Best Of
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
              <h1 className="popotesTitle">Réseau Social</h1>
            </h1>
            <h1>
              des
              <h1 className="popoteTitle">Recettes</h1>
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
          <h1 className="joinPopotesH1">Rejoignez les Popotes !</h1>
        </main>
      )}
    </>
  );
};
