import { images } from "../assets/utils/importImages";

//import { useNavigate, useLocation } from "react-router-dom";
export const Footer = () => {
  // const navigate = useNavigate();
  // const location = useLocation().pathname;

  return (
    <footer className="footer">
      <div className="footerSections">
        <div className="footerSection">
          <h2 className="footerTitles">Contact</h2>
          <div className="footerInfos contact">
            <div>
              <a href="https://www.linkedin.com/in/mayerarthur/">
                <img
                  className="linkedin"
                  src={images.linkedin}
                  alt="linkedin"
                />
              </a>
            </div>
            <div>
              <a href="https://github.com/Zararthustra">
                <img className="github" src={images.github} alt="github" />
              </a>
            </div>
            <div>
              <a href="mailto:arthmayer@outlook.fr">
                <img className="mail" src={images.mail} alt="mail" />
              </a>
            </div>
          </div>
        </div>
        <div className="footerSection">
          <h2 className="footerTitles">Du même developpeur</h2>
          <div className="footerInfos devs">
            <div>
              <a href="https://recordit.games/">
                <img
                  className="recordit"
                  src={images.recordit}
                  alt="recordit"
                />
              </a>
            </div>
            <div>
              <a href="https://checklist.arthurm.tech/">
                <img
                  className="checklist"
                  src={images.checklist}
                  alt="checklist"
                />
              </a>
            </div>
          </div>
        </div>
        <div className="footerSection">
          <h2 className="footerTitles">Informations</h2>
          <div className="footerInfos">
            <div>
              Avatars provided by{" "}
              <a href="https://avatars.dicebear.com/">Dicebear</a>
            </div>
            <div>Privacy Policy</div>
            <div>Terms & Conditions</div>
          </div>
        </div>
      </div>
      <div className="footerRights">
        <div>All Rights Reserved</div>
        <div>© 2022 Les Popotes</div>
      </div>
    </footer>
  );
};
