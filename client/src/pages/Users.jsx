import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import instance from "../services/configAxios";

const Users = () => {
  const [dataUser, setDataUser] = useState(null);
  const getUsers = async () => {
    try {
      const users = (await instance.get("user/getlists")).data;

      if (users && users.message === "success") {
        setDataUser(users.data);
        return users;
      }
      setDataUser(users.message);
      return users.message;
    } catch (error) {
      // console.log(error.message);
      setDataUser(error.message);
      return error;
    }
  };

  return (
    <>
      <h1>Users</h1>
      <button onClick={getUsers}>Get users</button>
      <div>
        {dataUser === null ? (
          ""
        ) : dataUser === "You don't have permission" ? (
          "You don't have permission"
        ) : dataUser === "jwt expired" ? (
          <Navigate to="/" replace={true} />
        ) : (
          dataUser.map((data, i) => (
            <div key={i}>
              <h2>
                {data.username} -- {data.position} -- {data.email}
              </h2>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default Users;
