import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { capitalize } from "../../assets/utils/capitalize";
import { Host } from "../../assets/utils/host";

export const Popotes = () => {
  const { popote } = useParams();
  const navigate = useNavigate();
  const [userObject, setUserObject] = useState({ name: "" });

  // Load data when mounting
  useEffect(() => {
    let isSubscribed = true;

    axios.get(`${Host}api/${popote}`).then((res) => {
      if (isSubscribed) setUserObject(res.data);
    });

    return () => (isSubscribed = false);
  }, [popote]);

  return (
    <div className="myprofileBody popoteProfile">
      <div className="mypopoteInfos">
        <img src={userObject.avatar} alt="avatar" className="avatar" />
        <div className="mypopoteNames">
          <div className="pseudo">{capitalize(userObject.name)}</div>
          <div className="type">{userObject.type}</div>
        </div>
      </div>
      <div className="level">debutant</div>
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

      <ul className="userInfos socialnetworks">
        <li>
          {userObject.linkedin && <a href={userObject.linkedin}>Linkedin</a>}
        </li>
        <li>
          {userObject.facebook && <a href={userObject.facebook}>Facebook</a>}
        </li>
        <li>
          {userObject.snapchat && <a href={userObject.snapchat}>Snapchat</a>}
        </li>
        <li>
          {userObject.instagram && <a href={userObject.instagram}>Instagram</a>}
        </li>
      </ul>
      <button className="myprofileModifyButton" onClick={() => navigate("/lespopotes")}>Retour</button>
    </div>
  );
};
