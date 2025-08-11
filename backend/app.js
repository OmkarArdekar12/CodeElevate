const express = require("express");
const app = express();
const mongoose = require("mongoose");
const MONGODB_URL = "mongodb://127.0.0.1:27017/codelevate";
const passport = require("passport");
const localStrategy = require("passport-local");
const User = require("./models/user.js");
const PORT = 8080;

main()
  .then(() => {
    console.log("Connected to Database(DB)");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGODB_URL);
}

app.listen(PORT, () => {
  console.log(`Server is listening to port ${PORT}`);
});

app.get("/", (req, res) => {
  res.send("done!");
});
