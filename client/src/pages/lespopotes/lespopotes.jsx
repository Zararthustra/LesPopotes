import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Host } from "../../assets/utils/host";
import { Popotesitem } from "../../components/popotesitem";
import { SearchFilterPopotes } from "../../components/searchFilterPopotes";
import ClipLoader from "react-spinners/ClipLoader";

export const Lespopotes = () => {
  const location = useLocation().pathname;
  const navigate = useNavigate();
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

  // const toggleActiveLink = (id) => {
  //   let activeLink = document.getElementById(id).classList;
  //   let activeLink1 = document.getElementById("1").classList;
  //   let activeLink2 = document.getElementById("2").classList;

  //   if (id === "1" && activeLink.length === 1) {
  //     activeLink.add("activePopotes");
  //     activeLink2.remove("activePopotes");
  //   } else if (id === "2" && activeLink.length === 1) {
  //     activeLink.add("activePopotes");
  //     activeLink1.remove("activePopotes");
  //   }
  // };

  // Popote page
  if (location !== "/lespopotes") return <Outlet />;

  return (
    <div>
      <div className="headerContainer">
        <h1
          className="title lespopotes"
          onClick={() => navigate("/lespopotes")}
        >
          Les Popotes
        </h1>
      </div>
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
              console.log(filter);
              const userTypeLower = user.type.toLowerCase()
              if (
                userTypeLower.includes(filter) &&
                user.name.includes(searchFilter)
              )
                  return <Popotesitem key={index} user={user} />;
              return "";
            })
          ) : searchFilter ? (
            users.map((user, index) => {
              if (user.name.includes(searchFilter))
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
