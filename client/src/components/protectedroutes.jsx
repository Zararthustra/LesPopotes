import Axios from "axios";
import { useState } from "react";
import { Outlet } from "react-router";
import { Login } from "../pages/login";

export const ProtectedRoutes = () => {
  const [isAuth, setIsAuth] = useState(false);

  //Check if user already exists
  Axios.post("http://localhost:3001/apiroutes/user/login", {
    name: "a",
    password: "a",
  }).then((response) => {
    if (response.data) {
      setIsAuth(true);
    } else {
      setIsAuth(false);
    }
  }).catch(error => console.log("An error occured while requesting server :\n", error));

  return isAuth ? <Outlet /> : <Login />;
};
