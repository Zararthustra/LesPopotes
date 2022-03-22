import { capitalize } from "../assets/utils/capitalize";
import { useNavigate } from "react-router-dom";
import { getLevel } from "../assets/utils/getLevel";
import { icons } from "../assets/utils/importIcons";
import { useState, useEffect } from "react";
import axios from "axios";
import { Host } from "../assets/utils/host";

export const Forum = ({ users }) => {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userid");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  // Load data when mounting
  useEffect(() => {
    try {
      axios.get(`${Host}api/forum`).then((res) => {
        if (res.data) {
          setMessages(res.data);
        }
      });
    } catch (error) {
      console.log("An error occured while getting messages : ", error);
    }
  }, []);

  const handleMessage = (event) => {
    setMessage(event.currentTarget.value);
  };
  const handlePressEnter = (event) => {
    if (event.key === "Enter") sendMessage();
  };
  const sendMessage = () => {
    if (!message.trim()) {
      document.querySelector(".sendInput").value = "";
      setMessage("");
      return;
    }
    if (message.length >= 255)
      return alert("Message trop long, respectez 255 caractères maximum !");
    if (message && message.length < 255)
      axios
        .post(`${Host}api/forum`, {
          content: message,
          user_id: userId,
        })
        .then((res) => {
          if (res.data) {
            console.log("res.data:", res.data);

            setMessages([
              {
                user_id: parseInt(res.data.user_id),
                content: res.data.content,
                createdAt: res.data.createdAt,
              },
              ...messages,
            ]);
            document.querySelector(".sendInput").value = "";
            setMessage("");
          }
        });
  };

  return (
    <div className="forum">
      <div className="inputContainer">
        <div className="inputForum">
          <input
            type="text"
            className="sendInput"
            placeholder="Message"
            onChange={handleMessage}
            onKeyDown={handlePressEnter}
          />
          <img
            src={icons.send}
            onClick={sendMessage}
            className="sendButton"
            alt="envoyer"
            title="Envoyer"
          />
        </div>
      </div>
      <div className="commentsForum">
        {messages?.map((message, index) => {
          const user = users.find((user) => user.id === message.user_id);
          const date =
            message.createdAt?.split("T")[0].split("-")[2] +
            "-" +
            message.createdAt?.split("T")[0].split("-")[1] +
            "-" +
            message.createdAt?.split("T")[0].split("-")[0];
          if (user)
            return (
              <div key={index} className="commentForum">
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
                <div className="groupForumButtons">
                  {/* <div className="forumMoreButton">9 commentaires</div> */}
                  <div
                    className="forumRepButton"
                    onClick={() => alert("Bientôt disponible !")}
                  >
                    Répondre
                  </div>
                </div>
              </div>
            );
          return "";
        })}
      </div>
    </div>
  );
};
