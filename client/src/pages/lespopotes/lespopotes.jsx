import { Link, Outlet } from "react-router-dom";

export const Lespopotes = () => {
  return (
    <div className="popotesContainer">
      <h1 className="popotesTitle">Les popotes</h1>
      <div className="popotesLinks">
        <Link to="mespopotes">Mes Popotes</Link>
        <Link to="popote">Popote</Link>
        <Outlet />
      </div>
    </div>
  );
};
