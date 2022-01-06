import { useNavigate } from "react-router-dom";
import { icons } from "../assets/utils/importIcons";

export const Card = ({ recipe }) => {
  const navigate = useNavigate();
  const image = require(`../assets/images/${recipe.image}.png`).default;
  return (
    <div
      onClick={() => {
        navigate(`/lapopote/${recipe.name}`);
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
      }}
      className="card"
    >
      <img className="cardImg" src={image} alt={recipe.name} />
      <div className="cardInfos">
        <h3 className="cardTitle">{recipe.name}</h3>
        <div className="separateLine"></div>
        <ul className="cardIcons">
          <li className="cardInfo">
            <img className="difficultyImg" src={icons.diff1} alt="Difficulté" />
            {recipe.diff}
          </li>
          <li className="cardInfo">
            <img className="likeImg" src={icons.like45} alt="Moyenne des avis" />
            {recipe.nbNote} avis
          </li>
          <li className="cardInfo">
            <img className="timeImg" src={icons.time} alt="Temps total de préparation" />
            {recipe.cooking.prep + recipe.cooking.bake} min
          </li>
        </ul>
      </div>
    </div>
  );
};
