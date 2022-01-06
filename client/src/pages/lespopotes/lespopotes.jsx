import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Host } from "../../assets/utils/host";
import { Popotesitem } from "../../components/popotesitem";

export const Lespopotes = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  // Load data when mounting
  useEffect(() => {
    let isSubscribed = true;

    axios.get(`${Host}api/users`).then((res) => {
      if (isSubscribed) setUsers(res.data);
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
  return (
    <div className="headerContainer">
      <h1 className="title lespopotes" onClick={() => navigate("/lespopotes")}>
        Les Popotes
      </h1>
      <div className="searchPopotes">
        <div className="searchIcon" />
        <input type="text" className="searchBar" />
      </div>
      <div className="separatePopotes"></div>
      <div className="itemsContainer">
        {users.map((user, index) => {
          return <Popotesitem user={user} key={index}/>;
        })}
      </div>
    </div>
  );
};
