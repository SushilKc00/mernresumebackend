require("dotenv").config();
const express = require("express");
const app = express();
const DBconnect = require("./Database/db");
const Router = require("./Routes/Router");
const Port = process.env.PORT || 5000;

const cors = require("cors");
const dbUrl = process.env.DB_URL;
app.use(cors());
app.use("/api/user/v1", Router);
DBconnect(dbUrl);

app.get("/", (req, res) => {
  res.send({ mes: "Welcome" });
});

app.listen(Port, (err) => {
  if (err) {
    throw err;
  }
});
