import { Link, Outlet } from "react-router-dom";

export const Lespopotes = () => {
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
      <h1 className="title lespopotes">Les Popotes</h1>
      <div className="links">
        <Link
          id="1"
          onClick={() => toggleActiveLink("1")}
          className="navlink"
          to="popotes"
        >
          Les Popotes
        </Link>
        <Link
          id="2"
          onClick={() => toggleActiveLink("2")}
          className="navlink"
          to="mespopotes"
        >
          Mes Popotes
        </Link>
      </div>
      <Outlet />
    </div>
  );
};
