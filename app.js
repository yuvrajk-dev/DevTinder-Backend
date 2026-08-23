const express = require("express");
require("dotenv").config();
const connectDB = require("./src/config/database");
const User = require("./src/models/user");
const app = express();

app.use(express.json());

app.post("/signup", async (req, res) => {
  const data = req.body;
  const user = new User(data);
  try {
    await user.save();
    res.send("user created successfully");
  } catch (err) {
    res.status(500).send("user can not be added to the database");
  }
});

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
