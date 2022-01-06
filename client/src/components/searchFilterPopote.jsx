import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const SearchFilterPopote = () => {
  const navigate = useNavigate();

  const [apero, setApero] = useState(false);
  const [entree, setEntree] = useState(false);
  const [plat, setPlat] = useState(false);
  const [dessert, setDessert] = useState(false);
  const [autre, setAutre] = useState(false);

  return (
    <div className="popoteSubdivision">
      <div className="searchPopote">
        <div className="searchIcon" />
        <input type="text" className="searchBar" />
      </div>
      <div className="filters">
        <label className="box">
          <input
            type="checkbox"
            onChange={() => {
              setApero(!apero);
            }}
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
            onChange={() => {
              setEntree(!entree);
            }}
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
            onChange={() => {
              setPlat(!plat);
            }}
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
            onChange={() => {
              setDessert(!dessert);
            }}
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
            onChange={() => {
              setAutre(!autre);
            }}
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
      <button className="popoteButton" onClick={() => navigate("/lapopote/creation")}>
        Créer une recette
      </button>
      <div className="separatePopote"></div>
    </div>
  );
};
