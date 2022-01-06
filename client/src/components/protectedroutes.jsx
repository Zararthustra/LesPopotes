import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Outlet } from "react-router";
import { Host } from "../assets/utils/host";
import { Login } from "../pages/login";

export const ProtectedRoutes = () => {
  const [isAuth, setIsAuth] = useState(false);

  const name = localStorage.getItem("username");
  const password = localStorage.getItem("password");

  //Check if user exists
  useEffect(() => {
    let isSubscribed = true;
    axios
      .post(`${Host}api/user/login`, {
        name,
        password,
      })
      .then((response) => {
        if (response.data === "Wrong credentials") {
          setIsAuth(false);
        } else {
          if (isSubscribed) setIsAuth(true);
        }
      })
      .catch((error) =>
        console.log(
          "An error occured while requesting server on login:\n",
          error
        )
      );
    return () => (isSubscribed = false);
  }, [isAuth, name, password]);

  return isAuth ? <Outlet /> : <Login />;
};
