import React, { useState, useEffect } from "react";
import api from "../../api";
import "../../App.css";
// import { useNavigate } from "react-router-dom";

function FindUser() {
  const [temp, setTemp] = useState([]);
  // const [btnShow, setBtnShow] = useState(false);
  // const navigate = useNavigate();

  // const [authenticated, setauthenticated] = useState();
  const id = localStorage.getItem("my-key");
  function SignInHandleChange(evt) {
    const value = evt.target.value;
    setTemp({
      ...temp,
      [evt.target.name]: value,
    });
  }
  async function SignInHandleIncludeUser(evt) {
    const value = evt.target.value;
    setTemp({
      ...temp,
      [evt.target.name]: value,
      id:localStorage.getItem("my-key")
    });
    await api.addBook(temp).then((res) => {
      window.alert(res.data.data);
      const textForStorage = res.data.data;
      localStorage.setItem("my-key", textForStorage);
      setTemp({
        email: "",
        password: "",
      });
      // window.location.reload();
      // navigate("/FindUser");
    });
  }
  // //Find All User
  // async function findUsers(evt) {
    // setBtnShow(true);
  //   const id = localStorage.getItem("my-key");
  //   await api.search
  //     .then((users) => {
  //       console.log(users.data.data);
  //       setauthenticated(true);
  //       setTemp(users.data.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }
  // }findUsers();
  // async function removeUser(evt) {
  //   console.log(evt);
  //   await api.deleteUserById(evt);
  //   window.location.reload();
  // }
  // async function logOut() {
  //   localStorage.removeItem("my-key");
  //   window.location.reload();
  // }
  // useEffect(() => {
  //   if (localStorage.getItem("my-key")) {
  //     // findUsers();
  //   } else {
  //     navigate("/SignIn");
  //   }
  // }, []);
  return (
    <>
      <div className="container mt-5">

        {/* {temp?.id} */}
        <div className="row">
          <div className="col-6">
            <h1 className="form-label">Add New Book</h1>
            <input
              className="form-control mt-2"
              id="title"
              type="text"
              placeholder="Title"
              name="title"
              value={temp.title}
              onChange={SignInHandleChange}
            />
            <input
              id="auther"
              className="form-control mt-2"
              type="text"
              placeholder="Auther"
              name="auther"
              value={temp.auther}
              onChange={SignInHandleChange}
            />
            <input
              id="price"
              className="form-control mt-2"
              type="text"
              placeholder="Price"
              name="price"
              value={temp.price}
              onChange={SignInHandleChange}
            />
            <input
              id="quantity"
              className="form-control mt-2"
              type="number"
              placeholder="Quantity"
              name="quantity"
              value={temp.number}
              onChange={SignInHandleChange}
            />
            <button
              className="btn btn-primary mt-3"
              onClick={(e) => SignInHandleIncludeUser(e)}
            >
              Add Book
            </button>
          </div>
          {/* <div className="col">
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
            {btnShow && (
              <button
                className="btn btn-danger"
                onClick={(e) => {
                  logOut();
                }}
              >
                Log Out
              </button>
            )}
          </div> */}
        </div>
      </div>
    </>
  );
}
export default FindUser;
