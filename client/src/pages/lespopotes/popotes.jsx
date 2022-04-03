import axios from "axios";
import { useEffect, useRef } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { capitalize } from "../../assets/utils/capitalize";
import { getLevel } from "../../assets/utils/getLevel";
import { Host } from "../../assets/utils/host";
import { images } from "../../assets/utils/importImages";
import { icons } from "../../assets/utils/importIcons";
import { Messages } from "../../components/messages";
import ClipLoader from "react-spinners/ClipLoader";
import { Toaster } from "../../components/toaster";

export const Popotes = () => {
  const { popote } = useParams();
  const navigate = useNavigate();

  const [userObject, setUserObject] = useState({});
  const [activeTab, setActiveTab] = useState("infosTab");
  const [recipes, setRecipes] = useState([]);
  const [isMyPopote, setIsMyPopote] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const isNotMe = userObject.id !== parseInt(localStorage.getItem("userid"));
  const [loading, setLoading] = useState(false);
  const toasterRef = useRef(null);
  const level = getLevel(
    userObject.recipes,
    userObject.notes,
    userObject.popotes,
    userObject.comments
  );

  // Load data when mounting
  useEffect(() => {
    //get popote
    setLoading(true);
    axios.get(`${Host}api/users/${popote}`).then((res) => {
      if (res.data) {
        setUserObject(res.data);

        // get popote's recipes
        axios
          .get(`${Host}api/userrecipes/${res.data.id}`)
          .then((res) => {
            if (res.data) {
              setRecipes(res.data);
            }
          })
          .catch((error) => {
            console.log("An error occured while requesting recipes:\n", error);
          });

        // get friendship status
        axios
          .get(`${Host}api/friendships/${localStorage.getItem("userid")}`, {
            params: { popote_id: res.data.id },
          })
          .then((res) => {
            if (res.data) {
              setIsMyPopote(true);
              setLoading(false);
            } else setLoading(false);
          });
      } else {
        setLoading(false)
        setNotFound(true)
      }
    });

  }, [popote]);


  const toggleTabInfos = () => {
    document.querySelector(".infosTab").classList = "infosTab activeTab";
    document.querySelector(".messagesTab").classList = "messagesTab";
    document.querySelector(".recettesTab").classList = "recettesTab";
    setActiveTab("infosTab");
  };
  const toggleTabMessages = () => {
    document.querySelector(".messagesTab").classList = "messagesTab activeTab";
    document.querySelector(".infosTab").classList = "infosTab";
    document.querySelector(".recettesTab").classList = "recettesTab";
    setActiveTab("messagesTab");
  };
  const toggleTabRecettes = () => {
    document.querySelector(".recettesTab").classList = "recettesTab activeTab";
    document.querySelector(".messagesTab").classList = "messagesTab";
    document.querySelector(".infosTab").classList = "infosTab";
    setActiveTab("recettesTab");
  };

  const addPopote = () => {
    axios
      .post(`${Host}api/friendships`, {
        user_id: localStorage.getItem("userid"),
        popote_id: userObject.id,
      })
      .then((res) => {
        if (res.data) {
          setIsMyPopote(true);
          toasterRef.current.showToaster();
        }
      });
    axios
      .post(`${Host}api/notification`, {
        sender_id: localStorage.getItem("userid"),
        sender_name: localStorage.getItem("username"),
        receiver_id: userObject.id,
        type: 'friendship'
      })
  };

  const deletePopote = () => {
    axios
      .delete(`${Host}api/friendships/${localStorage.getItem("userid")}`, {
        params: { popote_id: userObject.id },
      })
      .then((res) => {
        if (res.data) {
          setIsMyPopote(false);
          toasterRef.current.showToaster();
        }
      });
  };

  const recipeTypeIcon = (recipe) => {
    if (recipe.type === "apero") return icons.apero;
    if (recipe.type === "entree") return icons.entree;
    if (recipe.type === "plat") return icons.plat;
    if (recipe.type === "dessert") return icons.dessert;
    if (recipe.type === "boisson") return icons.boisson;
    return icons.autre;
  };

  if (loading)
    return (
      <main className="popoteContainer">
        <ClipLoader css={""} color={"#78f5ca"} loading={loading} size={100} />
      </main>
    );
  if (notFound) return (
    <main className="notFound" onClick={() => navigate('/lespopotes')}>
      <img src="https://avatars.dicebear.com/api/big-smile/randomm400...........svg?translateY=10" alt="avatar" className="avatarNotFound" />
      <h1 className="zindex">Ce popote n'existe pas !</h1>
      <p className="infinite404">{"400 ".repeat(500)}</p>
    </main>
  )
  if (userObject)
    return (
      <main className="popoteContainer">
        <Toaster
          type="info"
          message={
            isMyPopote
              ? `${capitalize(userObject.name)} ajouté à mes popotes`
              : `${capitalize(userObject.name)} supprimé de mes popotes`
          }
          ref={toasterRef}
        />
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
              {isNotMe && (
                <>
                  {isMyPopote ? (
                    <img
                      src={icons.removefriend}
                      alt="retirer de mes popotes"
                      title="Retirer de mes popotes"
                      onClick={deletePopote}
                      className="addPopote"
                    />
                  ) : (
                    <img
                      src={icons.addfriend}
                      alt="ajouter à mes popotes"
                      title="Ajouter à mes popotes"
                      onClick={addPopote}
                      className="addPopote"
                    />
                  )}
                </>
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
            <div onClick={toggleTabRecettes} className="recettesTab">
              Recettes
            </div>
          </div>
          {activeTab === "infosTab" && (
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
                      <img
                        className="tiktok"
                        src={images.tiktok}
                        alt="tiktok"
                      />
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
          )}
          {isNotMe && (
            <>
              {activeTab === "messagesTab" && <Messages popote={userObject} />}
            </>
          )}
          {activeTab === "recettesTab" && (
            <div className="popoteRecipes">
              {recipes.length > 0 ? (
                recipes.map((recipe, index) => {
                  return (
                    <div
                      className="popoteRecipe"
                      key={index}
                      onClick={() => navigate(`/lapopote/${recipe.id}`)}
                    >
                      <img
                        className="recipeType"
                        src={recipeTypeIcon(recipe)}
                        alt={recipe.type}
                      />
                      <div>{recipe.name && capitalize(recipe.name)}</div>
                    </div>
                  );
                })
              ) : (
                <h2 style={{ color: "var(--dark-popote)" }}>Pas de recette</h2>
              )}
            </div>
          )}
        </div>
      </main>
    );
};
