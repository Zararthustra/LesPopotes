import { Link } from "react-router-dom";

export const Navbar = () => {
  //isActiveClass
  return (
    <div className="navbar">
      <Link to="/">Accueil</Link>
      <Link to="lapopote">La Popote</Link>
      <Link to="lespopotes">Les Popotes</Link>
      <Link to="profile">Profil</Link>
    </div>
  );
};
