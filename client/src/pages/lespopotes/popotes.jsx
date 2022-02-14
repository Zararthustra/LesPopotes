import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { capitalize } from "../../assets/utils/capitalize";
import { getLevel } from "../../assets/utils/getLevel";
import { Host } from "../../assets/utils/host";
import { images } from "../../assets/utils/importImages";
import { icons } from "../../assets/utils/importIcons";

export const Popotes = () => {
  const { popote } = useParams();
  const navigate = useNavigate();

  const [userObject, setUserObject] = useState({});
  const [isInfos, setIsInfos] = useState(true);
  const [isMyPopote, setIsMyPopote] = useState(false);

  // Load data when mounting
  useEffect(() => {
    axios.get(`${Host}api/users/${popote}`).then((res) => {
      if (res.data) {
        setUserObject(res.data);
        axios
          .get(`${Host}api/friendships/${localStorage.getItem("userid")}`, {
            params: { popote_id: res.data.id },
          })
          .then((res) => {
            if (res.data) {
              console.log(res.data);
              setIsMyPopote(true);
            }
          });
      }
    });
  }, [popote]);

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

  const addPopote = () => {
    axios
      .post(`${Host}api/friendships`, {
        user_id: localStorage.getItem("userid"),
        popote_id: userObject.id,
      })
      .then((res) => {
        if (res.data) {
          console.log(res.data);
          setIsMyPopote(true);
        }
      });
  };

  const deletePopote = () => {
    axios
      .delete(`${Host}api/friendships/${localStorage.getItem("userid")}`, {
        params: { popote_id: userObject.id },
      })
      .then((res) => {
        if (res.data) {
          console.log(res.data);
          setIsMyPopote(false);
        }
      });
  };

  // <button className="myprofileModifyButton" onClick={() => navigate(-1)}>
  //   Retour
  // </button>;
  return (
    <main className="popoteContainer">
      <div className="popoteProfile">
        <div className="popoteProfileHeader">
        <img
                src={icons.cross}
                alt="fermer"
                onClick={() => navigate(-1)}
                className="closePopote"
              />
          <img src={userObject.avatar} alt="avatar" className="avatar" />
          <div className="mypopoteNames">
            <div className="pseudo">
              {userObject.name && capitalize(userObject.name)}
            </div>
            <div className="type">{userObject.type}</div>
            {isMyPopote ? (
              <img
                src={icons.moins}
                alt="retirer de mes popotes"
                onClick={deletePopote}
                className="addPopote"
              />
            ) : (
              <img
                src={icons.plus}
                alt="ajouter à mes popotes"
                onClick={addPopote}
                className="addPopote"
              />
            )}
          </div>
        </div>
        <div className="tabs">
          <div onClick={toggleTabInfos} className="infosTab activeTab">
            Infos
          </div>
          <div onClick={toggleTabMessages} className="messagesTab">
            Messages
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
              {
                //userObject.mail &&
                <li>
                  <a href={`mailto:${userObject.mail}`}>
                    <img className="mail" src={images.mail} alt="mail" />
                  </a>
                </li>
              }
              {
                //userObject.linkedin &&
                <li>
                  <a href={userObject.linkedin}>
                    <img
                      className="linkedin"
                      src={images.linkedin}
                      alt="linkedin"
                    />
                  </a>
                </li>
              }
              {
                //userObject.instagram &&
                <li>
                  <a href={userObject.instagram}>
                    <img
                      className="instagram"
                      src={images.instagram}
                      alt="instagram"
                    />
                  </a>
                </li>
              }
              {
                //userObject.facebook &&
                <li>
                  <a href={userObject.facebook}>
                    <img
                      className="facebook"
                      src={images.facebook}
                      alt="facebook"
                    />
                  </a>
                </li>
              }
              {
                //userObject.snapchat &&
                <li>
                  <a href={userObject.snapchat}>
                    <img
                      className="snapchat"
                      src={images.snapchat}
                      alt="snapchat"
                    />
                  </a>
                </li>
              }
            </ul>
          </div>
        ) : (
          <div className="popoteProfileMessagesBody">messages</div>
        )}
      </div>
    </main>
  );
};
