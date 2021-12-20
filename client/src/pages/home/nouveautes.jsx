import { Card } from "../../components/card";
import { Recipes } from "../../components/recipes";

export const Lastpubs = () => {
  return (
    <div className="cardList">
      {Recipes.map((recipe, index) => {
        return <Card key={index} recipe={recipe} />;
      })}
    </div>
  );
};
