import { Avatar } from "./Avatar";

export const Popotesitem = () => {
  return (
    <div className="itemContainer">
      <div className="left">
        <Avatar />
        <div className="names">
          <div className="pseudo">Yoyo L'asticot</div>
          <div className="type">Cuisto du dimanche</div>
        </div>
      </div>
      <div className="right">
        <div className="experience">
          <div className="level">Amateur</div>
          <div className="createdRecipes">12 recettes</div>
        </div>
        <div className="addButton" />
      </div>
    </div>
  );
};
