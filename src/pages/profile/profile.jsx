import { Link, Outlet, useNavigate } from "react-router-dom";

export const Profile = () => {
  let navigate = useNavigate();

  return (
    <div>
      <h1 style={{ cursor: "pointer" }} onClick={() => navigate("/profile")}>
        Profile
      </h1>

      <Link style={{ margin: 1 + "em" }} to="favorites">
        Favorites
      </Link>
      <Link style={{ margin: 1 + "em" }} to="Creations">
        Creations
      </Link>
      <Outlet />
    </div>
  );
};
