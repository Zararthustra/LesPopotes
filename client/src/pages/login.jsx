import axios from "axios";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Select from "react-select";
import { Host } from "../assets/utils/host";
import { Avatar } from "../components/Avatar";

export const Login = () => {
  //___________________________________________________ Variables
  const navigate = useNavigate();
  const location = useLocation().pathname;
  const [creation, setCreation] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

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

  //___________________________________________________ Input variables

  const userNameLocalStorage = localStorage.getItem("username");
  const [userName, setUserName] = useState(
    userNameLocalStorage !== null ? userNameLocalStorage : ""
  );
  const passwordLocalStorage = localStorage.getItem("password");
  const [password, setPassword] = useState(
    passwordLocalStorage !== null ? passwordLocalStorage : ""
  );
  const [type, setType] = useState("");
  const [mail, setMail] = useState("");
  const [diet, setDiet] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [snapchat, setSnapchat] = useState("");
  const [facebook, setFacebook] = useState("");
  const [instagram, setInstagram] = useState("");
  const [avatar, setAvatar] = useState("");

  //___________________________________________________ Functions

  const addUser = (event) => {
    event.preventDefault();
    // Check empty mandatory fields
    if (userName === "") {
      document.getElementsByClassName("inputName")[0].placeholder =
        "Entrer un Nom";
      return;
    }
    if (password === "") {
      document.getElementsByClassName("inputPassword")[0].placeholder =
        "Entrer un mdp";
      return;
    }
    if (type === "") {
      return;
    }

    //Check if user already exists
    axios
      .post(`${Host}api/user`, {
        name: userName,
        password,
        type,
        // Get default random avatar (calculated in avatar component) if user did not clicked
        avatar: avatar
          ? avatar
          : document.querySelector(".avatar")?.getAttribute("src"),
        mail,
        diet,
        snapchat,
        facebook,
        instagram,
        linkedin,
      })
      .then((response) => {
        if (response.data === "User already exist") {
          document.getElementsByClassName("inputName")[0].placeholder =
            "Existe déjà !";
          document.getElementsByClassName("inputPassword")[0].placeholder = "";
        } else if (response.data.name) {
          localStorage.setItem("username", response.data.name);
          localStorage.setItem("password", response.data.password);
          localStorage.setItem("userid", response.data.id);
          //localStorage.setItem("token", response.data.accessToken);
          navigate("/lapopote");
        }
      });
    setUserName("");
    setPassword("");
    setMail("");
    setDiet("");
    setLinkedin("");
    setSnapchat("");
    setFacebook("");
    setInstagram("");
  };

  async function logUser(event) {
    localStorage.setItem("username", userName);
    localStorage.setItem("password", password);
    //localStorage.setItem("token", response.data.accessToken);
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    //}
  }

  const handleInputChange = (event) => {
    const className = event.currentTarget.className;
    const value = event.currentTarget.value;

    if (className === "inputName") setUserName(value);
    if (className === "inputPassword") setPassword(value);
    if (className === "inputEmail") setMail(value);
    if (className === "inputDiet") setDiet(value);
    if (className === "inputLinkedin") setLinkedin(value);
    if (className === "inputSnapchat") setSnapchat(value);
    if (className === "inputFacebook") setFacebook(value);
    if (className === "inputInstagram") setInstagram(value);
  };

  const handleSelectChange = (event) => {
    setType(event.label);
  };

  const toggleCreation = (e) => {
    e.preventDefault();
    setCreation(!creation);
  };

  //___________________________________________________ Render

  if (creation)
    return (
      <div className="loginContainer">
        {location !== "/lapopote/creation" && (
          <h1 className="connexion">Création</h1>
        )}
        <div className="loginField">
          <form className="logform">
            <div className="inputs">
            <div className="creationAvatar">
                <div>
                  <div>Mon Avatar:</div>
                  <div className="clickToChange">(cliquer pour changer)</div>
                </div>
                <Avatar chosenAvatar={setAvatar} />
              </div>
              <div className="mandatory">
                <input
                  maxLength="12"
                  placeholder="Pseudo *"
                  className="inputName"
                  type="text"
                  value={userName}
                  onChange={handleInputChange}
                />
                <input
                  maxLength="15"
                  placeholder="Mot de passe *"
                  className="inputPassword"
                  type="password"
                  value={password}
                  onChange={handleInputChange}
                />
                <div className="selectModifyTypes">
                  <Select
                    isSearchable={false}
                    styles={selectStyle}
                    placeholder="Type de popote *"
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
                    <div className="detailDescription">
                      Encore une petite lichette...
                    </div>
                    <div className="detailTitle">Bon vivant</div>
                    <div className="detailDescription">
                      Le gras, c'est la vie
                    </div>
                    <div className="detailTitle">Cordon bleu</div>
                    <div className="detailDescription">
                      C'est pas de la cuisine, c'est de la magie
                    </div>
                    <div className="detailTitle">Carnivore</div>
                    <div className="detailDescription">Le viandard</div>
                    <div className="detailTitle">Cuisto du dimanche</div>
                    <div className="detailDescription">
                      Comme son nom l'indique
                    </div>
                    <div className="detailTitle">Grignotteur</div>
                    <div className="detailDescription">
                      Mange peu mais suffisamment
                    </div>
                    <div className="detailTitle">Cultivateur</div>
                    <div className="detailDescription">
                      Cultive ses propres produits
                    </div>
                    <div className="detailTitle">Herbivore</div>
                    <div className="detailDescription">
                      La viande c'est pour les sauvages
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>
              
            </div>
            <div className="loginDiv">
              <button onClick={addUser} className="login">
                Confirmer
              </button>
              <button onClick={toggleCreation} className="register">
                Retour
              </button>
            </div>
          </form>
            <div>* champs obligatoires</div>
        </div>
      </div>
    );
  return (
    <div className="loginContainer">
      {location !== "/lapopote/creation" && (
        <h1 className="connexion">Connexion</h1>
      )}
      <div className="loginField">
        <form className="logform">
          <div className="inputs">
            <input
              maxLength="12"
              placeholder="Pseudo"
              className="inputName"
              type="text"
              value={userName}
              onChange={handleInputChange}
            ></input>
            <input
              maxLength="15"
              placeholder="Mot de passe"
              className="inputPassword"
              type="password"
              value={password}
              onChange={handleInputChange}
            ></input>
          </div>
          <div className="loginDiv">
            <button onClick={logUser} className="login">
              Connecter
            </button>
            <button onClick={toggleCreation} className="register">
              Créer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
