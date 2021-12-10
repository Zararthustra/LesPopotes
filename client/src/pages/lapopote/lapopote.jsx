import { Link, Outlet } from "react-router-dom";

export const Lapopote = () => {
  return (
    <div className="popoteContainer">
      <h1 className="popoteTitle">La popote</h1>
      <div className="popoteLinks">
        <Link to="recettes">Recettes</Link>
        <Link to="recette">Recette</Link>
        <Link to="creation">Creation</Link>
        <Outlet />
      </div>
    </div>
  );
};
