import { Card } from "../../components/card";
import { Host } from "../../assets/utils/host";
import { useEffect, useState } from "react";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";
import { Outlet, useLocation } from "react-router-dom";

export const Lastpubs = () => {
  const location = useLocation().pathname;
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);

  // Load data when mounting
  useEffect(() => {
    setLoading(true);
    getRecipes();
    return () => setRecipes();
  }, []);

  const getRecipes = async () => {
    try {
      const res = await axios.get(`${Host}api/recipes/pagination/0`, {
        params: { limit: 10 },
      });
      if (res.data) {
        setRecipes(res.data.rows);
        setLoading(false);
      }
    } catch (error) {
      console.log(
        "An error occured while requesting recipes pagination:\n",
        error
      );
      setLoading(false);
    }
  };

  if (location !== "/accueil/nouveautes") return <Outlet />;
  return (
    <>
      <main className="cardList">
        {loading ? (
          <ClipLoader css={""} color={"#f5a76c"} loading={loading} size={100} />
        ) : (
          recipes.map((recipe, index) => {
            return <Card key={index} recipe={recipe} />;
          })
        )}
      </main>
    </>
  );
};
