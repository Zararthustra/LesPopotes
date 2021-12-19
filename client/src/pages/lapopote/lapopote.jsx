import { useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Recettes } from "./recettes";

export const Lapopote = () => {
  const location = useLocation().pathname;
  const navigate = useNavigate();

  return (
    <div className="headerContainer">
      <h1 className="title lapopote" onClick={() => navigate("/lapopote")}>
        La Popote
      </h1>
      {location !== "/lapopote" ? <Outlet /> : <Recettes />}
    </div>
  );
};
