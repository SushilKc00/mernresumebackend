const nodemailer = require("nodemailer");
const documents = require("../Models/Schema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const transport = nodemailer.createTransport({
  service: "gmail.com",
  // port: 587,
  // secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.USER,
    pass: process.env.PASS,
  },
});

class routeFunction {
  static signIn = async (req, res) => {
    const { name, gmail, password, confirmPassword, gender } = req.body;
    const data = await documents.findOne({ gmail: gmail });
    try {
      if (data) {
        res.send({ message: "sorry user already exist", success: false });
      } else {
        const hashPassword = await bcrypt.hash(password, 10);
        const cHashPassword = await bcrypt.hash(confirmPassword, 10);
        const doc = new documents({
          name,
          gmail,
          password: hashPassword,
          confirmPassword: cHashPassword,
          gender,
        });
        await documents.create(doc);
        res.send({ message: "Register Successfull", success: true });
      }
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  };

  static signUp = async (req, res) => {
    const { gmail, password } = req.body;
    try {
      const data = await documents.findOne({ gmail: gmail });
      if (data != null) {
        const isMatch = await bcrypt.compare(password, data.password);
        if (data.gmail === gmail && isMatch) {
          const token = await jwt.sign({ userId: data._id }, process.env.KEY);
          res.send({ message: "Login Successful", success: true, token });
        } else {
          res.send({ message: "invalid details", success: false });
        }
      } else {
        res.send({ message: "Invalid User" });
      }
    } catch (error) {
      res.status(401);
    }
  };

  static forgot = async (req, res) => {
    const { gmail } = req.body;
    try {
      const data = await documents.findOne({ gmail: gmail });
      if (data) {
        const SCRT_KEY = process.env.KEY;
        const token = jwt.sign({ userId: data._id }, SCRT_KEY);
        const link = `https://buildres.netlify.app/setpassword/${token}`;
        const mail = {
          from: "sushilkc2611@gmail.com",
          to: `${data.gmail}`,
          subject: "reset password",
          html: `<a href=${link}>${link}</a>`,
        };
        transport.sendMail(mail, (err, data) => {
          if (err) {
            res.send({ message: err, success: false });
          } else {
            res.send({ message: "Email was sent", success: true });
          }
        });
      } else {
        res.send({ message: "invaldid gmail", success: false });
      }
    } catch (error) {
      res.status(401).send(error);
    }
  };

  static setPass = async (req, res) => {
    const { token, password, confirmPassword } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    const SCRT_KEY = process.env.KEY;
    const match = jwt.verify(token, SCRT_KEY);
    const data = await documents.updateOne(
      { _id: match.userId },
      { $set: { password: hashPassword } }
    );
    res.send({ message: data, success: true });
  };
  static contact = (req, res) => {
    const { name, phone, message, gmail } = req.body;
    const mail = {
      from: { gmail },
      to: "sushilkc2611@gmail.com",
      subject: "mydata",
      html: `<h1> Name : ${name}</h1>
            <p> Message : ${message}</p>
            <p> Phone : ${phone}</p>
            <a href="mailto:${gmail}" >${gmail}<a/>
            `,
    };
    transport.sendMail(mail, (err) => {
      if (err) {
        res.send({ message: err, success: false });
      }
    });
    res.send({ message: "success", success: true });
  };
}
module.exports = routeFunction;
