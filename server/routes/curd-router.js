const express = require("express");

const UserCtrl = require("../controllers/user-curd-ctrl");

const router = express.Router();

const auth = require("../middleware/auth");

router.post("/user", UserCtrl.createUser);
router.put("/user/:id", UserCtrl.updateUser);
router.delete("/user/:id", UserCtrl.deleteUser);
router.get("/user/:id", UserCtrl.getUserById);
router.post("/users/:id", UserCtrl.getUser);
router.post("/userSignIn",auth.isEmail,auth.token  ,UserCtrl.userSignIn);

module.exports = router;
