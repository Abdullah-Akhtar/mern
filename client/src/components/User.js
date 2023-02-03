import React, { useState, useEffect } from "react";
import api from "../api";
import "../App.css";

function FindUser() {
  const [temp, setTemp] = useState([]);
  async function findUsers(evt) {
    await api.getAllUser().then((users) => {
      console.log(users.data.data);
      setTemp(users.data.data);
    });
  }
  // }findUsers();
  async function removeUser(evt) {
    console.log(evt);
    await api.deleteUserById(evt);
    window.location.reload();
  }

  useEffect(() => {
    findUsers();
  }, []);
  return (
    <>
      <div className="container mt-5">
        <div className="row">
          <div className="col">
            <table className="table">
              <thead>
                <tr>
                  <th className="col">Name</th>
                  <th className="col">Email</th>
                  <th className="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {temp.map((users) => (
                  <tr key={users._id}>
                    <td className="col">{users.name}</td>
                    <td className="col">{users.email}</td>
                    <td className="col">
                      <button>Edit</button>
                    </td>
                    <td className="col">
                      <button onClick={(e) => removeUser(users._id)}>
                        Remove
                      </button>
                    </td>
                    <td />
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
export default FindUser;
