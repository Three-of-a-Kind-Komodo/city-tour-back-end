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
  getAllContentQuery: (req, res) => {},

  // ================================ addContent ===============================================

  addContent: (req, res) => {
    const { type, title, content, imageurl, rating, isactive, user } = req.body;

    Content.create(req.body)
      .then(result => {
        User.findOne({ _id: user }, (err, user) => {
          if (User) {
            // The below two lines will add the newly saved review's
            // ObjectID to the the User's reviews array field
            User.contents.push(Content._id);
            User.save();
            res.json({ message: "Content created!" });
          }
        });
      })
      .catch(error => {
        res.status(500).json({ error });
      });
  },
  // ================================ updateContentById ========================================
  updateContentById: (req, res) => {},

  // ================================ deleteContentById ========================================
  deleteContentById: (req, res) => {}
};
