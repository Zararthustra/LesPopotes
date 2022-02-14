export const RecipeIngredientsModification = ({ sharedVars }) => {
  //___________________________________________________ Variables

  const setIngredients = sharedVars.setIngredients;
  const ingredients = sharedVars.ingredients;
  //___________________________________________________ Functions

  const removeIngredient = (index) => {
    let tmpIngredients = [...ingredients]
    tmpIngredients.splice(index, 1)
    setIngredients(tmpIngredients)
  };

  //___________________________________________________ Render

  return (
    <table className="ingredientsTable">
      <thead>
        <tr>
          <th className="ingredientsTH">Ingrédient</th>
          <th className="ingredientsTH">Quantité</th>
          <th className="ingredientsTH">Unité</th>
        </tr>
      </thead>
      <tbody>
        {ingredients.map((ingredient, index) => (
          <tr id={index} key={index}>
            <td>{ingredient.name}</td>
            <td>{ingredient.quantity === 0 ? "" : ingredient.quantity}</td>
            <td>{ingredient.unity}</td>
            <td className="removeButtonIngredient" onClick={() => removeIngredient(index)} />
          </tr>
        ))}
      </tbody>
    </table>
  );
};
