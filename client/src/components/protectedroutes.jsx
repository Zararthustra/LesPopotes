import { useState } from "react";
import { Outlet } from "react-router";
import { Login } from "../pages/login";

export const ProtectedRoutes = () => {
  const [isAuth, setIsAuth] = useState(false);

  //Here Axios request to setIsAuth

  return isAuth ? <Outlet /> : <Login />;
};
