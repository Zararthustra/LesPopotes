import { Card } from "../../components/card";
import { Recipes } from "../../components/recipes";

export const Bestof = () => {
  return (
    <div className="cardList">
      {Recipes.map((recipe, index) => {
        return <Card key={index} recipe={recipe} />;
      })}
    </div>
  );
};