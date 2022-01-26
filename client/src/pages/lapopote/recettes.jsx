import { Card } from "../../components/card";
import { SearchFilterPopote } from "../../components/searchFilterPopote";
import { Host } from "../../assets/utils/host";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

export const Recettes = () => {
  const [recipes, setRecipes] = useState([]);

  // Load data when mounting
  useEffect( () => {
    let isSubscribed = true;
    axios.get(`${Host}api/recipes`).then((res) => {
      if (isSubscribed) setRecipes(res.data);
    });
    return () => (isSubscribed = false);
  }, []);

  return (
    <div className="cardList">
      <SearchFilterPopote />
      {recipes.map((recipe, index) => {
        return <Card key={index} recipe={recipe} />;
      })}
    </div>
  );
};
