var express = require("express");
var router = express.Router();

const {
  getAlluser,
  getUserById,
  register,
  deleteUserById,
  login
} = require("./controller");

router.get("/", getAlluser);
router.get("/:id", getUserById);
router.post("/register", register);
router.delete("/delete/:id", deleteUserById);
router.post("/login", login);

module.exports = router;
