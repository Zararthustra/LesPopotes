import { useLocation, useNavigate } from "react-router-dom";
import { capitalize } from "../assets/utils/capitalize";
import { icons } from "../assets/utils/importIcons";
import { images } from "../assets/utils/importImages";

export const Card = ({ recipe }) => {
  const location = useLocation().pathname;
  const navigate = useNavigate();

  const noteIcon = () => {
    if (0 < recipe.average && recipe.average <= 0.5) return icons.like05;
    if (0.5 < recipe.average && recipe.average <= 1) return icons.like1;
    if (1 < recipe.average && recipe.average <= 1.5) return icons.like15;
    if (1.5 < recipe.average && recipe.average <= 2) return icons.like2;
    if (2 < recipe.average && recipe.average <= 2.5) return icons.like25;
    if (2.5 < recipe.average && recipe.average <= 3) return icons.like3;
    if (3 < recipe.average && recipe.average <= 3.5) return icons.like35;
    if (3.5 < recipe.average && recipe.average <= 4) return icons.like4;
    if (4 < recipe.average && recipe.average <= 4.5) return icons.like45;
    if (recipe.average > 4.5) return icons.like5;
    return icons.like0;
  };

  const diff =
    recipe.difficulty === "3"
      ? "Difficile"
      : recipe.difficulty === "2"
      ? "Moyen"
      : "Facile";

  const image = () => {
    try {
      return recipe.image === "no image yet" || !recipe.image
        ? images.default
        : require(`../Images/${recipe.image?.split("/")[4]}`).default; //linux
        //: require(`../Images/${recipe.image?.split("\\")[4]}`).default; //windows
    } catch (error) {
      console.log(error);
      return images.default;
    }
  };

  const diffIcon =
    recipe.difficulty === "3"
      ? icons.diff3
      : recipe.difficulty === "2"
      ? icons.diff2
      : icons.diff1;

  return (
    <div
      onClick={() => {
        navigate(`${location}/${recipe.id}`);
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
      }}
      className="card"
    >
      <img className="cardImg" src={image()} alt={recipe.name} />
      <div className="cardInfos">
        <h3 className="cardTitle">{recipe.name && capitalize(recipe.name)}</h3>
        <div className="separateLine"></div>
        <h4 className="cardsDoneBy">
          {recipe.author && capitalize(recipe.author)}
        </h4>
        <ul className="cardIcons">
          <li className="cardInfo">
            <img className="difficultyImg" src={diffIcon} alt="Difficulté" />
            {diff}
          </li>
          <li className="cardInfo">
            <img className="likeImg" src={noteIcon()} alt="Moyenne des avis" />
            {recipe.notes} avis
          </li>
          <li className="cardInfo">
            <img
              className="timeImg"
              src={icons.time}
              alt="Temps total de préparation"
            />
            {recipe.prepTime + recipe.bakeTime} min
          </li>
        </ul>
      </div>
    </div>
  );
};
