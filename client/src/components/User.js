import React, { useState, useEffect } from "react";
import api from "../api";
import "../App.css";

function FindUser() {
  const [temp, setTemp] = useState([]);
  const [btnShow, setBtnShow] = useState(false)
  async function findUsers(evt) {
    setBtnShow(true)
    const id = localStorage.getItem('my-key');
    await api.getAllUser(id).then((users) => {
      console.log(users.data.data);
      setTemp(users.data.data);
    }).catch((err)=>{
      console.log(err)
    });
  }
  // }findUsers();
  async function removeUser(evt) {
    console.log(evt);
    await api.deleteUserById(evt);
    window.location.reload();
  }
  async function logOut(){
    localStorage.removeItem('my-key');
    window.location.reload();
  }
  useEffect(() => {
    if(localStorage.getItem('my-key')){
      findUsers();
    }
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
           {btnShow && <button className="btn btn-danger"  onClick={(e)=>{logOut()}}>Log Out</button>}
          </div>
        </div>
      </div>
    </>
  );
}
export default FindUser;
