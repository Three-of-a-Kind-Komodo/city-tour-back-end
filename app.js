var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var bodyParser = require("body-parser");
var cors = require("cors");
const nodemailer = require("nodemailer");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/user");
var contentsRouter = require("./routes/content");

var app = express();

app.use(cors());
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/contents", contentsRouter);

app.post("/contacts", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    let autoReply = nodemailer.createTransport({
      service: "gmail",
      secure: false,
      auth: {
        user: "3ofakindkomodo@gmail.com",
        pass: "3ofakind"
      }
    });

    let emailToAdmin = nodemailer.createTransport({
      service: "gmail",
      secure: false,
      auth: {
        user: "3ofakindkomodo@gmail.com",
        pass: "3ofakind"
      }
    });

    let mailoptions = {
      from: "3ofakindkomodo@gmail.com",
      to: email,
      subject: "Thank you for contacting us",
      text:
        "Thank you for reaching us, we will take time respond to your query, in the meantime please check out the updates from www.blusukan.netlify.com"
    };

    let mailoptions2 = {
      from: "3ofakindkomodo@gmail.com",
      to: email,
      subject: "Query from" + name,
      text:
        message
    };
    // let message = {
    //   from: " 'Admin 👻' <3ofakindkomodo@gmail.com>",
    //   to: "farisibrahmi@gmail.com",
    //   subject: "Order Confirmation",
    //   text: "Thank you, the booking has been booked, please pay later",
    //   html: "<h1>Thank you, the booking has been booked, please pay later</h1>"
    // };

    await autoReply.sendMail(mailoptions, err => {
      if (!err) {
        res.send({
          message: "Email send"
        });
      } else {
        res.status(400).send({
          message: "send email fail"
        });
      }
    });
  } catch (error) {
    res.status(400).send({
      message: "something error when send email",
      error: error.message
    });
  }
});

await emailToAdmin.sendMail(mailoptions, err => {
  if (!err) {
    res.send({
      message: "Email send"
    });
  } else {
    res.status(400).send({
      message: "send email fail"
    });
  }
});
} catch (error) {
res.status(400).send({
  message: "something error when send email",
  error: error.message
});
}
});

module.exports = app;
