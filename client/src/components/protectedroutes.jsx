import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Outlet } from "react-router";
import { Host } from "../assets/utils/host";
import { Login } from "../pages/login";
import ClipLoader from "react-spinners/ClipLoader";
import { useCallback } from "react";

export const ProtectedRoutes = () => {
  const location = useLocation().pathname;

  const [isAuth, setIsAuth] = useState(false);// refreshToken in localstorage ? true : false
  const [loading, setLoading] = useState(false);

  const name = localStorage.getItem("username");
  const password = localStorage.getItem("password");

  const authenticate = useCallback(async () => {
    setLoading(true);

    try {
      const response = await axios.post(`${Host}api/user/login`, {
        name,
        password,
      });

      if (response.data === "Wrong credentials") {
        setLoading(false);
        setIsAuth(false);
      } else {
        localStorage.setItem("userid", response.data.userValidated.id);
        setLoading(false);
        setIsAuth(true);
      }
    } catch (error) {
      console.log(
        "An error occured while requesting server on login:\n",
        error
      );
      setLoading(false);
    }
  }, [name, password]);

  useEffect(() => {
    authenticate();
  }, [authenticate]);

  return loading ? (
    // while requesting API
    location === "/lapopote/creation" ? (
      <div className="loginContainer">
        <div className="loaderSpacer" />
        <ClipLoader css={""} color={"#78f5ca"} loading={loading} size={100} />
      </div>
    ) : (
      <div className="loginContainer">
        <h1 className="connexion">Connexion</h1>
        <div className="loaderSpacer" />
        <ClipLoader css={""} color={"#78f5ca"} loading={loading} size={100} />
      </div>
    )
  ) : // API responded
  isAuth ? (
    <Outlet />
  ) : (
    <Login />
  );
};
