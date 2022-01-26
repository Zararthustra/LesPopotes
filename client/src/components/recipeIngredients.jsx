export const RecipeIngredients = ({ingredients}) => {
  
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
          <tr key={index}>
            <td>{ingredient.name}</td>
            <td>{ingredient.quantity}</td>
            <td>{ingredient.unity}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
