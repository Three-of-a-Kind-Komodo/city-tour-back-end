var express = require("express");
var router = express.Router();

const {
  getAllContent,
  addContent,
  updateContentById,
  deleteContentById
} = require("./controllers");

const { authorization } = require("../../helpers/auth");

// for testing without authorization
router.get("/", getAllContent);
router.post("/:id", addContent);
router.put("/:id", updateContentById);
router.delete("/", deleteContentById);

// // with authorization

module.exports = router;
