import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { capitalize } from "../../assets/utils/capitalize";
import { getLevel } from "../../assets/utils/getLevel";
import { Host } from "../../assets/utils/host";

export const Monprofil = () => {
  const navigate = useNavigate();
  const userName = localStorage.getItem("username");
  const [userObject, setUserObject] = useState({ name: "" });

  const modify = () => {
    navigate("modifier");
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  };

  const logout = (event) => {
    localStorage.clear();
    navigate("/lapopote");
  };

  // Load data when mounting
  useEffect(() => {
    let isSubscribed = true;

    axios.get(`${Host}api/${userName}`).then((res) => {
      if (isSubscribed) setUserObject(res.data);
    });

    return () => (isSubscribed = false);
  }, [userName]);

  return (
    <div className="myprofileBody">
      <div className="mypopoteInfos">
        <img src={userObject.avatar} alt="avatar" className="avatar" />
        <div className="mypopoteNames">
          <div className="pseudo">{capitalize(userObject.name)}</div>
          <div className="type">{userObject.type}</div>
        </div>
      </div>
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
      <div className="separatePopotes"></div>

      <ul className="userInfos">
        <li>
          <p>Mot de passe</p>
          <p>{userObject.password}</p>
        </li>
        <li>
          <p>Email</p>
          <p>{userObject.mail}</p>
        </li>
      </ul>
      <ul className="userInfos socialnetworks">
        <li>
          <p>Linkedin</p>
          <p>{userObject.linkedin}</p>
        </li>
        <li>
          <p>Facebook</p>
          <p>{userObject.facebook}</p>
        </li>
        <li>
          <p>Snapchat</p>
          <p>{userObject.snapchat}</p>
        </li>
        <li>
          <p>Instagram</p>
          <p>{userObject.instagram}</p>
        </li>
      </ul>
      <button className="myprofileModifyButton" onClick={modify}>
        Modifier
      </button>
      <button className="disconnectButton" onClick={logout}>
        Déconnexion
      </button>
    </div>
  );
};
