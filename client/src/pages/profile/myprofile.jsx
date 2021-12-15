import { Avatar } from "../../components/Avatar";

export const Monprofil = () => {
  return (
    <div className="myprofileBody">
      <div className="mypopoteInfos">
        <Avatar />
        <div className="mypopoteNames">
          <div className="pseudo">Kikoo34</div>
          <div className="type">Carnassier</div>
        </div>
      </div>
      <div className="levelInfos">
        <div className="level">Confirmé</div>
        <ul>
          <li>5 Recettes</li>
          <li>18 Favoris</li>
          <li>4 Popotes</li>
          <li>12 Commentaires</li>
        </ul>
      </div>
      <div className="userInfos">
        <div>Mot de passe: *******</div>
        <div>Email: toto123@mail.com</div>
        <div>Linkedin: https://lienduprofil.com</div>
        <div>Facebook: https://lienduprofil.com</div>
        <div>Snapchat: https://lienduprofil.com</div>
        <div>Instagram: https://lienduprofil.com</div>
      </div>
      <div className="positionButton">
        <button className="myprofileModifyButton">Modifier</button>
      </div>
    </div>
  );
};
