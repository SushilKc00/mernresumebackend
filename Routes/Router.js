const express = require("express");
const router = express.Router();
router.use(express.json());
const routeFunction = require("../RouteFunction/function");
const auth = require("../midleware/auth");

router.post("/login", routeFunction.signUp);
router.post("/register", routeFunction.signIn);
router.post("/forgotpassword", routeFunction.forgot);
router.post("/setPassword", routeFunction.setPass);
router.post("/contact", routeFunction.contact);
router.post("/homes", auth, (req, res) => {
  res.send({ message: "success", success: true });
});

module.exports = router;
