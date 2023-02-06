import React, { useState } from "react";
import api from "../../api";
import "../../App.css";
import { Link } from "react-router-dom";

function SignUp() {
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
      window.alert("User inserted successful");
      setTemp({
        name: "",
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
          <h3>
            want to <Link to="/SignIn">Sign In ?</Link>
          </h3>
        </div>
      </div>
    </div>
  );
}
export default SignUp;
