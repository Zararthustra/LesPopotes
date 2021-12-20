export const RecipeIngredients = ({ingredients}) => {
  
  return (
    <div className="recipeIngredients">
      <div className="ingredientsCols">
        <div>
          <h2 className="ingredientsTitles">Ingrédients</h2>
          {ingredients.map((ingredient, index) => (
            <div key={index} className="ingredientsCol">
              {ingredient.name}
            </div>
          ))}
        </div>
        <div>
          <h2 className="ingredientsTitles">Quantité</h2>
          {ingredients.map((ingredient, index) => (
            <div key={index} className="ingredientsCol">
              {ingredient.quantity}
            </div>
          ))}
        </div>
        <div>
          <h2 className="ingredientsTitles">Unité</h2>
          {ingredients.map((ingredient, index) => (
            <div key={index} className="ingredientsCol">
              {ingredient.unity}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
