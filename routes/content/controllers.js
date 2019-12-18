require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Content = require("../../models/content");
const User = require("../../models/user");

module.exports = {
  // ================================ getAllContent ============================================
  getAllContent: (req, res) => {
    try {
      Content.find()
        .populate("user")
        .populate("review")
        .then(result => {
          console.log(result);
          res.send({
            message: "All Content",
            result
          });
        })
        .catch(error =>
          res.send({
            message: "error when get All Content",
            error: error.stack
          })
        );
    } catch (error) {
      return res.status(500).json({
        message: "error in getAlluser route",
        error: error.message
      });
    }
  },

  // ================================   getAllContentQuery =====================================
  getContentById: (req, res) => {
    try {
      Content.findById({ _id: req.params.id })
        .populate("review")
        .then(result =>
          res.send({
            message: "Your content with ID",
            result
          })
        )
        .catch(error =>
          res.send({
            message: "error when get content by ID",
            error: error.stack
          })
        );
    } catch (error) {
      return res.status(500).json({
        message: "error in getContentById route",
        error: error.message
      });
    }
  },

  // ================================ addContent ===============================================

  addContent: async (req, res) => {
    const {
      type,
      title,
      content,
      imageurl,
      mapurl,
      rating,
      isactive,
      user
    } = req.body;

    try {
      const newContent = await Content.create({
        type,
        title,
        content,
        imageurl,
        mapurl,
        rating,
        isactive,
        user: req.params.id
      });
      if (newContent) {
        const user = await User.findByIdAndUpdate(
          { _id: req.params.id },
          { $push: { contents: newContent._id } },
          { new: true }
        );
        return res.status(201).json({
          message: `Content created, ${user.name} now have content with id ${newContent._id}`
        });
      }
    } catch (error) {
      res.status(500).json({
        message: "addContent failed",
        error: error.message
      });
    }
  },
  // ================================ updateContentById ========================================
  updateContentById: (req, res) => {},

  // ================================ deleteContentById ========================================
  deleteContentById: (req, res) => {}
};
