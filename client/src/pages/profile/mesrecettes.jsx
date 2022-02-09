import axios from "axios";
import { useEffect, useState } from "react";
import { Host } from "../../assets/utils/host";
import { Card } from "../../components/card";
import { SearchFilterPopote } from "../../components/searchFilterPopote";
import ClipLoader from "react-spinners/ClipLoader";

export const Mesrecettes = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);

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
    <div className="mapopotebody">
      <SearchFilterPopote />
      <div className="cardList">
        {loading ? (
          <ClipLoader css={""} color={"#f5a76c"} loading={loading} size={100} />
        ) : (
          recipes.map((recipe, index) => {
            return <Card key={index} recipe={recipe} />;
          })
        )}
      </div>
    </div>
  );
};
