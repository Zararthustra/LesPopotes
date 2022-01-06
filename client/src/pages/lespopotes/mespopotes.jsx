import axios from "axios";
import { useEffect, useState } from "react";
import { Host } from "../../assets/utils/host";
import { Popotesitem } from "../../components/popotesitem";

export const Mespopotes = () => {
  const [users, setUsers] = useState([]);

  // Load data when mounting
  useEffect(() => {
    let isSubscribed = true;

    axios.get(`${Host}api/users`).then((res) => {
      if (isSubscribed) setUsers(res.data);
    });

    return () => (isSubscribed = false);
  }, []);

  return (
    <div className="mespopotesBody">
      <div className="mespopotesList">
      {users.map((user, index) => {
          return <Popotesitem user={user} key={index}/>;
        })}
      </div>
    </div>
  );
};
