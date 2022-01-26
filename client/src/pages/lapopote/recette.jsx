import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { capitalize } from "../../assets/utils/capitalize";
import { Host } from "../../assets/utils/host";
import { Recipes } from "../../assets/utils/recipes";
import { RecipeInfos } from "../../components/recipeInfos";
import { RecipeIngredients } from "../../components/recipeIngredients";

export const Recette = () => {
  const { recetteID } = useParams();
  const [recipe, setRecipe] = useState({});

  // Load data when mounting
  useEffect(() => {
    let isSubscribed = true;

    axios.get(`${Host}api/recipes/${recetteID}`).then((res) => {
      if (isSubscribed) setRecipe(res.data);
    });

    return () => (isSubscribed = false);
  }, [recetteID]);

  return (
    <main className="recipePage">
      <div className="recipeContainer">
        <img
          className="cardImg"
          src={require(`../../assets/images/risotto.png`).default}
          alt=""
        />
        <div className="recipeTitle">
          {recipe.name && capitalize(recipe.name)}
        </div>
        <div className="separatePopote"></div>
        <div className="doneBy">
          {recipe.author && capitalize(recipe.author)}
        </div>
        <RecipeInfos infos={recipe} />
        <div className="separatePopote"></div>
        <RecipeIngredients ingredients={Recipes[0].ingredients} />
        <div className="separatePopote"></div>
        <ul className="steps">
          {Recipes[0].steps.map((step, index) => {
            return (
              <li key={index} className="step">
                <div className="stepTitle">Etape {index + 1}</div>
                <p>{step}</p>
              </li>
            );
          })}
        </ul>
        <div className="separatePopote"></div>
        <div className="recipeComment">
          <h3>Commentaire de l'auteur</h3>
          <p>
            {"<< "}
            {Recipes[0].comment}
            {" >>"}
          </p>
        </div>
      </div>
      <div>Commentaires:</div>
    </main>
  );
};
