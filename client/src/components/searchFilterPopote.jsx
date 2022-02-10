import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const SearchFilterPopote = ({ setFilter, setSearchFilter }) => {
  const navigate = useNavigate();

  const [apero, setApero] = useState(false);
  const [entree, setEntree] = useState(false);
  const [plat, setPlat] = useState(false);
  const [dessert, setDessert] = useState(false);
  const [autre, setAutre] = useState(false);
  const allFiltersNotChecked = !apero && !entree && !plat && !dessert && !autre;
  const onlyAperoChecked = !entree && !plat && !dessert && !autre;
  const onlyEntreeChecked = !apero && !plat && !dessert && !autre;
  const onlyPlatChecked = !apero && !entree && !dessert && !autre;
  const onlyDessertChecked = !apero && !entree && !plat && !autre;
  const onlyAutreChecked = !apero && !entree && !plat && !dessert;

  useEffect(() => {
    if (allFiltersNotChecked) setFilter();
    if (apero) setFilter("apero");
    if (entree) setFilter("entree");
    if (plat) setFilter("plat");
    if (dessert) setFilter("dessert");
    if (autre) setFilter("autre");
  });

  const handleSearch = (event) => {
    const value = event.currentTarget.value;
    setSearchFilter(value);
  };

  return (
    <div className="popoteSubdivision">
      <div className="searchPopote">
        <div className="searchIcon" />
        <input type="text" className="searchBar" onChange={handleSearch} />
      </div>
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
      <button
        className="popoteButton"
        onClick={() => navigate("/lapopote/creation")}
      >
        Créer une recette
      </button>
      <div className="separatePopote"></div>
    </div>
  );
};
