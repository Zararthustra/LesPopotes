import { icons } from "../assets/utils/importIcons";
import { useState, useEffect } from "react";
import axios from "axios";
import { Host } from "../assets/utils/host";
import ClipLoader from "react-spinners/ClipLoader";
import { ForumMessage } from "./forumMessage";
import { RefreshSession } from "./refreshSession";

export const Forum = () => {
  const userId = localStorage.getItem("userid");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  axios.defaults.headers.common["authorization"] = localStorage.getItem("accessToken");
  const [expiredSession, setExpiredSession] = useState(false);

  // Load data when mounting
  useEffect(() => {
    setLoading(true);
    try {
      axios.get(`${Host}api/forum`).then((res) => {
        if (res.data) {
          setLoading(false);
          setMessages(res.data);
        }
      })
      axios.get(`${Host}api/users`).then((res) => {
        if (res.data) {
          setLoading(false);
          setUsers(res.data);
        }
      });
    } catch (error) {
      setLoading(false);
      console.log("Session expirée, veuillez vous reconnecter.");
      return setExpiredSession(true)
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

  if (expiredSession) return <RefreshSession />
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
      {loading ? (
        <div className="commentsForum">
          <ClipLoader css={""} color={"#78f5ca"} loading={loading} size={100} />
        </div>
      ) : (
        <div className="commentsForum">
          {messages &&
            messages.map((message, index) => {
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
                    <ForumMessage user={user} date={date} message={message} />
                  </div>
                )
              return "Erreur de chargement du message";
            })}
        </div>
      )}
    </div>
  );
};
