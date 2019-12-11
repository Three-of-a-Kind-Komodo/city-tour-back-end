var express = require("express");
var router = express.Router();

const {
  getAlluser,
  getUserById,
  register,
  deleteUserById,
  login
} = require("./controller");

const { authorization } = require("../../helpers/auth");

// for testing without authorization
router.get("/", getAlluser);
router.get("/:id", getUserById);
router.delete("/delete/:id", deleteUserById);

// // with authorization
// router.get("/", authorization, getAlluser);
// router.get("/:id", authorization, getUserById);
// router.delete("/delete/:id", authorization, deleteUserById);
router.post("/register", register);
router.post("/login", login);

module.exports = router;
