const express = require("express");
const router = express.Router();
router.use(express.json());
const routeFunction = require("../RouteFunction/function");
const loginlogoutauth = require("../midleware/loginlogoutauth");
const auth = require("../midleware/auth");

router.post("/login", routeFunction.signUp);
router.post("/islogin", loginlogoutauth, (req, res) => {
  res.send({ message: "login", success: true });
});
router.post("/register", routeFunction.signIn);
router.post("/islogin", loginlogoutauth, (req, res) => {
  res.send({ message: "login", success: true });
});
router.post("/forgotpassword", routeFunction.forgot);
router.post("/setPassword", routeFunction.setPass);
router.post("/contact", routeFunction.contact);
router.post("/homes", auth, (req, res) => {
  res.send({ message: "success", success: true });
});

module.exports = router;
