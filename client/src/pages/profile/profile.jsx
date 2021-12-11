import { Link, Outlet } from "react-router-dom";

export const Profile = () => {
  return (
    <div>
      <div className="headerContainer">
        <h1 className="title profile">Profil</h1>
        <div className="links">
          <Link className="navlink" to="favorites">
            Favorites
          </Link>
          <Link className="navlink" to="creations">
            Creations
          </Link>
        </div>
        <Outlet />
      </div>
    </div>
  );
};
