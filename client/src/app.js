import React from "react";
// import UserCreated from './components/createUser'
import UserCreated from "./components/UserCreated";

import "bootstrap/dist/css/bootstrap.min.css";
import FindUser from "./components/User";

function App() {
  return (
    <>
      <UserCreated />
      <FindUser />
    </>
  );
}

export default App;
