import React, { useState, useEffect } from "react";
import api from "../../api";
import "../../App.css";
import { useNavigate } from "react-router-dom";

function BooksManagement() {
  const [temp, setTemp] = useState([]);
  const [BookList, setBookList] = useState([]);
  const [btnShow, setBtnShow] = useState(false);
  const [authenticated, setauthenticated] = useState();

  const navigate = useNavigate();

  async function isUser() {
    if (localStorage.getItem("my-key")) {
      const id = localStorage.getItem("my-key");
      await api
        .userToken(id)
        .then((result) => {
          if (result.data.data === true) {
            setauthenticated(true);
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
      id: localStorage.getItem("my-key"),
    });
    await api.addBook(temp).then((res) => {
      window.alert(res.message);
      setTemp({
        title: "",
        auther: "",
        price: "",
        quantity: "",
      });
      window.location.reload();
    });
  }

  async function findBook(evt) {
    await api
      .searchAll()
      .then((name) => {
        setauthenticated(true);
        setBookList(name.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  async function removeUser(evt) {
    console.log(evt);
    await api.remBook(evt);
    window.location.reload();
  }
  async function logOut() {
    localStorage.removeItem("my-key");
    window.location.reload();
  }
  useEffect(() => {
    isUser();
  }, []);
  return (
    <>
      <div className="container mt-5">
        <div>
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
          <div className="col-12">
            <table className="table">
              <thead>
                <tr>
                  <th className="col">Title</th>
                  <th className="col">Aurther</th>
                  <th className="col">Price</th>
                  <th className="col">Quantity</th>
                  <th className="col">Edit</th>
                  <th className="col">Delete</th>
                </tr>
              </thead>
              <tbody>
                {BookList.map((books) => (
                  <tr key={books._id}>
                    <td className="col">{books.title}</td>
                    <td className="col">{books.auther}</td>
                    <td className="col">{books.price}</td>
                    <td className="col">{books.quantity}</td>
                    <td className="col">
                      <button className="btn btn-primary">+</button>
                    </td>
                    <td className="col">
                      <button
                        className="btn btn-danger"
                        onClick={(e) => removeUser(books._id)}
                      >
                        X
                      </button>
                    </td>
                    <td />
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
