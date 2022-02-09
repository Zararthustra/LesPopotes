import { Card } from "../../components/card";
import { SearchFilterPopote } from "../../components/searchFilterPopote";
import { Host } from "../../assets/utils/host";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";

export const Recettes = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);

  const getRecipes = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${Host}api/recipes`);
      if (res.data) setRecipes(res.data);
      setLoading(false);
    } catch (error) {
      console.log("An error occured while requesting recipes:\n", error);
      setLoading(false);
    }
  };

  // Load data when mounting
  useEffect(() => {
    getRecipes();
    return () => setRecipes();
  }, []);

  return (
    <main className="cardList">
      <SearchFilterPopote />
      {loading ? (
        <ClipLoader css={""} color={"#f5a76c"} loading={loading} size={100} />
      ) : (
        recipes.map((recipe, index) => {
          return <Card key={index} recipe={recipe} />;
        })
      )}
    </main>
  );
};
