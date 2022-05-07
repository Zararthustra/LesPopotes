import { useState, useRef, useEffect } from "react";
import { Avatar } from "../../components/Avatar";
import { Host } from "../../assets/utils/host";
import axios from "axios";
import { refreshPage } from "../../assets/utils/refreshPage";
import Select from "react-select";
import { images } from "../../assets/utils/importImages";
import { Toaster } from "../../components/toaster";
import { RefreshSession } from "../../components/refreshSession";
import { icons } from "../../assets/utils/importIcons";
import ClipLoader from "react-spinners/ClipLoader";

export const Modifymyprofile = ({ userObject }) => {
  axios.defaults.headers.common["authorization"] = localStorage.getItem("accessToken");
  const [expiredSession, setExpiredSession] = useState(false);

  const [loading, setLoading] = useState(false);
  const [avatar, setAvatar] = useState(userObject.avatar);
  const [name, setName] = useState(userObject.name);
  const [password, setPassword] = useState(userObject.password);
  const [checklistName, setChecklistName] = useState("");
  const [checklistPassword, setChecklistPassword] = useState("");
  const [checklistOK, setChecklistOK] = useState(false);
  const [retryChecklist, setRetryChecklist] = useState(false);
  const [accountRecognized, setAccountRecognized] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [type, setType] = useState(userObject.type || "");
  const [mail, setMail] = useState(userObject.mail || "");
  const [linkedin, setLinkedin] = useState(userObject.linkedin || "");
  const [facebook, setFacebook] = useState(userObject.facebook || "");
  const [snapchat, setSnapchat] = useState(userObject.snapchat || "");
  const [instagram, setInstagram] = useState(userObject.instagram || "");
  const [twitter, setTwitter] = useState(userObject.twitter || "");
  const [tiktok, setTiktok] = useState(userObject.tiktok || "");
  const [whatsapp, setWhatsapp] = useState(userObject.whatsapp || "");
  const [saved, setSaved] = useState(false);
  const toasterRef = useRef(null);

  const selectStyle = {
    control: (base, state) => ({
      ...base,
      fontSize: "0.8em",
      cursor: "pointer",
      border: state.isFocused ? "1px var(--popotes) solid" : "1px black solid",
      boxShadow: "none",
      "&:hover": {
        border: "1px var(--popotes) solid",
      },
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isFocused ? "var(--dark-popotes)" : "white",
      color: state.isFocused ? "white" : "var(--dark-popotes)",
      "&:hover": {
        backgroundColor: "var(--dark-popotes)",
        color: "white",
      },
    }),
  };

  useEffect(() => {
    // Get checklist credentials
    const getChecklistCredentials = async () => {
      const res = await axios.get(`${Host}api/checklist/users/${localStorage.getItem("userid")}`);
      if (res) {
        setChecklistName(res.data.name)
        setChecklistPassword(res.data.password)
        setAccountRecognized(true)
      }
    };
    getChecklistCredentials();
  }, [])

  const popoteTypes = [
    { value: "gourmand", label: "Gourmand" },
    { value: "bon vivant", label: "Bon vivant" },
    { value: "cordon bleu", label: "Cordon bleu" },
    { value: "carnivore", label: "Carnivore" },
    { value: "cuisto du dimanche", label: "Cuisto du dimanche" },
    { value: "grignotteur", label: "Grignotteur" },
    { value: "cultivateur", label: "Cultivateur" },
    { value: "herbivore", label: "Herbivore" },
  ];

  const updatedUserPayload = {
    avatar,
    name,
    password,
    type,
    mail,
    linkedin,
    facebook,
    snapchat,
    instagram,
    twitter,
    tiktok,
    whatsapp,
  };

  const checkLoginChecklist = async () => {
    if (!checklistName || !checklistPassword) return
    setLoading(true)
    await axios.post(
      `${Host}api/checklist/users/${localStorage.getItem("userid")}`, {
      name: checklistName,
      password: checklistPassword
    }).then((res) => {
      if (res.data === 404)
        setRetryChecklist(true)
      else
        setChecklistOK(true)
      setLoading(false)
    })
  }

  const dissociateAccount = () => {
    axios.delete(`${Host}api/checklist/users/${localStorage.getItem("userid")}`)
    refreshPage(true)
  }

  const updateUser = async () => {

    await axios
      .put(`${Host}api/users/${userObject.id}`, updatedUserPayload)
      .then((res) => {
        if (!res) return console.log("No response from server");
        if (res.data.error) return console.log(res.data);
        setSaved(true);
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0;
        toasterRef.current.showToaster();
        setTimeout(() => refreshPage(true), 3000);
      })
      .catch((err) => {
        console.log("Session expirée, veuillez vous reconnecter.");
        setExpiredSession(true)
      });
  };

  const handleInputChange = (event) => {
    const className = event.currentTarget.className;
    const id = event.currentTarget.id;
    const value = event.currentTarget.value;

    if (className === "pseudoo") setName(value);
    if (className === "password") setPassword(value);
    if (className === "checklistName") setChecklistName(value);
    if (className === "checklistPassword") setChecklistPassword(value);
    if (id === "mail") setMail(value);
    if (id === "linkedin") setLinkedin(value);
    if (id === "facebook") setFacebook(value);
    if (id === "snapchat") setSnapchat(value);
    if (id === "instagram") setInstagram(value);
    if (id === "twitter") setTwitter(value);
    if (id === "tiktok") setTiktok(value);
    if (id === "whatsapp") setWhatsapp(value);
  };

  const handleSelectChange = (event) => {
    setType(event.label);
  };

  if (expiredSession) return <RefreshSession />

  return (
    <div className="modifyProfileContainer">
      <h3 className="profileSubTitle">Mon Popote</h3>
      <Avatar chosenAvatar={setAvatar} defaultAvatar={avatar} />
      <div className="clickToChange">Cliquer sur l'image pour changer d'avatar</div>
      <div className="selectModifyTypes">
        <Select
          isSearchable={false}
          styles={selectStyle}
          placeholder={userObject.type}
          className="inputType"
          onChange={handleSelectChange}
          options={popoteTypes}
        />
        <div
          className="popoteTypeDetailsButton"
          onClick={() => setShowDetails(!showDetails)}
        >
          {showDetails ? "-" : "+"} Détails
        </div>
      </div>
      {showDetails ? (
        <div className="popoteTypeDetails">
          <div className="detailTitle">Gourmand</div>
          <div className="detailDescription">Encore une petite lichette...</div>
          <div className="detailTitle">Bon vivant</div>
          <div className="detailDescription">Le gras, c'est la vie</div>
          <div className="detailTitle">Cordon bleu</div>
          <div className="detailDescription">
            C'est pas de la cuisine, c'est de la magie
          </div>
          <div className="detailTitle">Carnivore</div>
          <div className="detailDescription">Le viandard</div>
          <div className="detailTitle">Cuisto du dimanche</div>
          <div className="detailDescription">Comme son nom l'indique</div>
          <div className="detailTitle">Grignotteur</div>
          <div className="detailDescription">Mange peu mais suffisamment</div>
          <div className="detailTitle">Cultivateur</div>
          <div className="detailDescription">Cultive ses propres produits</div>
          <div className="detailTitle">Herbivore</div>
          <div className="detailDescription">
            La viande c'est pour les sauvages
          </div>
        </div>
      ) : (
        ""
      )}
      <div className="separatePopotes"></div>
      <h3 className="profileSubTitle">Connexion</h3>
      <h4 className="profileSubSubTitle">Les Popotes</h4>
      <div>
        <p>Pseudo</p>
        <input
          type="text"
          className="pseudoo"
          value={name}
          onChange={handleInputChange}
        />
      </div>
      {name !== userObject.name ? (
        <div>
          <div className="cautionMessage">Si vous modifiez ce champ</div>
          <div className="cautionMessage">
            vous serez déconnecté après avoir sauvegardé !
          </div>
        </div>
      ) : (
        ""
      )}
      <div>
        <p>Mot de passe</p>
        <input
          type="password"
          className="password"
          value={password}
          onChange={handleInputChange}
        />
      </div>
      {password !== userObject.password ? (
        <div>
          <div className="cautionMessage">Si vous modifiez ce champ</div>
          <div className="cautionMessage">
            vous serez déconnecté après avoir sauvegardé !
          </div>
        </div>
      ) : (
        ""
      )}
      <h4 className="profileSubSubTitle">Checklist</h4>
      <div>
        <p>Pseudo</p>
        <input
          type="text"
          className="checklistName"
          value={checklistName}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <p>Mot de passe</p>
        <input
          type="password"
          className="checklistPassword"
          value={checklistPassword}
          onChange={handleInputChange}
        />
      </div>
      {loading ?
        <ClipLoader css={""} color={"#78f5ca"} loading={loading} size={50} /> :
        checklistOK ?
          <div style={{ display: "flex", alignItems: "center", color: "var(--dark-popotes)", marginTop: "0.5em" }}>
            Compte valide
            <img src={icons.ok} className="toasterIcon" alt="succès" />
          </div> :
          retryChecklist ?
            <div className="checklistButton" onClick={checkLoginChecklist}>Réessayer</div> :
            <div className="checklistButton" onClick={checkLoginChecklist}>Test connexion</div>
      }
      {
        accountRecognized &&
        <div onClick={dissociateAccount} style={{ color: "red", fontWeight: "bolder", cursor: "pointer", fontSize: "0.8em"}}>Dissocier mon compte Checklist</div>
      }

      <div className="separatePopotes"></div>
      <h3 className="profileSubTitle">Réseaux</h3>
      <div className="clickToChange">Copiez/collez un lien vers vos profils</div>
      <div className="clickToChange">pour les partager avec les popotes.</div>
      <div className="clickToChangeLast">Ils apparaîteront sur votre profil</div>
      <div className="center">
        <img className="mail" src={images.mail} alt="mail" />
        <input
          id="mail"
          type="text"
          placeholder="Mon adresse mail"
          value={mail}
          onChange={handleInputChange}
        />
      </div>
      <div className="center">
        <img className="linkedin" src={images.linkedin} alt="linkedin" />
        <input
          id="linkedin"
          placeholder="Lien vers mon profil Linkedin"
          type="text"
          value={linkedin}
          onChange={handleInputChange}
        />
      </div>
      <div className="center">
        <img className="facebook" src={images.facebook} alt="facebook" />
        <input
          id="facebook"
          placeholder="Lien vers mon profil Facebook"
          type="text"
          value={facebook}
          onChange={handleInputChange}
        />
      </div>
      <div className="center">
        <img className="snapchat" src={images.snapchat} alt="snapchat" />
        <input
          id="snapchat"
          placeholder="Lien vers mon profil Snapchat"
          type="text"
          value={snapchat}
          onChange={handleInputChange}
        />
      </div>
      <div className="center">
        <img className="instagram" src={images.instagram} alt="instagram" />
        <input
          id="instagram"
          placeholder="Lien vers mon profil Instagram"
          type="text"
          value={instagram}
          onChange={handleInputChange}
        />
      </div>
      <div className="center">
        <img className="twitter" src={images.twitter} alt="twitter" />
        <input
          id="twitter"
          placeholder="Lien vers mon profil Twitter"
          type="text"
          value={twitter}
          onChange={handleInputChange}
        />
      </div>
      <div className="center">
        <img className="tiktok" src={images.tiktok} alt="tiktok" />
        <input
          id="tiktok"
          placeholder="Lien vers mon profil Tiktok"
          type="text"
          value={tiktok}
          onChange={handleInputChange}
        />
      </div>
      <div className="center">
        <img className="whatsapp" src={images.whatsapp} alt="whatsapp" />
        <input
          id="whatsapp"
          placeholder="Lien vers mon profil Whatsapp"
          type="text"
          value={whatsapp}
          onChange={handleInputChange}
        />
      </div>
      <div className="separatePopotes"></div>
      <Toaster
        type="success"
        message="Modification enregistrée. Redirection ..."
        ref={toasterRef}
      />
      {!saved && (
        <button className="myprofileModifyButton" onClick={updateUser}>
          Enregistrer
        </button>
      )}
    </div>
  );
};
