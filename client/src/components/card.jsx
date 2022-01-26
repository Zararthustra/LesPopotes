import { useNavigate } from "react-router-dom";
import { capitalize } from "../assets/utils/capitalize";
import { Host } from "../assets/utils/host";
import { icons } from "../assets/utils/importIcons";

export const Card = ({ recipe }) => {
  const navigate = useNavigate();
  console.log(recipe);
  return (
    <div
      onClick={() => {
        navigate(`/lapopote/${recipe.id}`);
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
      }}
      className="card"
    >
      <img className="cardImg" src={`http://localhost:3000/Images\\1643113739091.png`} alt={recipe.name} />
      <div className="cardInfos">
        <h3 className="cardTitle">{recipe.name && capitalize(recipe.name)}</h3>
        <div className="separateLine"></div>
        <ul className="cardIcons">
          <li className="cardInfo">
            <img className="difficultyImg" src={icons.diff1} alt="Difficulté" />
            {recipe.difficulty && capitalize(recipe.difficulty)}
          </li>
          <li className="cardInfo">
            <img className="likeImg" src={icons.like45} alt="Moyenne des avis" />
            {recipe.notes} avis
          </li>
          <li className="cardInfo">
            <img className="timeImg" src={icons.time} alt="Temps total de préparation" />
            {recipe.prepTime + recipe.bakeTime} min
          </li>
        </ul>
      </div>
    </div>
  );
};
