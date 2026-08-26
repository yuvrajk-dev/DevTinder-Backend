const express = require("express");
const authRouter = express.Router();
const User = require("../models/user");
const { validateSignup } = require("../utils/validate");
const bcrypt = require("bcrypt");
const userAuth = require("../middleware/userAuth");
const validator = require("validator");

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

authRouter.post("/logout", (req, res) => {
  try {
    res.cookie("token", null, {
      expires: new Date(Date.now()),
    });

    res.status(200).send("Logout successful");
  } catch (err) {}
});

authRouter.post("/change-password", userAuth, async (req, res) => {
  try {
    const user = req.user;
    const requiredFields = ["currentPassword", "newPassword"];
    if (!req.body || Object.keys(req.body).length === 0)
      throw new Error("Invalid credentials");

    const keys = Object.keys(req.body);
    if (!requiredFields.every((key) => keys.includes(key)))
      throw new Error("Invalid credentials");
    const { currentPassword, newPassword } = req.body;
    const dbOldPassword = user.password;
    if (currentPassword === newPassword)
      throw new Error("Password need to be different");

    const isValid = await bcrypt.compare(currentPassword, dbOldPassword);
    if (!isValid) throw new Error("Invalid credentials");
    if (!validator.isStrongPassword(newPassword)) {
      throw new Error(
        "Password: 8+ chars, uppercase, lowercase, number & symbol required.",
      );
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();
    return res.status(200).send("Password changed successfully");
  } catch (err) {
    res.status(401).send(err.message);
  }
});
module.exports = authRouter;
