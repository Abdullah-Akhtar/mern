const Users = require("../models/user-model");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

// async function isEmail(req, res, next) {
const isEmail = (req, res, next) => {
  Users.findOne({ email: req.body.email }, (err, data) => {
    if (err) {
      return res.status(400).send(err);
    } else if (!data) {
      return res.status(444).send("Email Does not Exists");
    }
    if (bcrypt.compareSync(req.body.password, data.password) === false) {
      return res.status(444).send("Password Does not Match");
    } else next();
  });
};

const gettoken = (req) => {
  if (
    (req.headers.authorization &&
      req.headers.authorization.split(" ")[0] === "Token") ||
    (req.headers.authorization &&
      req.headers.authorization.split(" ")[0] === "Bearer")
  ) {
    return req.headers.authorization.split(" ")[1];
  }

  return null;
};
const isToken = (req, res, next) => {
  var jwt = require("jsonwebtoken");
  var token = jwt.sign({ foo: req.body.email }, "abcdf");
  req.token = token;
  next();
};
const token = (req, res, next) => {
  if (
    req.params.id === "null" ||
    req.params.id === undefined ||
    !req.params.id
  ) {
    return res.status(404).json({
      message: "User not updated!",
    });
  } else {
    const token = req.params.id;
    var jwt = require("jsonwebtoken");
    var decoded = jwt.verify(token, "abcdf");
    Users.findOne({ email: decoded.foo }, (err, data) => {
      if (err) return res.status(302).send(err);
      if (!data) return res.status(444).send("You are not Valid User");
      req.user = data;
      next();
    });
  }
};

const isAdmin = (req, res, next) => {
  console.log(req.body);
  var jwt = require("jsonwebtoken");
  let token = req.body.id;
  var decoded = jwt.verify(token, "abcdf");
  Users.findOne({ email: decoded.foo }, (err, data) => {
    if (err) return res.status(302).send(err);
    if (data.role !== 1) return res.status(444).send("You are not an Admin");
    next();
  });
};

//Checking admin for removing book
const isAdminRe = (req, res, next) => {
  console.log(req.body);
  console.log("Token" + req.body.token);
  console.log("evt" + req.body.evt);
  var jwt = require("jsonwebtoken");
  let token = req.body.id;
  var decoded = jwt.verify(token, "abcdf");
  Users.findOne({ email: decoded.foo }, (err, data) => {
    if (err) return res.status(302).send(err);
    if (data.role !== 1) return res.status(444).send("You are not an Admin");
    next();
  });
};
const isLogin = (req, res, next) => {
  let token = gettoken(req);
  if (!token) res.send("Please Sign In");
  var decoded = jwt.verify(token, "abcdf");
  Users.findOne({ email: decoded.foo }, (err, data) => {
    if (err) return res.status(302).send(err);
    if (!data) return res.status(444).send("You are not Valid User");
    req.user = data;
    next();
  });
};

module.exports = { isEmail, isToken, token, isAdminRe, isAdmin, isLogin };
