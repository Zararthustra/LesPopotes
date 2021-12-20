import { useLocation, useNavigate } from "react-router-dom";
import { Avatar } from "../../components/Avatar";

export const Monprofil = () => {
  const location = useLocation().pathname;
  const navigate = useNavigate();

  const modify = () => {
    navigate("modifier");
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  };
  const logout = () => {
    localStorage.setItem("username", "");
    navigate("/lapopote")
  }

  return (
    <div className="myprofileBody">
      <div className="mypopoteInfos">
        <Avatar />
        <div className="mypopoteNames">
          <div className="pseudo">Kikoo34</div>
          <div className="type">Carnassier</div>
        </div>
      </div>
      <div className="level">Confirmé</div>
      <ul className="levelInfos">
        <li>
          <p>Recettes</p>
          <p>5</p>
        </li>
        <li>
          <p>Notes</p>
          <p>18</p>
        </li>
        <li>
          <p>Popotes</p>
          <p>4</p>
        </li>
        <li>
          <p>Commentaires</p>
          <p>12</p>
        </li>
      </ul>
      <ul className="userInfos">
        <li>
          <p>Mot de passe</p>
          <p>*******</p>
        </li>
        <li>
          <p>Email</p>
          <p>toto123@mail.com</p>
        </li>
      </ul>
      <ul className="userInfos socialnetworks">
        <li>
          <p>Linkedin</p>
          <p>https://lienduprofil.com</p>
        </li>
        <li>
          <p>Facebook</p>
          <p>https://lienduprofil.com</p>
        </li>
        <li>
          <p>Snapchat</p>
          <p>https://lienduprofil.com</p>
        </li>
        <li>
          <p>Instagram</p>
          <p>https://lienduprofil.com</p>
        </li>
      </ul>
      <button className="myprofileModifyButton" onClick={modify}>
        Modifier
      </button>
      <button className="myprofileModifyButton" onClick={logout}>
        Déconnexion
      </button>
    </div>
  );
};
