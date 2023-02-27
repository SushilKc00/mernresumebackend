const jwt = require("jsonwebtoken");
const loginlogoutauth = async (req, res, next) => {
  try {
    const token = req.headers["authorization"];
    if (token) {
      next();
    } else {
      res.json({ success: false, message: "not auhenticate" });
    }
  } catch (error) {
    res.send({ message: "sorry", success: false });
  }
};
module.exports = loginlogoutauth;
