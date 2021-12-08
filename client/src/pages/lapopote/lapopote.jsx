import { Link, Outlet, useNavigate } from "react-router-dom";

export const Lapopote = () => {
  let navigate = useNavigate();

  return (
    <div>
      <h1 style={{ cursor: "pointer" }} onClick={() => navigate("/lapopote")}>
        La popote
      </h1>

      <Link style={{ margin: 1 + "em" }} to="recettes">
        Recettes
      </Link>
      <Link style={{ margin: 1 + "em" }} to="recette">
        Recette
      </Link>
      <Link style={{ margin: 1 + "em" }} to="creation">
        Creation
      </Link>
      <Outlet />
    </div>
  );
};
