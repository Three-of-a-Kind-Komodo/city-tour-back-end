require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../../models/user");

module.exports = {
  // ================================ getAlluser ===============================

  getAlluser: (req, res) => {
    try {
      User.find()
        .then(result =>
          res.send({
            message: "All user",
            result
          })
        )
        .catch(error =>
          res.send({
            message: "error when get all user",
            error: error.stack
          })
        );
    } catch (error) {}
  },

  // ================================ getUserById ===============================
  getUserById: (req, res) => {
    try {
      User.findById({ _id: req.params.id })
        .then(result =>
          res.send({
            message: "Your user with ID",
            result
          })
        )
        .catch(error =>
          res.send({
            message: "error when get user by ID",
            error: error.stack
          })
        );
    } catch (error) {
      return res.status(500).json({
        message: "error in getUserById route",
        error: error.message
      });
    }
  },

  // ================================ register =================================
  register: (req, res) => {
    try {
      User.create(req.body)
        .then(result =>
          res.send({
            message: "User created, Please Login and enjoy this website",
            result
          })
        )
        .catch(error =>
          res.send({
            message: "User failed to create, Please check your input",
            error: error.stack
          })
        );
    } catch (error) {
      return res.status(500).json({
        message: "error in register route",
        error: error.message
      });
    }
  },

  // ================================ deleteUser ===============================
  deleteUser: (req, res) => {
    try {
      User.findOneAndDelete({ _id: req.params.id }, { rawResult: false })
        .then(result =>
          res.send({
            message: "User deleted",
            result
          })
        )
        .catch(error =>
          res.send({ message: "failed to delete User", error: error.stack })
        );
    } catch (error) {
      return res.status(500).json({
        message: "error in deleteUser route",
        error: error.message
      });
    }
  },

  // ================================ login ====================================
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const existedUser = await user.findOne({ where: { email } });

      if (existedUser) {
        const valid = bcrypt.compareSync(password, existedUser.password);

        if (valid) {
          jwt.sign(
            {
              user: {
                id: existedUser.id,
                name: existedUser.name,
                email: existedUser.email
              }
            },
            process.env.JWT_SECRET,
            { algorithm: "HS256" },
            function(err, token) {
              return res.status(200).send({
                message: "proceed to explore !",
                token
              });
            }
          );
        } else {
          return res.status(400).send("Password Invalid");
        }
      } else {
        return res
          .status(400)
          .send(`User with that email doesn't exist, please Register first`);
      }
    } catch (error) {
      return res.status(500).json({
        message: "error in deleteUser route",
        error: error.message
      });
    }
  }
};
