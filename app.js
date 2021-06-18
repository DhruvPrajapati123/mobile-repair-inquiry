const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/contact", (req, res) => {
  res.render("contact");
});

app.get("/Submited", (req, res) => {
  res.render("Submited");
});

app.post("/contact", (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const message = req.body.message;

  let transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "dhruvpython12@gmail.com", // generated ethereal user
      pass: "Nilkanth@1", // generated ethereal password
    },
  });

  // send mail with defined transport object
  let mailOptions = {
    from: '"Dhruv Prajapati 👻" <dhruvpython12@gmail.com>', // sender address
    to: "dhruvprajapati8200@gmail.com", // list of receivers
    subject: "Website Submission ✔", // Subject line
    text:
      "You have a submission with the following details... Name: " +
      name +
      " Email: " +
      email +
      " Message: " +
      message, // plain text body
    html:
      "<b>You have a submission with the following details...</b><ul><li>Name: " +
      name +
      "</li><li>Email: " +
      email +
      "</li><li>Message: " +
      message +
      "</li></ul>", // html body
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err);
      res.redirect("/");
    } else {
      res.redirect("/Submited");
    }
  });
});

app.listen(3000, () => console.log("Server is running on port 3000"));
