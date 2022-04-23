import axios from "axios";
import { useEffect, useState } from "react";
import { Host } from "../../assets/utils/host";
import { Card } from "../../components/card";
import { SearchFilterPopote } from "../../components/searchFilterPopote";
import ClipLoader from "react-spinners/ClipLoader";
import { Outlet, useLocation } from "react-router-dom";
import { RefreshSession } from "../../components/refreshSession";

export const Mesrecettes = () => {
  const location = useLocation().pathname;
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState();
  const [searchFilter, setSearchFilter] = useState("");
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [isFiltering, setIsFiltering] = useState(false);
  const userID = localStorage.getItem("userid");
  axios.defaults.headers.common["authorization"] = localStorage.getItem("accessToken");
  const [expiredSession, setExpiredSession] = useState(false);

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
        const res = await axios.get(`${Host}api/userrecipes/${userID}`).catch((err) => {
          console.log("Session expirée, veuillez vous reconnecter.");
          return setExpiredSession(true)
        });
        if (res && res.data) {
          setRecipes(res.data)
          setFilteredRecipes(filterFunc(res.data, filter))
        }
        setLoading(false);
      } catch (error) {
        console.log("An error occured while requesting myRecipes:\n", error);
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

  if (expiredSession) return (
    <main className="mapopotebody">
      <SearchFilterPopote
        setFilter={setFilter}
        searchFilter={searchFilter}
        setSearchFilter={setSearchFilter}
      />
      <RefreshSession />
    </main>
  )
  if (location !== "/profil/mesrecettes") return <Outlet />;
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
          recipes.map((recipe, index) => {
            return <Card key={index} recipe={recipe} />;
          })
        )}
      </div>
    </main>
  );
};
