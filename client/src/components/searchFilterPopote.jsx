import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { icons } from "../assets/utils/importIcons";

export const SearchFilterPopote = ({
  setFilter,
  setSearchFilter,
  searchFilter,
}) => {
  const navigate = useNavigate();

  const [apero, setApero] = useState(false);
  const [entree, setEntree] = useState(false);
  const [plat, setPlat] = useState(false);
  const [dessert, setDessert] = useState(false);
  const [boisson, setBoisson] = useState(false);
  const [autre, setAutre] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    setFilter([
      apero && "apero",
      entree && "entree",
      plat && "plat",
      dessert && "dessert",
      boisson && "boisson",
      autre && "autre"
    ])
  }, [setFilter, apero, entree, plat, dessert, boisson, autre]);

  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchFilter(value);
  };
  const handleClearInput = () => {
    document.querySelector(".searchBar").value = "";
    setSearchFilter("");
  };

  // Copy/pasted func to avoid multiple API calls on typing (waits {x}ms before set input)
  function debounce(func, wait, immediate) {
    var timeout;
    return function () {
      var context = this,
        args = arguments;
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(function () {
        timeout = null;
        if (!immediate) {
          func.apply(context, args);
        }
      }, wait);
      if (callNow) func.apply(context, args);
    };
  }

  return (
    <div className="popoteSubdivision">
      <div className="searchPopote">
        <div className="searchIcon" />
        <input
          type="text"
          className="searchBar"
          onChange={debounce(handleSearch, 500)}
        />
        {searchFilter && (
          <div className="resetInput" onClick={handleClearInput} />
        )}
      </div>
      <div
        className="showPopoteFilters"
        onClick={() => setShowFilters(!showFilters)}
      >
        {showFilters ? "- Types" : "+ Types"}
      </div>
      {showFilters ? (
        <div className="filters">
          <label className="box">
            <input
              type="checkbox"
              onChange={() => setApero(!apero)}
            />
            <svg
              className={`check ${apero ? "check--active" : ""}`}
              aria-hidden="true"
              viewBox="0 0 13 10"
              fill="none"
            >
              <path
                d="M1 4.5L5 9L14 1"
                strokeWidth="2"
                stroke={apero ? "#fff" : "none"}
              />
            </svg>
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", color: "var(--dark-popote)", width: "4em" }}>
              <img className="recipeType" src={icons.apero} alt="Type apéro" title="Type apéro" />
              Apéritifs
            </div>
          </label>
          <label className="box">
            <input
              type="checkbox"
              onChange={() => setEntree(!entree)}
            />
            <svg
              className={`check ${entree ? "check--active" : ""}`}
              aria-hidden="true"
              viewBox="0 0 13 10"
              fill="none"
            >
              <path
                d="M1 4.5L5 9L14 1"
                strokeWidth="2"
                stroke={entree ? "#fff" : "none"}
              />
            </svg>
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", color: "var(--dark-popote)", width: "4em" }}>
              <img className="recipeType" src={icons.entree} alt="Type entrée" title="Type entrée" />
              Entrées
            </div>
          </label>
          <label className="box">
            <input
              type="checkbox"
              onChange={() => setPlat(!plat)}
            />
            <svg
              className={`check ${plat ? "check--active" : ""}`}
              aria-hidden="true"
              viewBox="0 0 13 10"
              fill="none"
            >
              <path
                d="M1 4.5L5 9L14 1"
                strokeWidth="2"
                stroke={plat ? "#fff" : "none"}
              />
            </svg>
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", color: "var(--dark-popote)", width: "4em" }}>
              <img className="recipeType" src={icons.plat} alt="Type plat" title="Type plat" />
              Plats
            </div>
          </label>
          <label className="box">
            <input
              type="checkbox"
              onChange={() => setDessert(!dessert)}
            />
            <svg
              className={`check ${dessert ? "check--active" : ""}`}
              aria-hidden="true"
              viewBox="0 0 13 10"
              fill="none"
            >
              <path
                d="M1 4.5L5 9L14 1"
                strokeWidth="2"
                stroke={dessert ? "#fff" : "none"}
              />
            </svg>
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", color: "var(--dark-popote)", width: "4em" }}>
              <img className="recipeType" src={icons.dessert} alt="Type dessert" title="Type dessert" />
              Desserts
            </div>
          </label>
          <label className="box">
            <input
              type="checkbox"
              onChange={() => setBoisson(!boisson)}
            />
            <svg
              className={`check ${boisson ? "check--active" : ""}`}
              aria-hidden="true"
              viewBox="0 0 13 10"
              fill="none"
            >
              <path
                d="M1 4.5L5 9L14 1"
                strokeWidth="2"
                stroke={boisson ? "#fff" : "none"}
              />
            </svg>
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", color: "var(--dark-popote)", width: "4em" }}>
              <img className="recipeType" src={icons.boisson} alt="Type boisson" title="Type boisson" />
              Boissons
            </div>
          </label>
          <label className="box">
            <input
              type="checkbox"
              onChange={() => setAutre(!autre)}
            />
            <svg
              className={`check ${autre ? "check--active" : ""}`}
              aria-hidden="true"
              viewBox="0 0 13 10"
              fill="none"
            >
              <path
                d="M1 4.5L5 9L14 1"
                strokeWidth="2"
                stroke={autre ? "#fff" : "none"}
              />
            </svg>
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", color: "var(--dark-popote)", width: "4em" }}>
              <img className="recipeType" src={icons.autre} alt="Type autre" title="Type autre" />
              Autres
            </div>
          </label>
        </div>
      ) : (
        ""
      )}
      <button
        className="popoteButton"
        onClick={() => navigate("/lapopote/creation")}
      >
        Proposer une recette
      </button>
      <div className="separatePopote"></div>
    </div>
  );
};
