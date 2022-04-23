import axios from "axios";
import { Host } from "../assets/utils/host";
import { refreshPage } from "../assets/utils/refreshPage";


export const RefreshSession = () => {
  const refreshToken = localStorage.getItem("refreshToken");
  
  const logout = async () => {
    await axios.delete(`${Host}api/user/logout/${refreshToken}`);
    localStorage.clear();
    refreshPage(true)
  };

  const getNewToken = async () => {
    console.log("Reconnexion...");
    try {
      const response = await axios.get(`${Host}api/refreshAT/${refreshToken}`)
      if (!response) return console.log("Impossible de se reconnecter.");
      localStorage.setItem("accessToken", response.data.accessToken)
      console.log("Reconnecté.");
      refreshPage(true)
    } catch (error) {
      return logout()
    }
  };

  return (
    <div className="refreshSessionPage">
      <div className="refreshSessionWindow">
        <div className="refreshSessionTitle">Session expirée</div>
        <img src="https://avatars.dicebear.com/api/big-smile/expiredsessionnn......svg?translateY=10" alt="avatar" className="avatarNotFound" />
        <div className="login refreshSessionButton" onClick={getNewToken}>Se reconnecter</div>
      </div>
    </div>
  );
};
