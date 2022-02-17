import { icons } from "../assets/utils/importIcons";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Host } from "../assets/utils/host";
import ClipLoader from "react-spinners/ClipLoader";

export const Messages = ({ popote }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const user_id = localStorage.getItem("userid");
  const popote_id = popote.id;

  // Load data when mounting
  useEffect(() => {
    setLoading(true);
    const container = document.querySelector(".messageContainer");

    try {
      axios
        .get(`${Host}api/messages`, { params: { popote_id, user_id } })
        .then((res) => {
          if (res.data) {
            setMessages(res.data);
            setLoading(false);
            container?.scrollTo(0, 5000);
          }
        });
    } catch (error) {
      console.log("An error occured while getting messages : ", error);
      setLoading(false);
    }
  }, [popote_id, user_id]);

  const handleMessage = (event) => {
    setMessage(event.currentTarget.value);
  };
  const handlePressEnter = (event) => {
    if (event.key === "Enter") sendMessage();
  };
  const sendMessage = () => {
    if (message)
      axios
        .post(`${Host}api/messages`, {
          content: message,
          user_id,
          popote_id,
        })
        .then((res) => {
          if (res.data) {
            setMessages([
              ...messages,
              { user_id: parseInt(user_id), content: message },
              res.data.content,
            ]);
            document.querySelector(".sendInput").value = "";
            setMessage("");
            const container = document.querySelector(".messageContainer");
            container.scrollTo(0, container.scrollHeight);
          }
        });
  };

  return (
    <>
      <div className="messageContainer">
        {loading ? (
          <ClipLoader css={""} color={"#78f5ca"} loading={loading} size={100} />
        ) : (
          messages.map((message, index) => {
            if (message.content)
              return (
                <div
                  key={index}
                  className={
                    message.user_id === parseInt(user_id)
                      ? "authorMessage"
                      : "message"
                  }
                >
                  {message.content}
                </div>
              );
            return "";
          })
        )}
      </div>
      <div className="inputMessage">
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
        />
      </div>
    </>
  );
};
