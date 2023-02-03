import React, { useState } from "react";
import api from "../api";
import "../App.css";

function UserCreated() {
  const [temp, setTemp] = useState({});
  const [tempSign, setTempSign] = useState({});

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
      window.alert(
        "User inserted successful"
      );
      setTemp({
        name: "",
        email: "",
        password: "",
      });
    window.location.reload();
    });
  }

  function SignInHandleChange(evt) {
    const value = evt.target.value;
    setTempSign({
      ...tempSign,
      [evt.target.name]: value,
    });
  }
  async function SignInHandleIncludeUser(evt) {
    const value = evt.target.value;
    setTempSign({
      ...tempSign,
      [evt.target.name]: value,
    });
    console.log(tempSign);
    await api.userSignIn(tempSign).then((res) => {
      window.alert(res.data.data);
      const textForStorage = res.data.data;
      localStorage.setItem('my-key', textForStorage);
      setTempSign({
        email: "",
        password: "",
      });
    window.location.reload();
    });
  }
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-6">
          <h1 className="form-label">Create User</h1>
          <input
            className="form-control mt-2"
            id="name"
            type="text"
            placeholder="Full Name"
            name="name"
            value={temp.name}
            onChange={handleChange}
          />
          <input
            id="email"
            className="form-control mt-2"
            type="text"
            placeholder="Email"
            name="email"
            value={temp.email}
            onChange={handleChange}
          />
          <input
            id="password"
            className="form-control mt-2"
            type="password"
            placeholder="Password"
            name="password"
            value={temp.password}
            onChange={handleChange}
          />
          <button
            className="btn btn-primary mt-3"
            onClick={(e) => handleIncludeUser(e)}
          >
            Sign Up
          </button>
        </div>
        <div className="col-6">
          <h1 className="form-label">Sign IN</h1>
            <input
              className="form-control mt-2"
              id="validationCustom03"
              type="email"
              placeholder="Email"
              name="email"
              value={tempSign.email}
              onChange={SignInHandleChange}
            />
          <input
            id="password"
            className="form-control mt-2"
            type="password"
            placeholder="Password"
            name="password"
            value={tempSign.password}
            onChange={SignInHandleChange}
          />
          <button
            className="btn btn-primary mt-3"
            onClick={(e) => SignInHandleIncludeUser(e)}
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserCreated;
