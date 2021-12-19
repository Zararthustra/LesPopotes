export const RecipeIngredients = () => {
  const ingredients = [
    { name: "Sucre", quantity: "150", unity: "g" },
    { name: "Lait", quantity: "20", unity: "cl" },
    { name: "Avocat", quantity: "4", unity: "" },
  ];
  return (
    <div className="recipeIngredients">
      <div className="ingredientsCols">
        <div>
          <h2 className="ingredientsTitles">Ingrédients</h2>
          {ingredients.map((ingredient) => (
            <div className="ingredientsCol">{ingredient.name}</div>
            ))}
        </div>
        <div>
            <h2 className="ingredientsTitles">Quantité</h2>
          {ingredients.map((ingredient) => (
            <div className="ingredientsCol">{ingredient.quantity}</div>
            ))}
        </div>
        <div>
            <h2 className="ingredientsTitles">Unité</h2>
          {ingredients.map((ingredient) => (
            <div className="ingredientsCol">{ingredient.unity}</div>
          ))}
        </div>
      </div>
    </div>
  );
};
