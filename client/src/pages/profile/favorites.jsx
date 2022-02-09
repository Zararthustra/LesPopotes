import { Card } from "../../components/card";
import { SearchFilterPopote } from "../../components/searchFilterPopote";
import { useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import axios from "axios";
import { Host } from "../../assets/utils/host";

export const Favorites = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);

  // Load data when mounting
  useEffect(() => {
    getRecipes();
    return () => setRecipes();
  }, []);

  const getRecipes = async () => {
    const userID = localStorage.getItem("userid");
    let tmpRecipes;
    setLoading(true);

    try {
      const res = await axios.get(`${Host}api/recipes`);
      if (res.data) {
        tmpRecipes = res.data;

        const resFavorites = await axios.get(
          `${Host}api/userfavorites/${userID}`
        );
        if (resFavorites.data) {
          const getOnlyFavs = tmpRecipes.filter((recipe) => 
          resFavorites.data.includes(recipe.id)
        )
        setRecipes(getOnlyFavs);
        }
      }

      setLoading(false);
    } catch (error) {
      console.log("An error occured while requesting recipes:\n", error);
      setLoading(false);
    }
  };

  return (
    <div className="mapopotebody">
      <SearchFilterPopote />
      <div className="cardList">
        {loading ? (
          <ClipLoader css={""} color={"#f5a76c"} loading={loading} size={100} />
        ) : (
          recipes?.map((recipe, index) => {
            return <Card key={index} recipe={recipe} />;
          })
        )}
      </div>
    </div>
  );
};
