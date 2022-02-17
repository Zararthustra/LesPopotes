import { useState } from "react";
import { Avatar } from "../../components/Avatar";
import { Host } from "../../assets/utils/host";
import axios from "axios";
import { refreshPage } from "../../assets/utils/refreshPage";
import Select from "react-select";
import { images } from "../../assets/utils/importImages";

export const Modifymyprofile = ({ userObject }) => {
  const [avatar, setAvatar] = useState(userObject.avatar);
  const [name, setName] = useState(userObject.name);
  const [password, setPassword] = useState(userObject.password);
  const [showDetails, setShowDetails] = useState(false);
  const [type, setType] = useState("");
  const [mail, setMail] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [facebook, setFacebook] = useState("");
  const [snapchat, setSnapchat] = useState("");
  const [instagram, setInstagram] = useState("");
  const [twitter, setTwitter] = useState("");
  const [tiktok, setTiktok] = useState("");
  const [whatsapp, setWhatsapp] = useState("");

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

  const updateUser = () => {
    axios
      .put(`${Host}api/users/${userObject.id}`, updatedUserPayload)
      .then((res) => {
        if (!res) return console.log("No response from server");
        if (res.data.error) return console.log(res.data);
        console.log(res.data);
        refreshPage(true);
      })
      .catch((err) => {
        console.log("Error catched: ", err);
      });
  };

  const handleInputChange = (event) => {
    const className = event.currentTarget.className;
    const id = event.currentTarget.id;
    const value = event.currentTarget.value;

    if (className === "pseudoo") setName(value);
    if (className === "password") setPassword(value);
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

  return (
    <div className="modifyProfileContainer">
      <Avatar chosenAvatar={setAvatar} defaultAvatar={avatar} />
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
          type="text"
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
      <div className="separatePopotes"></div>
      <div className="center">
        <img className="mail" src={images.mail} alt="mail" />
        <input
          id="mail"
          type="text"
          value={userObject.mail}
          onChange={handleInputChange}
        />
      </div>
      <div className="center">
        <img className="linkedin" src={images.linkedin} alt="linkedin" />
        <input
          id="linkedin"
          type="text"
          value={userObject.linkedin}
          onChange={handleInputChange}
        />
      </div>
      <div className="center">
        <img className="facebook" src={images.facebook} alt="facebook" />
        <input
          id="facebook"
          type="text"
          value={userObject.facebook}
          onChange={handleInputChange}
        />
      </div>
      <div className="center">
        <img className="snapchat" src={images.snapchat} alt="snapchat" />
        <input
          id="snapchat"
          type="text"
          value={userObject.snapchat}
          onChange={handleInputChange}
        />
      </div>
      <div className="center">
        <img className="instagram" src={images.instagram} alt="instagram" />
        <input
          id="instagram"
          type="text"
          value={userObject.instagram}
          onChange={handleInputChange}
        />
      </div>
      <div className="center">
        <img className="twitter" src={images.twitter} alt="twitter" />
        <input
          id="twitter"
          type="text"
          value={userObject.twitter}
          onChange={handleInputChange}
        />
      </div>
      <div className="center">
        <img className="tiktok" src={images.tiktok} alt="tiktok" />
        <input
          id="tiktok"
          type="text"
          value={userObject.tiktok}
          onChange={handleInputChange}
        />
      </div>
      <div className="center">
        <img className="whatsapp" src={images.whatsapp} alt="whatsapp" />
        <input
          id="whatsapp"
          type="text"
          value={userObject.whatsapp}
          onChange={handleInputChange}
        />
      </div>
      <div className="separatePopotes"></div>
      <button className="myprofileModifyButton" onClick={updateUser}>
        Enregistrer
      </button>
    </div>
  );
};
