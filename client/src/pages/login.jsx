import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { Host } from "../assets/utils/host";
import { Avatar } from "../components/Avatar";

export const Login = () => {
  //___________________________________________________ Variables
  const navigate = useNavigate();
  const [creation, setCreation] = useState(false);

  const popoteTypes = [
    { value: "gourmand", label: "Gourmand" }, //sucré
    { value: "bon vivant", label: "Bon vivant" }, //mange tout
    { value: "cordon bleu", label: "Cordon bleu" }, //bon cuisinier
    { value: "carnivore", label: "Carnivore" }, //adore la viande
    { value: "cuisto du dimanche", label: "Cuisto du dimanche" }, //comme son nom l'indique
    { value: "grignotteur", label: "Grignotteur" }, //mange peu
    { value: "cultivateur", label: "Cultivateur" }, //cultive ses propres produits
    { value: "herbivore", label: "Herbivore" }, //la viande c'est pour les sauvages
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
  const [avatar, setAvatar] = useState(
    "https://avatars.dicebear.com/api/big-smile/randooom.svg?translateY=10"
  );
  const [linkedin, setLinkedin] = useState("");
  const [snapchat, setSnapchat] = useState("");
  const [facebook, setFacebook] = useState("");
  const [instagram, setInstagram] = useState("");

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
        avatar,
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
        <h1 className="connexion">Création</h1>
        <div className="loginField">
          <form className="logform">
            <div className="inputs">
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
                <Select
                  placeholder="Type de popote *"
                  className="inputType"
                  onChange={handleSelectChange}
                  options={popoteTypes}
                />
              </div>
              <div className="creationAvatar">
                <div>
                  <div>Mon Avatar:</div>
                  <div className="clickToChange">(cliquer pour changer)</div>
                </div>
                <Avatar chosenAvatar={setAvatar} />
              </div>
              <input
                maxLength="50"
                placeholder="Email"
                className="inputEmail"
                type="text"
                value={mail}
                onChange={handleInputChange}
              />
              <input
                maxLength="20"
                placeholder="Régime"
                className="inputDiet"
                type="text"
                value={diet}
                onChange={handleInputChange}
              />
              <input
                placeholder="Linkedin"
                className="inputLinkedin"
                type="text"
                value={linkedin}
                onChange={handleInputChange}
              />
              <input
                placeholder="Snapchat"
                className="inputSnapchat"
                type="text"
                value={snapchat}
                onChange={handleInputChange}
              />
              <input
                placeholder="Facebook"
                className="inputFacebook"
                type="text"
                value={facebook}
                onChange={handleInputChange}
              />
              <input
                placeholder="Instagram"
                className="inputInstagram"
                type="text"
                value={instagram}
                onChange={handleInputChange}
              />
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
        </div>
      </div>
    );
  else
    return (
      <div className="loginContainer">
        <h1 className="connexion">Connexion</h1>
        <div className="loginField">
          <form className="logform">
            <div className="inputs">
              <input
                maxLength="20"
                placeholder="Pseudo"
                className="inputName"
                type="text"
                value={userName}
                onChange={handleInputChange}
              ></input>
              <input
                maxLength="20"
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
