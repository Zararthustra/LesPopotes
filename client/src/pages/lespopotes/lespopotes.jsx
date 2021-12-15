import { Link, Outlet, useNavigate } from "react-router-dom";
import { Popotes } from "./popotes";

export const Lespopotes = () => {
  const navigate = useNavigate();
  
  const toggleActiveLink = (id) => {
    let activeLink = document.getElementById(id).classList;
    let activeLink1 = document.getElementById("1").classList;
    let activeLink2 = document.getElementById("2").classList;

    if (id === "1" && activeLink.length === 1) {
      activeLink.add("activePopotes");
      activeLink2.remove("activePopotes");
    } else if (id === "2" && activeLink.length === 1) {
      activeLink.add("activePopotes");
      activeLink1.remove("activePopotes");
    }
  };
  return (
    <div className="headerContainer">
      <h1 className="title lespopotes" onClick={() => navigate("/lespopotes")}>
        Les Popotes
      </h1>
      <div className="searchPopotes">
        <div className="searchIcon" />
        <input type="text" className="searchBar" />
      </div>
      <div className="separatePopotes"></div>
      <Popotes />
    </div>
  );
};
