import React from "react";
// import UserCreated from './components/createUser'
import UserCreated from "./components/UserCreated";

import "bootstrap/dist/css/bootstrap.min.css";
import FindUser from "./components/User";
import DeleteUser from "./components/UserDelete";
import GetAllUser from "./components/GetAllUser";

function App() {
  return (
    <>
      <UserCreated />
      <FindUser />
    </>
  );
}

export default App;
