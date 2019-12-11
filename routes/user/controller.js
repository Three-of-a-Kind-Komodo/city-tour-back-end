require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../../models/user");

module.exports = {
  // ================================ getAlluser ===============================

  getAlluser: (req, res) => {
    try {
      User.find()
        .populate("content")
        .populate("review")
        .then(result => {
          console.log(result);
          res.send({
            message: "All user",
            result
          });
        })
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
        .populate("content")
        .populate("review")
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
  register: async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(409).send({
        message: `body can't be empty`,
        error: error.message
      });
    }

    const existedUser = await User.findOne({ where: { email } });

    if (existedUser) {
      return res.status(409).send({
        message: `User: ${existedUser.name} already existed, please login`
      });
    } else {
      bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(password, salt, function(err, hash) {
          if (!err) {
            User.create({ name, email, password: hash })
              .then(result => {
                return res.status(201).send({
                  message: `User created`,
                  result
                });
              })
              .catch(error => {
                return res.status(400).send({
                  message: `User not created`,
                  error: error.message
                });
              });
          } else {
            return res.status(409).send({
              message: `hashing password failed`,
              error: error.message
            });
          }
        });
      });
    }
  },

  // ================================ deleteUser ===============================
  deleteUserById: (req, res) => {
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
      const existedUser = await User.findOne({ email });
      console.log(existedUser.email);
      if (existedUser) {
        const valid = await bcrypt.compareSync(password, existedUser.password);

        if (valid) {
          jwt.sign(
            {
              user: {
                _id: existedUser._id,
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
        message: "error in login route",
        error: error.stack
      });
    }
  }
};
