import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { capitalize } from "../../assets/utils/capitalize";
import { getLevel } from "../../assets/utils/getLevel";
import { Host } from "../../assets/utils/host";
import ClipLoader from "react-spinners/ClipLoader";
import { images } from "../../assets/utils/importImages";
import { Modifymyprofile } from "./modifymyprofile";

export const Monprofil = () => {
  const navigate = useNavigate();
  const userName = localStorage.getItem("username");
  const [userObject, setUserObject] = useState({});
  const [loading, setLoading] = useState(false);
  const [isInfos, setIsInfos] = useState(true);

  const logout = (event) => {
    localStorage.clear();
    navigate("/lapopote");
  };

  // Load data when mounting
  useEffect(() => {
    let isSubscribed = true;
    setLoading(true);
    const getUserObject = async () => {
      const res = await axios.get(`${Host}api/users/${userName}`);
      if (isSubscribed && res) {
        setUserObject(res.data);
        setLoading(false);
      }
    };
    getUserObject();

    return () => (isSubscribed = false);
  }, [userName]);

  const toggleTabInfos = () => {
    document.querySelector(".infosTab").classList = "infosTab activeTab";
    document.querySelector(".messagesTab").classList = "messagesTab";
    setIsInfos(true);
  };
  const toggleTabMessages = () => {
    document.querySelector(".messagesTab").classList = "messagesTab activeTab";
    document.querySelector(".infosTab").classList = "infosTab";
    setIsInfos(false);
  };

  if (loading)
    return (
      <div className="myprofileBody">
        <div className="loaderSpacer" />
        <ClipLoader css={""} color={"#78f5ca"} loading={loading} size={100} />
      </div>
    );
  return (
    <main className="profileContainer">
      <div className="popoteProfile">
        <div className="myprofileHeader">
          <img src={userObject.avatar} alt="avatar" className="avatar" />
          <div className="profileNames">
            <div className="pseudo">
              {userObject.name && capitalize(userObject.name)}
            </div>
            <div className="type">{userObject.type}</div>
          </div>
        </div>
        <div className="tabs">
          <div onClick={toggleTabInfos} className="infosTab activeTab">
            Infos
          </div>
          <div onClick={toggleTabMessages} className="messagesTab">
            Modifier
          </div>
        </div>
        {isInfos ? (
          <div className="popoteProfileInfosBody">
            <div className="level">
              {getLevel(
                userObject.recipes,
                userObject.notes,
                userObject.popotes,
                userObject.comments
              )}
            </div>
            <ul className="levelInfos">
              <li>
                <p>Recettes</p>
                <p>{userObject.recipes}</p>
              </li>
              <li>
                <p>Notes</p>
                <p>{userObject.notes}</p>
              </li>
              <li>
                <p>Popotes</p>
                <p>{userObject.popotes}</p>
              </li>
              <li>
                <p>Commentaires</p>
                <p>{userObject.comments}</p>
              </li>
            </ul>
            <ul className="socialnetworks">
              {userObject.mail && (
                <li>
                  <a href={`mailto:${userObject.mail}`}>
                    <img className="mail" src={images.mail} alt="mail" />
                  </a>
                </li>
              )}
              {userObject.linkedin && (
                <li>
                  <a href={userObject.linkedin}>
                    <img
                      className="linkedin"
                      src={images.linkedin}
                      alt="linkedin"
                    />
                  </a>
                </li>
              )}
              {userObject.instagram && (
                <li>
                  <a href={userObject.instagram}>
                    <img
                      className="instagram"
                      src={images.instagram}
                      alt="instagram"
                    />
                  </a>
                </li>
              )}
              {userObject.facebook && (
                <li>
                  <a href={userObject.facebook}>
                    <img
                      className="facebook"
                      src={images.facebook}
                      alt="facebook"
                    />
                  </a>
                </li>
              )}
              {userObject.snapchat && (
                <li>
                  <a href={userObject.snapchat}>
                    <img
                      className="snapchat"
                      src={images.snapchat}
                      alt="snapchat"
                    />
                  </a>
                </li>
              )}
              {userObject.twitter && (
                <li>
                  <a href={userObject.twitter}>
                    <img
                      className="twitter"
                      src={images.twitter}
                      alt="twitter"
                    />
                  </a>
                </li>
              )}
              {userObject.tiktok && (
                <li>
                  <a href={userObject.tiktok}>
                    <img className="tiktok" src={images.tiktok} alt="tiktok" />
                  </a>
                </li>
              )}
              {userObject.whatsapp && (
                <li>
                  <a href={userObject.whatsapp}>
                    <img
                      className="whatsapp"
                      src={images.whatsapp}
                      alt="whatsapp"
                    />
                  </a>
                </li>
              )}
            </ul>
          </div>
        ) : (
          <Modifymyprofile userObject={userObject} />
        )}
        <div className="disconnectButton" onClick={logout}>
          Se déconnecter
        </div>
      </div>
    </main>
  );
};
