import { useNavigate, useLocation } from "react-router-dom";

export const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Navbar display
  const onSwitch = () => {
    if (location.pathname === "/lapopote") {
      navigate("lespopotes");
    } else navigate("lapopote");
  };

  return (
    <div className="navbar">
      <label className="switch">
        <input type="checkbox"/>
        <span className="slider round" onClick={onSwitch}></span>
      </label>
      <div className="home" onClick={() => navigate("/")} />
      <div className="profile" onClick={() => navigate("profile")} />
    </div>
  );
};
