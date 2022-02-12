import React from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";
import { App } from "./App";
import "./styles/App.css";
import "./styles/navbar.css";
import "./styles/footer.css";
import "./styles/home.css";
import "./styles/login.css";
import "./styles/lapopote/lapopote.css";
import "./styles/lapopote/recipeCard.css";
import "./styles/lapopote/recipe.css";
import "./styles/lapopote/creation.css";
import "./styles/profile/profile.css";
import "./styles/profile/myprofile.css";
import "./styles/lespopotes/lespopotes.css";
import "./styles/lespopotes/popotesitem.css";
import "./styles/lapopote/comments.css";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
reportWebVitals();
window.addEventListener("load", () => {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker
      .register("../sw.js")
      .then(function (registration) {
        // Registration was successful
        console.log(
          "ServiceWorker registration successful with scope: ",
          registration.scope
        );
      })
      .catch(function (err) {
        // registration failed :(
        console.log("ServiceWorker registration failed: ", err);
      });
  }
});
