require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports = {
  authorization: (req, res, next) => {
    try {
      // get token from request
      if (!req.headers.authorization) return res.send("please add token");
      const token = req.headers.authorization.split(" ")[1];

      // verify token
      const tokenIsValid = jwt.verify(token, process.env.JWT_SECRET);
      console.log(tokenIsValid);

      // token validation proses
      if (tokenIsValid) return next();
      return res.send(`you are not valid to see this route`);
    } catch (error) {
      res.status(400).send({
        message: `you are not valid to see this route, provide token to access this API`,
        error: error.message
      });
    }
  }
};
