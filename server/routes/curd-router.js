const express = require("express");

const UserCtrl = require("../controllers/user-curd-ctrl");
const BookCtrl = require("../controllers/book-curd-ctrl");

const router = express.Router();

const auth = require("../middleware/auth");

router.post("/user", UserCtrl.createUser);
router.post("/userToken/:id", auth.token,UserCtrl.userToken);
router.put("/user/:id", UserCtrl.updateUser);
router.delete("/user/:id", UserCtrl.deleteUser);
router.get("/user/:id", UserCtrl.getUserById);
router.post("/users/:id", UserCtrl.getUser);
router.post("/userSignIn", auth.isEmail, auth.token, UserCtrl.userSignIn);
router.post("/book", auth.isAdmin, BookCtrl.addBook);
router.post("/book/:search", auth.isAdmin, BookCtrl.updatebook);
router.delete("/book", auth.isAdmin, BookCtrl.remBook);
router.get("/book", BookCtrl.search);
router.get("/bookSearch", BookCtrl.searchAll);

module.exports = router;
