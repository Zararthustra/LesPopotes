import { capitalize } from "../assets/utils/capitalize";

export const Popotesitem = ({ user }) => {
  return (
    <div className="itemContainer">
      <div className="left">
      <img src={user.avatar} alt="avatar" className="avatar" />
        <div className="names">
          <div className="pseudo">{capitalize(user.name)}</div>
          <div className="type">{user.type}</div>
        </div>
      </div>
      <div className="right">
        <div className="experience">
          <div className="popotelevel">Amateur</div>
          <div className="createdRecipes">{user.recipes} recettes</div>
        </div>
        <div className="addButton" />
      </div>
    </div>
  );
};
