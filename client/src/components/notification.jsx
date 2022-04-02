import axios from "axios";
import { useNavigate } from "react-router-dom";
import { capitalize } from "../assets/utils/capitalize";
import { Host } from "../assets/utils/host";

export const Notification = ({ notification }) => {
  const navigate = useNavigate();
  const senderName = capitalize(notification.sender_name)

  const redirectNotif = () => {
    if (notification.type === "comment" || notification.type === "note" || notification.type === "like")
      navigate(`/lapopote/${notification.recipe_id}`);
    else if (notification.type === "friendship" || notification.type === "message")
      navigate(`/lespopotes/${notification.sender_name}`);
    else if (notification.type === "thread")
      navigate(`/lespopotes/forum`);
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    axios.delete(`${Host}api/notification/${notification.id}`);
  }

  const notifMessage = (type) => {
    switch (type) {
      case 'comment': return (<div><b>{senderName}</b> a <b>commenté</b> votre recette</div>)
      case 'note': return (<div><b>{senderName}</b> a <b>noté</b> votre recette</div>)
      case 'friendship': return (<div><b>{senderName}</b> vous a ajouté comme <b>popote</b></div>)
      case 'message': return (<div><b>{senderName}</b> vous a envoyé un <b>message</b></div>)
      case 'thread': return (<div><b>{senderName}</b> vous a répondu dans le <b>forum</b></div>)
      case 'like': return (<div><b>{senderName}</b> a <b>liké</b> votre commentaire</div>)
      default: return 'Une erreur est survenue'
    }
  }

  return (
    <div onClick={redirectNotif} className="notification">
      {notifMessage(notification.type)}
    </div>
  );
};
