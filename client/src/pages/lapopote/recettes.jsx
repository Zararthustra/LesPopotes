import { Card } from "../../components/card";
import { SearchFilterPopote } from "../../components/searchFilterPopote";
import { Recipes } from "../../assets/utils/recipes";

export const Recettes = () => {
  
  return (
    <div className="cardList">
      <SearchFilterPopote />
      {Recipes.map((recipe, index) => {
        return <Card key={index} recipe={recipe} />;
      })}
    </div>
  );
};
