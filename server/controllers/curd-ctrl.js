const User = require("../models/user-model");
const auth = require("../middleware/auth");
var jwt = require("jsonwebtoken");

createUser = (req, res) => {
  const body = req.body;

  if (!body) {
    return res.status(400).json({
      success: false,
      error: "You must provide a user",
    });
  }

  const user = new User(body);
  user.setPassword(body.password);
  if (!user) {
    return res.status(400).json({ success: false, error: err });
  }

  user
    .save()
    .then(() => {
      return res.status(201).json({
        success: true,
        id: user._id,
        message: "user created!",
      });
    })
    .catch((error) => {
      return res.status(400).json({
        error,
        message: "user not created!",
      });
    });
};

updateUser = async (req, res) => {
  const body = req.body;

  if (!body) {
    return res.status(400).json({
      success: false,
      error: "You must provide a body to update",
    });
  }

  User.findOne({ _id: req.params.id }, (err, user) => {
    if (err) {
      return res.status(404).json({
        err,
        message: "User not found!",
      });
    }
    user.name = body.name ? body.name : user.name;
    user.email = body.email ? body.email : user.email;
    user.password = body.password ? body.password : user.password;
    user
      .save()
      .then(() => {
        return res.status(200).json({
          success: true,
          id: user._id,
          message: "User updated!",
        });
      })
      .catch((error) => {
        return res.status(404).json({
          error,
          message: "User not updated!",
        });
      });
  });
};

deleteUser = async (req, res) => {
  await User.findOneAndDelete({ _id: req.params.id }, (err, user) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }

    if (!user) {
      return res.status(404).json({ success: false, error: `User not found` });
    }

    return res.status(200).json({ success: true, data: user });
  }).catch((err) => console.log(err));
};

getUserById = async (req, res) => {
  res.send("User Find  by id");
  await User.findOne({ _id: req.params.id }, (err, user) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }

    return res.status(200).json({ success: true, data: user });
  }).catch((err) => console.log(err));
};
// const gettoken = (id) => {
//   console.log(id)
//   if (
//     (id && id.split(" ")[0] === "Token") ||
//     (id && id.split(" ")[0] === "Bearer")
//   ) {
//     return id.split(" ")[1];
//   }

//   return 'FazySting';
// };
getUser = async (req, res) => {
  console.log(req.params.id)
  // let token =  gettoken(req.params.id);
  let token =  req.params.id;
  if (!token) res.send("Please Sign In");
  var decoded = jwt.verify(token, "abcdf");
  User.findOne({ email: decoded.foo }, async (err, data) => {
    if (err) return res.status(302).send(err);
    if (!data) return res.status(444).send("You are not Valid User");
    req.user = data;
    console.log(req.user)
    await User.find({}, (err, users) => {
      if (err) {
        return res.status(400).json({ success: false, error: err });
      }
      if (!users.length) {
        return res
          .status(404)
          .json({ success: false, error: `user not found` });
      }
      return res.status(200).json({ success: true, data: users });
    }).catch((err) => console.log(err));
  });
  // await User.find({}, (err, users) => {
  //   if (err) {
  //     return res.status(400).json({ success: false, error: err });
  //   }
  //   if (!users.length) {
  //     return res.status(404).json({ success: false, error: `user not found` });
  //   }
  //   return res.status(200).json({ success: true, data: users });
  // }).catch((err) => console.log(err));
};

userSignIn = async (req, res) => {
  return res.status(200).json({ success: true, data: req.token });
};

module.exports = {
  createUser,
  updateUser,
  deleteUser,
  getUser,
  getUserById,
  userSignIn,
};
