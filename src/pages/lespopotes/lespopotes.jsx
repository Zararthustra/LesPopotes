import { Link, useNavigate, Outlet } from "react-router-dom";

export const Lespopotes = () => {
  let navigate = useNavigate();
  
  return (
    <div>
      <h1 style={{ cursor: "pointer" }} onClick={() => navigate("/lespopotes")}>
        Les popotes
      </h1>

      <Link style={{ margin: 1 + "em" }} to="mespopotes">
        Mes Popotes
      </Link>
      <Link style={{ margin: 1 + "em" }} to="popote">
        Popote
      </Link>
      <Outlet />
    </div>
  );
};
