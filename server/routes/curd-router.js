const express = require("express");

const UserCtrl = require("../controllers/curd-ctrl");

const router = express.Router();

const auth = require("../middleware/auth");

router.post("/user", UserCtrl.createUser);
router.put("/user/:id", UserCtrl.updateUser);
router.delete("/user/:id", UserCtrl.deleteUser);
router.get("/user/:id", UserCtrl.getUserById);
router.get("/users", UserCtrl.getUser);
router.post("/user",  UserCtrl.userSignIn);

module.exports = router;
