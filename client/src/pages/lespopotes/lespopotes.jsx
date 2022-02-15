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
  const [offset, setOffset] = useState(0);
  const limit = 10;
  const [totalPage, setTotalPage] = useState();
  const [searchFilter, setSearchFilter] = useState("");

  // Load data when mounting
  useEffect(() => {
    setLoading(true);

    const getUsers = async () => {
      const res = await axios.get(`${Host}api/users`);
      if (res.data) {
        setLoading(false);
        setUsers(
          res.data.filter(
            (user) => user.id !== parseInt(localStorage.getItem("userid"))
          )
        );
      }
    };
    const getUsersPaginated = async () => {
      const res = await axios.get(`${Host}api/users/pagination/${offset}`, {
        params: { limit },
      });
      if (res.data) {
        setTotalPage(res.data.count);
        setLoading(false);
        setUsers(
          res.data.rows.filter(
            (user) => user.id !== parseInt(localStorage.getItem("userid"))
          )
        );
      }
    };

    if (searchFilter || filter) getUsers();
    else getUsersPaginated();

    return () => setUsers([]);
  }, [offset, filter, searchFilter]);

  // Popote profile
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
          searchFilter={searchFilter}
          setFilter={setFilter}
          setSearchFilter={setSearchFilter}
        />
        <div className="separatePopotes"></div>
        <div className="prevNextButtons">
          {!filter && !searchFilter && offset - limit >= 0 ? (
            <div
              className="prevButton"
              onClick={() => setOffset(offset - limit)}
            >
              Précédents
            </div>
          ) : (
            <div></div>
          )}
          {!filter && !searchFilter && offset + limit < totalPage ? (
            <div
              className="nextButton"
              onClick={() => setOffset(offset + limit)}
            >
              Suivants
            </div>
          ) : (
            <div></div>
          )}
        </div>
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
        <div className="prevNextButtons">
          {!filter && !searchFilter && offset - limit >= 0 ? (
            <div
              className="prevButton"
              onClick={() => setOffset(offset - limit)}
            >
              Précédents
            </div>
          ) : (
            <div></div>
          )}
          {!filter && !searchFilter && offset + limit < totalPage ? (
            <div
              className="nextButton"
              onClick={() => setOffset(offset + limit)}
            >
              Suivants
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </main>
    </div>
  );
};
