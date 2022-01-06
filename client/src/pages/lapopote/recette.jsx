import { useParams } from "react-router-dom";
import { RecipeInfos } from "../../components/recipeInfos";
import { RecipeIngredients } from "../../components/recipeIngredients";
import { Recipes } from "../../assets/utils/recipes";

export const Recette = () => {
  const { recette } = useParams();
  const recipe = Recipes.find(recipe => recipe.name === recette)

  return (
    <div className="recipePage">
      <div className="recipeContainer">
        <img className="cardImg" src={require(`../../assets/images/${recipe.image}.png`).default} alt="" />
        <div className="recipeTitle">{recette}</div>
        <div className="separatePopote"></div>
        <div className="doneBy">{recipe.author}</div>
        <RecipeInfos infos={recipe} />
        <div className="separatePopote"></div>
        <RecipeIngredients ingredients={recipe.ingredients} />
        <div className="separatePopote"></div>
        <div className="steps">
          {recipe.steps.map((step, index) => {
            return (
              <div key={index} className="step">
                <div className="stepTitle">Etape {index + 1}</div>
                <p>{step}</p>
              </div>
            );
          })}
        </div>
        <div className="separatePopote"></div>
        <div className="recipeComment">
          <h3>Commentaire de l'auteur</h3>
          <p>
            {"<< "}
            {recipe.comment}
            {" >>"}
          </p>
        </div>
      </div>
      <div>Commentaires:</div>
    </div>
  );
};
