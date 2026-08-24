const express = require("express");
require("dotenv").config();
const connectDB = require("./src/config/database");
const User = require("./src/models/user");
const bcrypt = require("bcrypt");
const app = express();
const cookieParser = require("cookie-parser");
const validateSignup = require("./src/utils/validateSignup");
const userAuth = require("./src/middleware/userAuth");

app.use(express.json());
app.use(cookieParser());

app.post("/signup", async (req, res) => {
  try {
    validateSignup(req);
    const { firstName, lastName, emailId, age, gender, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      firstName,
      lastName,
      emailId,
      age,
      gender,
      password: hashedPassword,
    });

    await user.save();
    return res.status(201).send("User created successfully");
  } catch (err) {
    return res.status(400).send(err.message);
  }
});

app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    if (!password || !emailId) {
      throw new Error("Invalid credentials");
    }

    const user = await User.findOne({ emailId });
    if (!user) throw new Error();
    const isValid = await user.isHashValid(password);
    if (isValid) {
      const token = user.getJWT();
      console.log(token);
      res.cookie("token", token);
      return res.status(200).json({
        firstName: user.firstName,
        lastName: user.lastName,
        emailId: user.emailId,
        age: user.age,
        gender: user.gender,
      });
    } else {
      throw new Error();
    }
  } catch (err) {
    return res.status(401).send("Invalid credentials");
  }
});

app.get("/feed", userAuth, async (req, res) => {
  try {
    res.status(200).send("success");
  } catch (err) {
    res.status(400).send(err.message);
  }
});

app.use((req, res) => {
  return res.status(404).send("Something went wrong");
});

app.use((err, req, res, next) => {
  console.error(err);
  return res.status(400).send("Something went wrong");
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
