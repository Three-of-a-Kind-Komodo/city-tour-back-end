var express = require("express");
var router = express.Router();

const {
  getAllReview,
  getAllReviewByContentId,
  getAllReviewByUserId,
  addReview,
  updateReviewById
} = require("./controller");

const { authorization } = require("../../helpers/auth");

// for testing without authorization
router.get("/", getAllReview);
router.get("/content/:id", getAllReviewByContentId);
router.get("/user/:id", getAllReviewByUserId);
router.post("/", addReview);
router.put("/", updateReviewById);

module.exports = router;
