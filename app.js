const express = require("express");
require("dotenv").config();
const connectDB = require("./src/config/database");
const User = require("./src/models/user");
const app = express();

app.use(express.json());

app.post("/signup", async (req, res) => {});

connectDB()
  .then(() => {
    console.log("Database is connected");
    app.listen("3000", () => {
      console.log("Server is listening...");
    });
  })
  .catch((err) => {
    console.error(err);
  });
