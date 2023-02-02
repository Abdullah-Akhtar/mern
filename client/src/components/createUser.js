import React, { useState } from "react";
import api from "../api";
import '../App.css';

function UserCreated() {
  const [temp, setTemp] = useState({});

  function handleChange(evt) {
    const value = evt.target.value;
    setTemp({
      ...temp,
      [evt.target.name]: value,
    });
  }
  async function handleIncludeUser(evt) {
    const value = evt.target.value;
    setTemp({
      ...temp,
      [evt.target.name]: value,
    });
    await api.insertUser(temp).then((res) => {
      window.alert(`User inserted successfully`);
      setTemp({
        name: "",
        email: "",
        password: "",
      });
    });
  }

  return (
    <div className="main-div">
      <div>
        <h1>Create User</h1>
        <input
          id="name"
          className="form-field"
          type="text"
          placeholder="Full Name"
          name="name"
          value={temp.name}
          onChange={handleChange}
        />
        <br></br>
        <input
          id="email"
          className="form-field"
          type="text"
          placeholder="Email"
          name="email"
          value={temp.email}
          onChange={handleChange}
        />
        <br></br>
        <input
          id="password"
          className="form-field"
          type="password"
          placeholder="Password"
          name="password"
          value={temp.password}
          onChange={handleChange}
        />
        <br></br>
        <button onClick={(e) => handleIncludeUser(e)}>Add User</button>
      </div>
    </div>
  );
}

export default UserCreated;
