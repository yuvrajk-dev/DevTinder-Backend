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
    return res.status(201).json({
      message: "User created successfully",
      data: {
        firstName: user.firstName,
        lastName: user.lastName,
        emailId: user.emailId,
        age: user.age,
        gender: user.gender,
      },
    });
  } catch (err) {
    return res.status(400).json({
      message: err.message,
      data: null,
    });
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    if (!password || !emailId) {
      throw new Error("Invalid credentials");
    }

    const user = await User.findOne({ emailId });
    if (!user) throw new Error("Invalid credentials");
    const isValid = await user.isHashValid(password);
    if (isValid) {
      const token = user.getJWT();
      res.cookie("token", token);
      return res.status(200).json({
        message: "Login successful",
        data: {
          firstName: user.firstName,
          lastName: user.lastName,
          emailId: user.emailId,
          age: user.age,
          gender: user.gender,
        },
      });
    } else {
      throw new Error("Invalid credentials");
    }
  } catch (err) {
    return res.status(401).json({
      message: err.message,
      data: null,
    });
  }
});

authRouter.post("/logout", (req, res) => {
  try {
    res.cookie("token", null, {
      expires: new Date(Date.now()),
    });

    return res.status(200).json({
      message: "Logout successful",
      data: null,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
      data: null,
    });
  }
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
      throw new Error(
        "New password must be different from the current password",
      );

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
    return res.status(200).json({
      message: "Password changed successfully",
      data: null,
    });
  } catch (err) {
    return res.status(401).json({
      message: err.message,
      data: null,
    });
  }
});
module.exports = authRouter;
