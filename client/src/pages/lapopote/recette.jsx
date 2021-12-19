import { useParams } from "react-router-dom";
import { images } from "../../assets/images/importImages";
import { RecipeInfos } from "../../components/recipeInfos";
import { RecipeIngredients } from "../../components/recipeIngredients";

export const Recette = () => {
  const { recette } = useParams();

  return (
    <div className="recipePage">
      <div className="recipeContainer">
        <img className="cardImg" src={images.image1} alt="" />
        <div className="recipeTitle">{recette}</div>
        <div className="doneBy">Yoyo L'Asticot</div>
        <div className="separatePopote"></div>
        <RecipeInfos />
        <div className="separatePopote"></div>
        <RecipeIngredients />
        <div className="separatePopote"></div>
        <div className="steps">
          <div className="stepTitle">Etape 1</div>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit
            cumque quas alias numquam, cupiditate voluptate, doloribus eum,
            voluptatum quo doloremque illo! Dicta aliquid voluptates voluptas
            repellat est fugiat. Ex, corporis.
          </p>
          <div className="stepTitle">Etape 2</div>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit
            cumque quas alias numquam, cupiditate voluptate, doloribus eum,
            voluptatum quo doloremque illo! Dicta aliquid voluptates voluptas
            repellat est fugiat. Ex, corporis.
          </p>
        </div>
        <div className="separatePopote"></div>
        <div className="recipeComment">
          <h3>Commentaires de l'auteur</h3>
          <p>
            {"<< "}Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Quisquam quos at harum neque magni accusantium dolores molestiae
            voluptatibus.{" >>"}
          </p>
        </div>
      </div>
      <div>Commentaires:</div>
    </div>
  );
};
