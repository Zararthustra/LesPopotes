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
  const [filter, setFilter] = useState();
  const [offset, setOffset] = useState(0);
  const limit = 10;
  const [totalItems, setTotalItems] = useState();
  const [searchFilter, setSearchFilter] = useState("");

  // Load data when mounting
  useEffect(() => {
    setLoading(true);
    const getRecipes = async () => {
      try {
        const res = await axios.get(`${Host}api/recipes`);
        if (res.data) setRecipes(res.data);
        setLoading(false);
      } catch (error) {
        console.log("An error occured while requesting recipes:\n", error);
        setLoading(false);
      }
    };
    const getRecipesPaginated = async () => {
      try {
        const res = await axios.get(`${Host}api/recipes/pagination/${offset}`, {
          params: { limit, orderByName: true },
        });
        if (res.data) {
          setTotalItems(res.data.count);
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

    if (searchFilter || filter) getRecipes();
    else getRecipesPaginated();

    return () => setRecipes();
  }, [offset, filter, searchFilter]);

  return (
    <main className="laPopotePage">
      <SearchFilterPopote
        setFilter={setFilter}
        searchFilter={searchFilter}
        setSearchFilter={setSearchFilter}
      />
      <div className="prevNextButtons" />
      <div className="cardList">
        {loading ? (
          <ClipLoader css={""} color={"#f5a76c"} loading={loading} size={100} />
        ) : filter ? (
          recipes.map((recipe, index) => {
            if (
              recipe.type.includes(filter) &&
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
      </div>
      <div className="prevNextButtons">
        {!filter && !searchFilter && offset - limit >= 0 ? (
          <div
            className="prevButtonPopote"
            onClick={() => setOffset(offset - limit)}
          >
            Précédents
          </div>
        ) : (
          <div style={{ width: "4em", padding: "0 1em 0" }}></div>
        )}
        {!filter && !searchFilter &&
          <div>
            Page {offset / limit + 1}/{parseInt(totalItems / limit) + 1}
          </div>}
        {!filter && !searchFilter && offset + limit < totalItems ? (
          <div
            className="nextButtonPopote"
            onClick={() => setOffset(offset + limit)}
          >
            Suivants
          </div>
        ) : (
          <div style={{ width: "4em", padding: "0 1em 0" }}></div>
        )}
      </div>
    </main>
  );
};
