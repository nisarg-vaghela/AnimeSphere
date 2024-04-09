import React, { useState, useEffect, useMemo } from "react";
import "./users.css";
import { getUsers } from "../services/userService";
import _ from "lodash";
import { Link } from "react-router-dom";
import Moment from "moment";
import CircularSpinner from "./circularSpinner";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [sortBy, setSortBy] = useState("name");
  const [order, setOrder] = useState("asc");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function fun() {
      setLoading(true);
      const { data } = await getUsers();
      try {
        let users = Object.values(data);
        users = _.orderBy(users, "name", "asc");
        setUsers(users);
        // console.log("users", data);
      } catch (err) {
        console.log(err);
      }
      setLoading(false);
    }
    fun();
  }, []);
  useMemo(() => {
    const sortedData = _.orderBy(users, sortBy, order);
    setUsers(sortedData);
  }, [sortBy, order]);

  const handleDateFormat = (date) => Moment(date).format("MMMM Do, YYYY"); //MMMM Do, YYYY, h:mm:ss a

  return (
    <>
      {loading ? (
        <CircularSpinner />
      ) : (
        <table className="table caption-top table-dark users-table">
          <caption style={{ textAlign: "center", fontSize: "2rem", color: "#8cdf97" }}>
            Leaderboard
          </caption>
          <thead>
            <tr>
              {[
                { property: "name", header: "Users" },
                { property: "register_date", header: "Date Joined" },
                { property: "watched", header: "No. of Anime's Watched" },
              ].map(({ property, header }) => (
                <th
                  key={property}
                  style={{
                    textAlign: `${property === "name" ? "left" : "center"}`,
                  }}
                >
                  <span
                    onClick={() => {
                      setOrder(order === "asc" ? "desc" : "asc");
                      setSortBy(property);
                    }}
                  >
                    {header}{" "}
                    <i
                      className={`fa fa-chevron-${
                        order === "asc" ? "down" : "up"
                      }${
                        sortBy !== property ? " users-table-transparent" : ""
                      }`}
                    />
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td style={{ textAlign: "left" }}>
                  <Link
                    to={`/users/${user._id}`}
                    style={{ paddingLeft: "30px" }}
                  >
                    <img
                      src={user.image}
                      alt={user.name}
                      className="user-img"
                      loading="lazy"
                    />{" "}
                    <span>{user.name}</span>
                  </Link>
                </td>
                <td>{handleDateFormat(user.register_date)}</td>
                <td>{user.watched}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default Users;
