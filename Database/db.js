const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const DBconnection = async (DB_URL) => {
  try {
    await mongoose.connect(DB_URL, {});
    console.log("Database Connected");
  } catch (error) {
    console.log(error);
  }
};
module.exports = DBconnection;
