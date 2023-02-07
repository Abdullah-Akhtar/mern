import React, { useState } from "react";
import api from "../../api";
import "../../App.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function SignIn() {
  const [tempSign, setTempSign] = useState({});
  const navigate = useNavigate();

  ////////////////////////////////////////
  ////////////Sign In State//////////////
  //////////////////////////////////////
  function SignInHandleChange(evt) {
    const value = evt.target.value;
    setTempSign({
      ...tempSign,
      [evt.target.name]: value,
    });
  }

  ////////////////////////////////////////
  /////////Sign In Api sending///////////
  //////////////////////////////////////
  async function SignInHandleIncludeUser(evt) {
    const value = evt.target.value;
    setTempSign({
      ...tempSign,
      [evt.target.name]: value,
    });
    await api.userSignIn(tempSign).then((res) => {
      window.alert(res.data.data);
      const textForStorage = res.data.data;
      localStorage.setItem("my-key", textForStorage);
      setTempSign({
        email: "",
        password: "",
      });
      // window.location.reload();
      navigate("/admin");
    });
  }

  ////////////////////////////////////////
  ////////////Main Fucntion//////////////
  //////////////////////////////////////
  return (
    <div className="container mt-5">
      <div className="row">
        {/* ////////////////////////////////////////
        ////////////Sign In////////////////////////
        ///////////////////////////./////////// */}
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
          <h3>
            want to <Link to="/SignUp">Sign Up ?</Link>
          </h3>
        </div>
      </div>
    </div>
  );
}
export default SignIn;
