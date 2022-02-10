import axios from "axios";
import { useEffect, useState } from "react";
import { Host } from "../../assets/utils/host";
import { Card } from "../../components/card";
import { SearchFilterPopote } from "../../components/searchFilterPopote";
import ClipLoader from "react-spinners/ClipLoader";

export const Mesrecettes = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState();

  // Load data when mounting
  useEffect(() => {
    getRecipes();
    return () => setRecipes();
  }, []);

  const getRecipes = async () => {
    const userID = localStorage.getItem("userid");
    setLoading(true);

    try {
      const res = await axios.get(`${Host}api/userrecipes/${userID}`);
      if (res.data) {
        setRecipes(res.data);
      }

      setLoading(false);
    } catch (error) {
      console.log("An error occured while requesting recipes:\n", error);
      setLoading(false);
    }
  };

  return (
    <main className="mapopotebody">
      <SearchFilterPopote setFilter={setFilter} />
      <div className="cardList">
        {loading ? (
          <ClipLoader css={""} color={"#f5a76c"} loading={loading} size={100} />
        ) : filter ? (
          recipes.map((recipe, index) => {
            if (recipe.type === filter)
              return <Card key={index} recipe={recipe} />;
            return "";
          })
        ) : (
          recipes.map((recipe, index) => {
            return <Card key={index} recipe={recipe} />;
          })
        )}
      </div>
    </main>
  );
};
