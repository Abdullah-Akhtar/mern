import React, { useState } from "react";
import api from "../api";
import "../App.css";

function DeleteUser() {
  return (
    <>
      <div className="main-div">
        <div>
          <h1>Delete a User</h1>
          <input placeholder="Enter user name" />
          <button>Submit</button>
        </div>
      </div>
    </>
  );
}
export default DeleteUser;