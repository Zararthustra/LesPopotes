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
          title="Envoyer"
        />
      </div>
    </>
  );
};

// Web Sockets (issue: works on browsers but not on mobile)

//import io from "socket.io-client";
// // Sockets handler
// const socket = io("http://localhost:3002", {
//   transports: ["websocket", "polling"],
// });
// const [socketUsers, setSocketUsers] = useState({});

// // Receive connection infos from server when connection
// socket.on("connected", (connectionID) => {
//   if (socket.connected) setUseSocket(true)
//   console.log(connectionID, "is connected");
// });
// // Send infos to server if connected
// socket.on("connect", () => {
//   socket.emit("userObject", {
//     name: localStorage.getItem("username"),
//     id: user_id,
//   });
// });
// // Retrieve connected users
// socket.on("usersConnected", (users) => {
//   setSocketUsers(users);
//   console.log(users, "are connected");
// });

// socketConnection.emit("send-message", { user_id, message });
// socket.on("broadcastmessage", (messageObj) => {
//   console.log(messageObj);
//   setMessages((messages) => [
//     ...messages,
//     { user_id: parseInt(messageObj.user_id), content: messageObj.message },
//   ]);
// });

// socket.on("disconnected", (id) => {
//   console.log(id, "has disconnected");
// });
// // If close browser's tab/window
// socket.on("disconnect", () => {
//   socket.emit("disconnection");
// });
// // If leave chat room
// return () => socket.emit("disconnection");
