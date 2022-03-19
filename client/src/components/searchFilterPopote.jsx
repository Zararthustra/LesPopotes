import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

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

  const allFiltersNotChecked =
    !apero && !entree && !plat && !dessert && !boisson && !autre;
  const onlyAperoChecked = !entree && !plat && !dessert && !boisson && !autre;
  const onlyEntreeChecked = !apero && !plat && !dessert && !boisson && !autre;
  const onlyPlatChecked = !apero && !entree && !dessert && !boisson && !autre;
  const onlyDessertChecked = !apero && !entree && !plat && !boisson && !autre;
  const onlyBoissonChecked = !apero && !entree && !plat && !dessert && !autre;
  const onlyAutreChecked = !apero && !entree && !plat && !dessert && !boisson;

  useEffect(() => {
    if (allFiltersNotChecked) setFilter();
    if (apero) setFilter("apero");
    if (entree) setFilter("entree");
    if (plat) setFilter("plat");
    if (dessert) setFilter("dessert");
    if (boisson) setFilter("boisson");
    if (autre) setFilter("autre");
  });

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
              onChange={() => onlyAperoChecked && setApero(!apero)}
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
            Apéritifs
          </label>
          <label className="box">
            <input
              type="checkbox"
              onChange={() => onlyEntreeChecked && setEntree(!entree)}
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
            Entrées
          </label>
          <label className="box">
            <input
              type="checkbox"
              onChange={() => onlyPlatChecked && setPlat(!plat)}
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
            Plats
          </label>
          <label className="box">
            <input
              type="checkbox"
              onChange={() => onlyDessertChecked && setDessert(!dessert)}
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
            Desserts
          </label>
          <label className="box">
            <input
              type="checkbox"
              onChange={() => onlyBoissonChecked && setBoisson(!boisson)}
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
            Boissons
          </label>
          <label className="box">
            <input
              type="checkbox"
              onChange={() => onlyAutreChecked && setAutre(!autre)}
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
            Autres
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
