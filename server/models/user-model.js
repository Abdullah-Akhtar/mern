const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const User = new Schema(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      lowercase: true,
      unique: true,
      required: [true, "can't be blank"],
      match: [/\S+@\S+\.\S+/, "is invalid"],
      index: true,
    },
    password: { type: String, required: true },
  },
  { timestamps: true }
);
User.methods.setPassword = async function (password) {
  this.password = bcrypt.hashSync(password, 10);
};
module.exports = mongoose.model("User", User);
