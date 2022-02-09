import axios from "axios";
import { useEffect, useState } from "react";
import { Host } from "../../assets/utils/host";
import { Popotesitem } from "../../components/popotesitem";
import ClipLoader from "react-spinners/ClipLoader";

export const Mespopotes = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  // Load data when mounting
  useEffect(() => {
    let isSubscribed = true;
    setLoading(true);

    axios.get(`${Host}api/users`).then((res) => {
      if (isSubscribed) {
        setLoading(false);

        setUsers(res.data);
      }
    });

    return () => (isSubscribed = false);
  }, []);

  return (
    <div className="mespopotesBody">
      <div className="mespopotesList">
        {loading ? (
          <div className="loaderSpacer">
            <ClipLoader
              css={""}
              color={"#78f5ca"}
              loading={loading}
              size={100}
            />
            ;
          </div>
        ) : (
          users.map((user, index) => {
            return <Popotesitem user={user} key={index} />;
          })
        )}
      </div>
    </div>
  );
};
