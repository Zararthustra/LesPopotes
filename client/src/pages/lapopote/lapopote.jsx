import { Link, Outlet } from "react-router-dom";

export const Lapopote = () => {
  const toggleActiveLink = (id) => {
    let activeLink = document.getElementById(id).classList;
    let activeLink1 = document.getElementById("1").classList;
    let activeLink2 = document.getElementById("2").classList;

    if (id === "1" && activeLink.length === 1) {
      activeLink.add("activePopote");
      activeLink2.remove("activePopote");
    } else if (id === "2" && activeLink.length === 1) {
      activeLink.add("activePopote");
      activeLink1.remove("activePopote");
    }
  };
  return (
    <div className="headerContainer">
      <h1 className="title lapopote">La Popote</h1>
      <div className="links">
        <Link
          id="1"
          onClick={() => toggleActiveLink("1")}
          className="navlink"
          to="recettes"
        >
          Recettes
        </Link>
        <Link
          id="2"
          onClick={() => toggleActiveLink("2")}
          className="navlink"
          to="creation"
        >
          Creation
        </Link>
      </div>
      <Outlet />
    </div>
  );
};
