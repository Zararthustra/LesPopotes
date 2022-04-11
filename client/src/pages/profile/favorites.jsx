import { Card } from "../../components/card";
import { SearchFilterPopote } from "../../components/searchFilterPopote";
import { useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import axios from "axios";
import { Host } from "../../assets/utils/host";
import { Outlet, useLocation } from "react-router-dom";

export const Favorites = () => {
  const location = useLocation().pathname;
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState();
  const [searchFilter, setSearchFilter] = useState("");
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [isFiltering, setIsFiltering] = useState(false);
  const userID = localStorage.getItem("userid");

  // Load data when mounting
  useEffect(() => {
    setLoading(true);
    const filterFunc = (arrayRecipes, arrayFilters) => {
      return arrayRecipes.filter(recipe => {
        let filterr
        for (let index in arrayFilters) {
          if (recipe.type.includes(arrayFilters[index])) filterr = arrayFilters[index];
        }
        return recipe.type.includes(filterr)
      })
    }
    const getRecipes = async () => {
      try {
        const res = await axios.get(`${Host}api/recipes`);
        if (res.data) {
          let tmpRecipes = res.data;

          const resFavorites = await axios.get(
            `${Host}api/userfavorites/${userID}`
          );
          if (resFavorites.data) {
            const getOnlyFavs = tmpRecipes.filter((recipe) =>
              resFavorites.data.includes(recipe.id)
            );
            setRecipes(getOnlyFavs);
            setFilteredRecipes(filterFunc(getOnlyFavs, filter))
          }
        }

        setLoading(false);
      } catch (error) {
        console.log("An error occured while requesting favorite Recipes:\n", error);
        setLoading(false);
      }
    };
    const isFilteringFunc = (filterArray) => {
      let filterState = false
      for (let index in filterArray) {
        if (typeof filterArray[index] === 'string') filterState = true
      }
      setIsFiltering(filterState)
      return filterState
    }

    isFilteringFunc(filter)
    getRecipes();
    return () => setRecipes();
  }, [userID, filter]);

  if (location !== "/profil/favorites") return <Outlet />;

  return (
    <main className="mapopotebody">
      <SearchFilterPopote
        setFilter={setFilter}
        searchFilter={searchFilter}
        setSearchFilter={setSearchFilter}
      />
      <div className="cardList">
        {loading ? (
          <ClipLoader css={""} color={"#f5a76c"} loading={loading} size={100} />
        ) : isFiltering ? (
          filteredRecipes.map((recipe, index) => <Card key={index} recipe={recipe} />)
        ) : searchFilter ? (
          recipes.map((recipe, index) => {
            if (recipe.name.toLowerCase().includes(searchFilter.toLowerCase()))
              return <Card key={index} recipe={recipe} />;
            return "";
          })
        ) : (
          recipes?.map((recipe, index) => {
            return <Card key={index} recipe={recipe} />;
          })
        )}
      </div>
    </main>
  );
};
