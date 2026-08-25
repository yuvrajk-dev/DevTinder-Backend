const express = require("express");
const authRouter = express.Router();
const User = require("../models/user");
const validateSignup = require("../utils/validateSignup");
const bcrypt = require("bcrypt");

authRouter.post("/signup", async (req, res) => {
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

authRouter.post("/login", async (req, res) => {
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
      res.cookie("token", token);
      res.status(200).send("Login successful");
    } else {
      throw new Error();
    }
  } catch (err) {
    return res.status(401).send("Invalid credentials");
  }
});

module.exports = authRouter;
