const jwt = require("jsonwebtoken");
const model = require("../Models/Schema");
const auth = async (req, res, next) => {
  try {
    const token = req.headers["authorization"];
    const userData = await jwt.verify(token, process.env.KEY);
    if (userData) {
      next();
    }
  } catch (error) {
    res.send({ message: "sorry", success: false });
  }
};
module.exports = auth;
