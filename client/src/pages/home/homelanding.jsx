import { useNavigate } from "react-router-dom";

export const Homelanding = () => {
  const navigate = useNavigate();

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
      <div className="homelandingBody">
        <div className="landingTitle">
          <h1 className="landingTitle1">Les popotes</h1>
          <div className="landingTitle2">
            <h3 className="cuisiner">Cuisiner</h3>
            <h3 className="partager">Partager</h3>
          </div>
        </div>
      </div>
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
              src={require("../../assets/images/lespopotes-switch.png").default}
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
    </>
  );
};
