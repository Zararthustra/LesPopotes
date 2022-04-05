import { capitalize } from "../assets/utils/capitalize";
import { useNavigate } from "react-router-dom";
import { getLevel } from "../assets/utils/getLevel";

export const ForumMessage = ({ user, date, message }) => {
  const navigate = useNavigate();

  return (
    <div className="hoverMessage">
      <div className="commentAvatarHeader">
        <img src={user?.avatar} alt="avatar" className="avatar" />
        <div className="commentHeader">
          <div className="commentTop">
            <div
              className="pseudoForum"
              onClick={() => navigate(`/lespopotes/${user.name}`)}
            >
              {user.name && capitalize(user.name)}
            </div>
            <div className="commentDate">{date}</div>
          </div>
          <div className="commentInfos">
            <div>{user.type}</div>
            <div>
              {
                getLevel(
                  user.recipes,
                  user.notes,
                  user.popotes,
                  user.comments
                )[0]
              }
            </div>
          </div>
        </div>
      </div>
      <div className="forumMessageContent">
        {message.content && capitalize(message.content)}
      </div>
    </div>
  );
};
