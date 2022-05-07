import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { capitalize } from "../../assets/utils/capitalize";
import { getLevel } from "../../assets/utils/getLevel";
import { Host } from "../../assets/utils/host";
import ClipLoader from "react-spinners/ClipLoader";
import { images } from "../../assets/utils/importImages";
import { Modifymyprofile } from "./modifymyprofile";
import { Toaster } from "../../components/toaster";
import { Notification } from "../../components/notification";
import { RefreshSession } from "../../components/refreshSession";

export const Monprofil = () => {
  const navigate = useNavigate();
  axios.defaults.headers.common["authorization"] = localStorage.getItem("accessToken");
  const userName = localStorage.getItem("username");
  const userID = localStorage.getItem("userid");
  const [userObject, setUserObject] = useState({});
  const [loading, setLoading] = useState(false);
  const [isInfos, setIsInfos] = useState(true);
  const [isNotif, setIsNotif] = useState(false);
  const [notifs, setNotifs] = useState([]);
  const [notifsToCheck, setNotifsToCheck] = useState([]);
  const [hasCheckedNotifs, setHasCheckedNotifs] = useState(false);
  const [isDisconnected, setIsDisconnected] = useState(false);
  const toasterRef = useRef(null);
  const refreshToken = localStorage.getItem("refreshToken");
  const [expiredSession, setExpiredSession] = useState(false);
  const level = getLevel(
    userObject.recipes,
    userObject.notes,
    userObject.popotes,
    userObject.comments
  );

  const logout = async () => {
    await axios.delete(`${Host}api/user/logout/${refreshToken}`);
    setIsDisconnected(true);
    toasterRef.current.showToaster();
    setTimeout(() => {
      localStorage.clear();
      navigate("/lapopote");
    }, 3000);
  };

  // Load data when mounting
  useEffect(() => {
    let isSubscribed = true;
    setLoading(true);
    const getUserInfos = async () => {
      const res = await axios.get(`${Host}api/users/${userName}`).catch((err) => {
        console.log("Session expirée, veuillez vous reconnecter.");
        return setExpiredSession(true)
      });
      const resNotif = await axios.get(`${Host}api/notification/${userID}`).catch((err) => {
        console.log("Session expirée, veuillez vous reconnecter.");
        return setExpiredSession(true)
      });
      if (isSubscribed && res) {
        setUserObject(res.data);
        setLoading(false);
      }
      if (isSubscribed && res && resNotif?.data.length > 0) {
        setNotifs(resNotif.data);

        let notificationIDToCheck = []
        resNotif.data.map((notif) => {
          if (!notif.isChecked) return notificationIDToCheck.push(notif.id)
          return ''
        })
        setNotifsToCheck(notificationIDToCheck);

        if (notificationIDToCheck.length > 0) {
          document.querySelector(".notifTab").classList = "notifTab twinkle";
        }
        else if (notificationIDToCheck.length === 0) {
          document.querySelector(".notifTab").classList = "notifTab";
          setHasCheckedNotifs(true)
        }
      }
    };
    getUserInfos();
    return () => (isSubscribed = false);
  }, [userName, userID]);

  useEffect(() => {
    notifsToCheck.length === 0 ? setHasCheckedNotifs(true) : setHasCheckedNotifs(false)
    if (isNotif && hasCheckedNotifs && notifsToCheck.length > 0) axios.put(`${Host}api/notification`, { notificationIDArray: notifsToCheck }).catch((err) => {
      console.log("Session expirée, veuillez vous reconnecter.");
      return setExpiredSession(true)
    });
  }, [notifsToCheck, isNotif, hasCheckedNotifs])

  const toggleTabInfos = () => {
    document.querySelector(".infosTab").classList = "infosTab activeTab";
    document.querySelector(".messagesTab").classList = "messagesTab";
    document.querySelector(".notifTab").classList = `notifTab${hasCheckedNotifs ? '' : " twinkle"}`;
    setIsInfos(true);
    setIsNotif(false)
  };
  const toggleTabMessages = () => {
    document.querySelector(".messagesTab").classList = "messagesTab activeTab";
    document.querySelector(".infosTab").classList = "infosTab";
    document.querySelector(".notifTab").classList = `notifTab${hasCheckedNotifs ? '' : " twinkle"}`;
    setIsInfos(false);
    setIsNotif(false)
  };
  const toggleTabNotif = () => {
    document.querySelector(".notifTab").classList = "notifTab activeTab";
    document.querySelector(".messagesTab").classList = "messagesTab";
    document.querySelector(".infosTab").classList = "infosTab";
    setHasCheckedNotifs(true)
    setIsInfos(false);
    setIsNotif(true)
  };

  if (expiredSession) return (
    <main className="lesPopotesPage">
      <RefreshSession />
    </main>
  )

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
          <div onClick={toggleTabNotif} className="notifTab">
            Notifications
          </div>
          <div onClick={toggleTabMessages} className="messagesTab">
            Modifier
          </div>
        </div>
        {isInfos ? (
          <div className="popoteProfileInfosBody">
            <div className="groupLevels">
              <div className="level">{level && level[0]}</div>
              <div className="levelBar">
                <div
                  className="currentLevel"
                  style={{
                    width: `${level && (level[1] > 40 ? 100 : (level[1] * 100) / 40)
                      }%`,
                  }}
                />
              </div>
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
        ) : isNotif ?
          <div className="notifications">
            {notifs.length > 0 ?
              notifs.map((notif, index) => {
                return <Notification key={index} notification={notif} />
              })
              : <h2 style={{ color: "var(--dark-popotes)" }}>Pas de notification</h2>}
          </div>
          : (
            <Modifymyprofile userObject={userObject} />
          )}
        <Toaster
          type="warning"
          message="Vous allez être deconnecté. À bientôt !"
          ref={toasterRef}
        />
        {!isDisconnected && (
          <div className="disconnectButton" onClick={logout}>
            Se déconnecter
          </div>
        )}
      </div>
    </main>
  );
};
