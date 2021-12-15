import { useLocation, useNavigate } from "react-router-dom";
import { Avatar } from "../../components/Avatar";

export const Modifymyprofile = () => {
  const location = useLocation().pathname;
  const navigate = useNavigate();
  const validate = () => {
    navigate("/profil");
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  };

  return (
    <div className="myprofileBody">
      <div className="modify mypopoteInfos">
        <Avatar />
        <div className="mypopoteNames">
          <input type="text" />
          <input type="text" />
        </div>
      </div>
      <div className="level">Confirmé</div>
      <ul className="levelInfos">
        <li>
          <p>Recettes</p>
          <p>5</p>
        </li>
        <li>
          <p>Favoris</p>
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
          <input type="text" />
        </li>
        <li>
          <p>Email</p>
          <input type="text" />
        </li>
      </ul>
      <ul className="userInfos socialnetworks">
        <li>
          <p>Linkedin</p>
          <input type="text" />
        </li>
        <li>
          <p>Facebook</p>
          <input type="text" />
        </li>
        <li>
          <p>Snapchat</p>
          <input type="text" />
        </li>
        <li>
          <p>Instagram</p>
          <input type="text" />
        </li>
      </ul>
      <button className="myprofileModifyButton" onClick={validate}>
        Valider
      </button>
    </div>
  );
};
