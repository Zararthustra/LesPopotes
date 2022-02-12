import { Card } from "../../components/card";
import { SearchFilterPopote } from "../../components/searchFilterPopote";
import { Host } from "../../assets/utils/host";
import { useEffect, useState } from "react";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";

export const Bestof = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState();
  const [searchFilter, setSearchFilter] = useState("");

  // Load data when mounting
  useEffect(() => {
    getRecipes();
    return () => setRecipes();
  }, []);

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

  return (
    <main className="cardList">
      <SearchFilterPopote
        setFilter={setFilter}
        setSearchFilter={setSearchFilter}
      />
      {loading ? (
        <ClipLoader css={""} color={"#f5a76c"} loading={loading} size={100} />
      ) : filter ? (
        recipes.map((recipe, index) => {
          if (
            recipe.type.toLowerCase().includes(filter.toLowerCase()) &&
            recipe.name.toLowerCase().includes(searchFilter.toLowerCase())
          )
            return <Card key={index} recipe={recipe} />;
          return "";
        })
      ) : searchFilter ? (
        recipes.map((recipe, index) => {
          if (recipe.name.toLowerCase().includes(searchFilter.toLowerCase()))
            return <Card key={index} recipe={recipe} />;
          return "";
        })
      ) : (
        recipes.map((recipe, index) => {
          return <Card key={index} recipe={recipe} />;
        })
      )}
    </main>
  );
};
