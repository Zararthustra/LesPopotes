import { Card } from "../../components/card";
import { SearchFilterPopote } from "../../components/searchFilterPopote";
import { Recipes } from "../../assets/utils/recipes";

export const Mesrecettes = () => {

  return (
    <div className="mapopotebody">
      <SearchFilterPopote />
      <div className="cardList">
        {Recipes.map((recipe, index) => {
          return <Card key={index} recipe={recipe} />;
        })}
      </div>
    </div>
  );
};
