import React, { useState } from "react";
import api from "../api";
import "../App.css";

function GetAllUser() {
  return (
    <>
      <div className="main-div">
        <div>
          <h1>Users :</h1>
          <table>
            <tr><th>Name</th>
            <th>Email</th>
            </tr>
            <tr>
                <td>Abdullah</td>
                <td>Abdullah@gmail.com</td>
            </tr>
          </table>
        </div>
      </div>
    </>
  );
}
export default GetAllUser;