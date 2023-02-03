import React, { useState } from "react";
import api from "../api";
import "../App.css";

function FindUser() {
  return (
    <>
      <div className="main-div">
        <div>
          <h1>Find a User</h1>
          <input placeholder="Enter user name" />
          <button>Submit</button>
        </div>
      </div>
    </>
  );
}
export default FindUser;
