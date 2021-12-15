import { useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { Recettes } from "./recettes";

export const Lapopote = () => {
  const navigate = useNavigate();
  const location = useLocation().pathname;

  const [apero, setApero] = useState(false);
  const [entree, setEntree] = useState(false);
  const [plat, setPlat] = useState(false);
  const [dessert, setDessert] = useState(false);
  const [autre, setAutre] = useState(false);

  // const toggleActiveLink = (id) => {
  //   let activeLink = document.getElementById(id).classList;
  //   let activeLink1 = document.getElementById("1").classList;
  //   let activeLink2 = document.getElementById("2").classList;

  //   if (id === "1" && activeLink.length === 1) {
  //     activeLink.add("activePopote");
  //     activeLink2.remove("activePopote");
  //   } else if (id === "2" && activeLink.length === 1) {
  //     activeLink.add("activePopote");
  //     activeLink1.remove("activePopote");
  //   }
  // };

  return (
    <div className="headerContainer">
      <h1 className="title lapopote" onClick={() => navigate('/lapopote')}>La Popote</h1>
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
        <button className="popoteButton" onClick={() => navigate("creation")}>
          Créer une recette
        </button>
      </div>
      <div className="separatePopote"></div>
      { location === "/lapopote/creation" ? <Outlet /> : <Recettes />}
    </div>
  );
};
