import { useNavigate } from "react-router-dom";
import { capitalize } from "../assets/utils/capitalize";
import { getLevel } from "../assets/utils/getLevel";

export const Popotesitem = ({ user }) => {
  const navigate = useNavigate();

  return (
    <div
      className="itemContainer"
      onClick={() => {
        navigate(`/lespopotes/${user.name}`);
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
      }}
    >
      <div className="left">
        <img src={user.avatar} alt="avatar" className="avatar" />
        <div className="names">
          <div className="pseudo">{capitalize(user.name)}</div>
          <div className="type">{user.type}</div>
        </div>
      </div>
      <div className="right">
        <div className="experience">
          <div className="popotelevel">
            {getLevel(user.recipes, user.notes, user.popotes, user.comments)}
          </div>
          <div className="createdRecipes">
            {user.recipes > 1
              ? user.recipes + " recettes"
              : user.recipes + " recette"}
          </div>
        </div>
        <div className="addButton" />
      </div>
    </div>
  );
};
