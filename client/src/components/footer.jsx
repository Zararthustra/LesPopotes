import { images } from "../assets/utils/importImages";
import { useNavigate } from "react-router-dom";

export const Footer = () => {
  const navigate = useNavigate();

  const goToPrivacyPolicy = () => {
    navigate('privacypolicy')
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0;
  }
  const goToTermsConditions = () => {
    navigate('termsconditions')
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0;
  }
  const goToSitePlan = () => {
    navigate('plandusite')
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0;
  }

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
            <a href="https://recordit.arthurmayer.fr/">
              <img
                className="recordit"
                src={images.recordit}
                alt="recordit"
              />
            </a>
          </div>
          <div>
            <a href="https://checklist.arthurmayer.fr/">
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
          <div >
            Avatars provided by{" "}
            <a href="https://avatars.dicebear.com/">Dicebear</a>
          </div>
          <div className="simpleLink" onClick={goToPrivacyPolicy}>Privacy Policy</div>
          <div className="simpleLink" onClick={goToTermsConditions}>Terms & Conditions</div>
          <div className="simpleLink" onClick={goToSitePlan}>Plan du site</div>
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
