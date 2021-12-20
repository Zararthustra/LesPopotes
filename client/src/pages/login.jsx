import { useState } from "react";
import { useNavigate } from "react-router";
import { Lapopote } from "./lapopote/lapopote";
export const Login = () => {
  let navigate = useNavigate();
  const login = () => {
    localStorage.setItem("username", "popol");
    navigate("/lapopote")
  };

    return (
      <div className="loginContainer">
        <h1>Se connecter</h1>
        <button
          onClick={() => { return <div>hello</div>
          }}
        >
          Créer
        </button>
        <button onClick={login}>Connecter</button>
      </div>
    );
};
