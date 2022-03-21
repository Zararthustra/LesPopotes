import { forwardRef, useState, useImperativeHandle } from "react";
import { icons } from "../assets/utils/importIcons";

export const Toaster = forwardRef(({ type, message }, ref) => {
  const [showToaster, setShowToaster] = useState(false);

  useImperativeHandle(ref, () => ({
    showToaster() {
      setShowToaster(true);
      setTimeout(() => setShowToaster(false), 5000);
    },
  }));

  if (type === "success")
    return (
      <div
        id={showToaster ? "showToaster" : "hideToaster"}
        className="toasterContainer"
        style={{ backgroundColor: "#75ff93ec" }}
      >
        <img src={icons.ok} className="toasterIcon" alt="succès"></img>
        <div className="groupToasterMessage">
          <div className="toasterTitle">Succès</div>
          <div className="toasterMessage">{message}</div>
        </div>
      </div>
    );
  else if (type === "info")
    return (
      <div
        id={showToaster ? "showToaster" : "hideToaster"}
        className="toasterContainer"
        style={{ backgroundColor: "#B2E7F5ec" }}
      >
        <img src={icons.info} className="toasterIcon" alt="information"></img>
        <div className="groupToasterMessage">
          <div className="toasterTitle">Info</div>
          <div className="toasterMessage">{message}</div>
        </div>
      </div>
    );
  else if (type === "warning")
    return (
      <div
        id={showToaster ? "showToaster" : "hideToaster"}
        className="toasterContainer"
        style={{ backgroundColor: "#ff9e01ec" }}
      >
        <img
          src={icons.warning}
          className="toasterIcon"
          alt="avertissement"
        ></img>
        <div className="groupToasterMessage">
          <div className="toasterTitle">Avertissement</div>
          <div className="toasterMessage">{message}</div>
        </div>
      </div>
    );
  else
    return (
      <div
        id={showToaster ? "showToaster" : "hideToaster"}
        className="toasterContainer"
        style={{ backgroundColor: "#eb5c5cec" }}
      >
        <img src={icons.cancel} className="toasterIcon" alt="erreur"></img>
        <div className="groupToasterMessage">
          <div className="toasterTitle">Erreur</div>
          <div className="toasterMessage">{message}</div>
        </div>
      </div>
    );
});
