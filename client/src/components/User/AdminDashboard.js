import React, { useState, useEffect } from "react";
import api from "../../api";
import "../../App.css";
import { useNavigate } from "react-router-dom";

function BooksManagement() {
  const [temp, setTemp] = useState([]);
  const [isAdmin, setisAdmin] = useState(false);
  const [token, setToken] = useState();
  const [BookList, setBookList] = useState([]);
  const [btnShow, setBtnShow] = useState(false);
  const [user, setUser] = useState();

  const navigate = useNavigate();

  /////////////////////////////////////////////
  ///////Checking if User Login or Not////////
  ///////////////////////////////////////////
  async function isUser() {
    if (localStorage.getItem("my-key")) {
      const id = localStorage.getItem("my-key");
      await api
        .userToken(id)
        .then((result) => {
          if (result.data.data === "admin") {
            setisAdmin(true);
            setBtnShow(true);
            setToken(id);
            findBook();
          } else if (result.data.data === true) {
            setUser(true);
            setBtnShow(true);
            findBook();
          } else {
            navigate("/SignIn");
          }
        })
        .catch((err) => {
          console.log(err);
          navigate("/SignIn");
        });
    } else {
      navigate("/SignIn");
    }
  }

  /////////////////////////////////////////////
  /////////State Setup////////////////////////
  ///////////////////////////////////////////
  function SignInHandleChange(evt) {
    const value = evt.target.value;
    setTemp({
      ...temp,
      [evt.target.name]: value,
    });
  }

  /////////////////////////////////////////////
  /////////Add new Book////////////////////////
  ///////////////////////////////////////////
  async function SignInHandleIncludeUser(evt) {
    const value = evt.target.value;
    await api
      .addBook({
        ...temp,
        [evt.target.name]: value,
        id: token,
      })
      .then((res) => {
        window.location.reload();
      });
  }

  /////////////////////////////////////////////
  /////////Get All Books//////////////////////
  ///////////////////////////////////////////
  async function findBook(evt) {
    await api
      .searchAll()
      .then((name) => {
        setBookList(name.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  /////////////////////////////////////////////
  /////////Remove one Book////////////////////
  ///////////////////////////////////////////
  async function removeUser(evt) {
    console.log(evt);
    await api.remBook();
    window.location.reload();
  }

  /////////////////////////////////////////////
  /////////Logout User////////////////////////
  ///////////////////////////////////////////
  async function logOut() {
    localStorage.removeItem("my-key");
    window.location.reload();
  }

  /////////////////////////////////////////////
  /////////Startup Function///////////////////
  ///////////////////////////////////////////
  useEffect(() => {
    isUser();
  }, []);

  /////////////////////////////////////////////
  /////////Main Function Start////////////////
  ///////////////////////////////////////////
  return (
    <>
      {/* Main Div */}
      <div className="container mt-5">
        <div className="row">
          {/* Logout Button */}
          <div className="col-12">
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
          </div>
          {/* Add New Book Form */}
          {isAdmin && (
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
              {token && (
                <button
                  className="btn btn-primary mt-3"
                  onClick={(e) => SignInHandleIncludeUser(e)}
                >
                  Add Book
                </button>
              )}
            </div>
          )}

          {/* Display All books in Table */}
          <div className="col-12">
            <table className="table">
              <thead>
                <tr>
                  <th className="col">Title</th>
                  <th className="col">Aurther</th>
                  <th className="col">Price</th>
                  <th className="col">Quantity</th>
                  {user && <th className="col">Add to Cart</th>}
                  {isAdmin && <th className="col">Edit</th>}
                  {isAdmin && <th className="col">Delete</th>}
                </tr>
              </thead>
              <tbody>
                {BookList.map((books) => (
                  <tr key={books._id}>
                    <td className="col">{books.title}</td>
                    <td className="col">{books.auther}</td>
                    <td className="col">{books.price}</td>
                    <td className="col">{books.quantity}</td>
                    {isAdmin && (
                      <td className="col">
                        <button className="btn btn-primary">+</button>
                      </td>
                    )}
                    {isAdmin && (
                      <td className="col">
                        <button
                          className="btn btn-danger"
                          onClick={(e) => removeUser(books._id)}
                        >
                          X
                        </button>
                      </td>
                    )}
                    {user && (
                      <td className="col">
                        <button className="btn btn-primary">+</button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
export default BooksManagement;
