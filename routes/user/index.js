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

router.get("/",authorization, getAlluser);
router.get("/:id",authorization, getUserById);
router.post("/register", register);
router.delete("/delete/:id", deleteUserById);
router.post("/login", login);

module.exports = router;
