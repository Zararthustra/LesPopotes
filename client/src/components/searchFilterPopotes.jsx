import { useEffect } from "react";
import { useState } from "react";

export const SearchFilterPopotes = ({ setFilter, setSearchFilter }) => {
  //___________________________________________________ Variables

  const [gourmand, setGourmand] = useState(false);
  const [bon, setBon] = useState(false);
  const [cordon, setCordon] = useState(false);
  const [carnivore, setCarnivore] = useState(false);
  const [cuisto, setCuisto] = useState(false);
  const [grignotteur, setGrignotteur] = useState(false);
  const [cultivateur, setCultivateur] = useState(false);
  const [herbivore, setHerbivore] = useState(false);

  // Flemme de faire une fonction
  const allFiltersNotChecked =
    !gourmand &&
    !bon &&
    !cordon &&
    !carnivore &&
    !cuisto &&
    !grignotteur &&
    !cultivateur &&
    !herbivore;

  const onlyGourmandChecked =
    !bon &&
    !cordon &&
    !carnivore &&
    !cuisto &&
    !grignotteur &&
    !cultivateur &&
    !herbivore;

  const onlyBonChecked =
    !gourmand &&
    !cordon &&
    !carnivore &&
    !cuisto &&
    !grignotteur &&
    !cultivateur &&
    !herbivore;

  const onlyCordonChecked =
    !gourmand &&
    !bon &&
    !carnivore &&
    !cuisto &&
    !grignotteur &&
    !cultivateur &&
    !herbivore;

  const onlyCarnivoreChecked =
    !gourmand &&
    !bon &&
    !cordon &&
    !cuisto &&
    !grignotteur &&
    !cultivateur &&
    !herbivore;

  const onlyCuistoChecked =
    !gourmand &&
    !bon &&
    !cordon &&
    !carnivore &&
    !grignotteur &&
    !cultivateur &&
    !herbivore;

  const onlyGrignotteurChecked =
    !gourmand &&
    !bon &&
    !cordon &&
    !carnivore &&
    !cuisto &&
    !cultivateur &&
    !herbivore;

  const onlyCultivateurChecked =
    !gourmand &&
    !bon &&
    !cordon &&
    !carnivore &&
    !cuisto &&
    !grignotteur &&
    !herbivore;

  const onlyHerbivoreChecked =
    !gourmand &&
    !bon &&
    !cordon &&
    !carnivore &&
    !cuisto &&
    !grignotteur &&
    !cultivateur;

  //___________________________________________________ Functions

  useEffect(() => {
    if (allFiltersNotChecked) setFilter();
    if (gourmand) setFilter("gourmand");
    if (bon) setFilter("bon vivant");
    if (cordon) setFilter("cordon bleu");
    if (carnivore) setFilter("carnivore");
    if (cuisto) setFilter("cuisto du dimanche");
    if (grignotteur) setFilter("grignotteur");
    if (cultivateur) setFilter("cultivateur");
    if (herbivore) setFilter("herbivore");
  });

  const handleSearch = (event) => {
    const value = event.currentTarget.value;
    setSearchFilter(value);
  };

  //___________________________________________________ Render

  return (
    <div className="popotesSubdivision">
      <div className="searchPopotes">
        <div className="searchIcon" />
        <input type="text" className="searchBar" onChange={handleSearch} />
      </div>
      <div className="filtersPopotes">
        <label className="box">
          <input
            type="checkbox"
            onChange={() => onlyGourmandChecked && setGourmand(!gourmand)}
          />
          <svg
            className={`check-popotes ${gourmand ? "check-popotes--active" : ""}`}
            aria-hidden="true"
            viewBox="0 0 13 10"
            fill="none"
          >
            <path
              d="M1 4.5L5 9L14 1"
              strokeWidth="2"
              stroke={gourmand ? "#fff" : "none"}
            />
          </svg>
          Gourmands
        </label>
        <label className="box">
          <input
            type="checkbox"
            onChange={() => onlyBonChecked && setBon(!bon)}
          />
          <svg
            className={`check-popotes ${bon ? "check-popotes--active" : ""}`}
            aria-hidden="true"
            viewBox="0 0 13 10"
            fill="none"
          >
            <path
              d="M1 4.5L5 9L14 1"
              strokeWidth="2"
              stroke={bon ? "#fff" : "none"}
            />
          </svg>
          Bons vivants
        </label>
        <label className="box">
          <input
            type="checkbox"
            onChange={() => onlyCordonChecked && setCordon(!cordon)}
          />
          <svg
            className={`check-popotes ${cordon ? "check-popotes--active" : ""}`}
            aria-hidden="true"
            viewBox="0 0 13 10"
            fill="none"
          >
            <path
              d="M1 4.5L5 9L14 1"
              strokeWidth="2"
              stroke={cordon ? "#fff" : "none"}
            />
          </svg>
          Cordons bleus
        </label>
        <label className="box">
          <input
            type="checkbox"
            onChange={() => onlyCarnivoreChecked && setCarnivore(!carnivore)}
          />
          <svg
            className={`check-popotes ${
              carnivore ? "check-popotes--active" : ""
            }`}
            aria-hidden="true"
            viewBox="0 0 13 10"
            fill="none"
          >
            <path
              d="M1 4.5L5 9L14 1"
              strokeWidth="2"
              stroke={carnivore ? "#fff" : "none"}
            />
          </svg>
          Carnivores
        </label>
        <label className="box">
          <input
            type="checkbox"
            onChange={() => onlyCuistoChecked && setCuisto(!cuisto)}
          />
          <svg
            className={`check-popotes ${cuisto ? "check-popotes--active" : ""}`}
            aria-hidden="true"
            viewBox="0 0 13 10"
            fill="none"
          >
            <path
              d="M1 4.5L5 9L14 1"
              strokeWidth="2"
              stroke={cuisto ? "#fff" : "none"}
            />
          </svg>
          Cuistos du dimanche
        </label>
        <label className="box">
          <input
            type="checkbox"
            onChange={() =>
              onlyGrignotteurChecked && setGrignotteur(!grignotteur)
            }
          />
          <svg
            className={`check-popotes ${grignotteur ? "check-popotes--active" : ""}`}
            aria-hidden="true"
            viewBox="0 0 13 10"
            fill="none"
          >
            <path
              d="M1 4.5L5 9L14 1"
              strokeWidth="2"
              stroke={grignotteur ? "#fff" : "none"}
            />
          </svg>
          Grignotteurs
        </label>
        <label className="box">
          <input
            type="checkbox"
            onChange={() =>
              onlyCultivateurChecked && setCultivateur(!cultivateur)
            }
          />
          <svg
            className={`check-popotes ${cultivateur ? "check-popotes--active" : ""}`}
            aria-hidden="true"
            viewBox="0 0 13 10"
            fill="none"
          >
            <path
              d="M1 4.5L5 9L14 1"
              strokeWidth="2"
              stroke={cultivateur ? "#fff" : "none"}
            />
          </svg>
          Cultivateurs
        </label>
        <label className="box">
          <input
            type="checkbox"
            onChange={() => onlyHerbivoreChecked && setHerbivore(!herbivore)}
          />
          <svg
            className={`check-popotes ${herbivore ? "check-popotes--active" : ""}`}
            aria-hidden="true"
            viewBox="0 0 13 10"
            fill="none"
          >
            <path
              d="M1 4.5L5 9L14 1"
              strokeWidth="2"
              stroke={herbivore ? "#fff" : "none"}
            />
          </svg>
          Herbivores
        </label>
      </div>
    </div>
  );
};
