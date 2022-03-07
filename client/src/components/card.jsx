import { useLocation, useNavigate } from "react-router-dom";
import { capitalize } from "../assets/utils/capitalize";
import { icons } from "../assets/utils/importIcons";

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

  const diffIcon =
    recipe.difficulty === "3"
      ? icons.diff3
      : recipe.difficulty === "2"
      ? icons.diff2
      : icons.diff1;

const recipeTypeIcon = () => {
  if (recipe.type === "apero") return icons.apero
  if (recipe.type === "entree") return icons.entree
  if (recipe.type === "plat") return icons.plat
  if (recipe.type === "dessert") return icons.dessert
  if (recipe.type === "boisson") return icons.boisson
  return icons.autre
}

  return (
    <div
      onClick={() => {
        navigate(`${location}/${recipe.id}`);
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
      }}
      className="card"
    >
      <h3 className="cardTitle" title="Titre de la recette">{recipe.name && capitalize(recipe.name)}</h3>
      <div className="separateLine"></div>
      <div className="cardInfos">
        <h4 className="cardsDoneBy" title={"Recette proposée par " + recipe.author}>
          {recipe.author && capitalize(recipe.author)}
        </h4>
        <ul className="cardIcons">
        <li className="cardInfo">
            <img
              className="timeImg"
              src={icons.time}
              alt="Temps total de préparation"
              title="Temps total de préparation"
            />
            {recipe.prepTime + recipe.bakeTime} min
          </li>
          <li className="cardInfo">
            <img className="difficultyImg" src={diffIcon} alt="Difficulté" title="Difficulté" />
            {diff}
          </li>
          
          <li className="cardInfo">
            <img className="likeImg" src={noteIcon()} alt="Moyenne des notes" title="Moyenne des notes" />
            {recipe.notes} {recipe.notes > 1 ? "notes" : "note"}
          </li>
          <li className="cardInfo">
            <img className="timeImg" src={icons.comments} alt="Commentaires" title="Commentaires" />
            {recipe.comments} avis
          </li>
        </ul>
      </div>
      <div className="separateLine"></div>
      <div className="typeIcons">
        <img className="recipeType" src={recipeTypeIcon()} alt={"Type " + recipe.type} title={"Type " + recipe.type} />
        <div className="bakeType" title={"Cuisson " + recipe.bakeType}>{recipe.bakeType && capitalize(recipe.bakeType)}</div>
      </div>
    </div>
  );
};
