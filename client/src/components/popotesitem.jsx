import { useNavigate } from "react-router-dom";
import { capitalize } from "../assets/utils/capitalize";
import { getLevel } from "../assets/utils/getLevel";

export const Popotesitem = ({ user }) => {
  const navigate = useNavigate();

  return (
    <div
      className="itemContainer"
      onClick={() => {
        navigate(`/lespopotes/${user.name}`);
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
      }}
    >
      <div className="left">
        <div className="names">
        <div className="pseudo">{capitalize(user.name)}</div>
        <div className="type">{user.type}</div>
        </div>
        <div className="popotelevel">
          {getLevel(user.recipes, user.notes, user.popotes, user.comments)}
        </div>
      </div>
      <div className="right">
        <img src={user.avatar} alt="avatar" className="avatar" />
        
      </div>
    </div>
  );
};
