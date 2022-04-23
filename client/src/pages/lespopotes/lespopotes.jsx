import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { Host } from "../../assets/utils/host";
import { Popotesitem } from "../../components/popotesitem";
import { SearchFilterPopotes } from "../../components/searchFilterPopotes";
import ClipLoader from "react-spinners/ClipLoader";
import { Forum } from "../../components/forum";
import { RefreshSession } from "../../components/refreshSession";

export const Lespopotes = () => {
  const location = useLocation().pathname;
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState();
  const [offset, setOffset] = useState(0);
  const limit = 10;
  const [totalItems, setTotalItems] = useState();
  const [searchFilter, setSearchFilter] = useState("");
  axios.defaults.headers.common["authorization"] = localStorage.getItem("accessToken");
  const [expiredSession, setExpiredSession] = useState(false);

  // Load data when mounting
  useEffect(() => {
    // Active Tab
    let lespopotes = document.getElementById("mypopotes").classList;
    let forum = document.getElementById("forum").classList;

    if (location === "/lespopotes") {
      lespopotes.add("activePopotes");
      forum.remove("activePopotes");
    } else if (location === "/lespopotes/forum") {
      forum.add("activePopotes");
      lespopotes.remove("activePopotes");
    }

    // API calls
    setLoading(true);

    const getUsers = async () => {
      const res = await axios.get(`${Host}api/users`).catch((err) => {
        console.log("Session expirée, veuillez vous reconnecter.");
        return setExpiredSession(true)
      });
      if (res.data) {
        setLoading(false);
        setUsers(res.data);
      }
    };
    const getUsersPaginated = async () => {
      const res = await axios.get(`${Host}api/users/pagination/${offset}`, {
        params: { limit },
      }).catch((err) => {
        console.log("Session expirée, veuillez vous reconnecter.");
        return setExpiredSession(true)
      });
      if (res && res.data) {
        setTotalItems(res.data.count);
        setLoading(false);
        setUsers(res.data.rows);
      }
    };

    if (searchFilter || filter) getUsers();
    else getUsersPaginated();

    return () => setUsers([]);
  }, [offset, filter, searchFilter, location]);

  if (expiredSession) return (
    <div>
      <div className="headerContainer">
        <h1
          className="title lespopotes"
          onClick={() => navigate("/lespopotes")}
        >
          Les Popotes
        </h1>
        <div className="links">
          <Link id="mypopotes" className="navlink" to="/lespopotes">
            Les Popotes
          </Link>
          <Link id="forum" className="navlink" to="forum">
            Forum
          </Link>
        </div>
      </div>
      <main className="lesPopotesPage">
        <RefreshSession />
      </main>
    </div>
  )
  return (
    <div>
      <div className="headerContainer">
        <h1
          className="title lespopotes"
          onClick={() => navigate("/lespopotes")}
        >
          Les Popotes
        </h1>
        <div className="links">
          <Link id="mypopotes" className="navlink" to="/lespopotes">
            Les Popotes
          </Link>
          <Link id="forum" className="navlink" to="forum">
            Forum
          </Link>
        </div>
      </div>
      {location === "/lespopotes/forum" ? (
        <Forum />
      ) : location !== "/lespopotes" ? (
        <Outlet />
      ) : (
        <main className="lesPopotesPage">
          <SearchFilterPopotes
            searchFilter={searchFilter}
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
                const userTypeLower = user.type.toLowerCase();
                if (
                  userTypeLower.includes(filter.toLowerCase()) &&
                  user.name.toLowerCase().includes(searchFilter.toLowerCase())
                )
                  return <Popotesitem key={index} user={user} />;
                return "";
              })
            ) : searchFilter ? (
              users.map((user, index) => {
                if (
                  user.name.toLowerCase().includes(searchFilter.toLowerCase())
                )
                  return <Popotesitem user={user} key={index} />;
                return "";
              })
            ) : (
              users.map((user, index) => {
                return <Popotesitem user={user} key={index} />;
              })
            )}
          </div>
          <div className="prevNextButtons">
            {!filter && !searchFilter && offset - limit >= 0 ? (
              <div
                className="prevButton"
                onClick={() => setOffset(offset - limit)}
              >
                Précédents
              </div>
            ) : (
              <div style={{ width: "4em", padding: "0 1em 0" }}></div>
            )}
            {!filter && !searchFilter &&
              <div>
                Page {offset / limit + 1}/{parseInt(totalItems / limit) + 1}
              </div>}
            {!filter && !searchFilter && offset + limit < totalItems ? (
              <div
                className="nextButton"
                onClick={() => setOffset(offset + limit)}
              >
                Suivants
              </div>
            ) : (
              <div style={{ width: "4em", padding: "0 1em 0" }}></div>
            )}
          </div>
        </main>
      )}
    </div>
  );
};
