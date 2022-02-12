import axios from "axios";
import { useEffect, useState } from "react";
import { Host } from "../../assets/utils/host";
import { Popotesitem } from "../../components/popotesitem";
import ClipLoader from "react-spinners/ClipLoader";
import { SearchFilterPopotes } from "../../components/searchFilterPopotes";

export const Mespopotes = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState();
  const [searchFilter, setSearchFilter] = useState("");

  // Load data when mounting
  useEffect(() => {
    let isSubscribed = true;
    setLoading(true);

    axios.get(`${Host}api/users`).then((res) => {
      if (isSubscribed && res.data) {
        setLoading(false);
        setUsers(res.data);
      }
    });

    return () => (isSubscribed = false);
  }, []);
  return (
    <div className="mespopotesBody">
      <main className="lesPopotesPage">
        <SearchFilterPopotes
          setFilter={setFilter}
          setSearchFilter={setSearchFilter}
        />
        <div className="separatePopotes"></div>
        <div className="itemsContainer">
          {loading ? (
            <ClipLoader
              css={""}
              color={"#78f5ca"}
              loading={loading}
              size={100}
            />
          ) : filter ? (
            users.map((user, index) => {
              if (
                user.type.toLowerCase().includes(filter.toLowerCase()) &&
                user.name.toLowerCase().includes(searchFilter.toLowerCase())
              )
                return <Popotesitem key={index} user={user} />;
              return "";
            })
          ) : searchFilter ? (
            users.map((user, index) => {
              if (user.name.toLowerCase().includes(searchFilter.toLowerCase()))
                return <Popotesitem user={user} key={index} />;
              return "";
            })
          ) : (
            users.map((user, index) => {
              return <Popotesitem user={user} key={index} />;
            })
          )}
        </div>
      </main>
    </div>
  );
};
