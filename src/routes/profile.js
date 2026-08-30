const express = require("express");
const profileRouter = express.Router();
const userAuth = require("../middleware/userAuth");
const { validateAllowedUpdates } = require("../utils/validate");

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    return res.status(200).json({
      message: "Profile data",
      data: {
        firstName: user.firstName,
        lastName: user.lastName,
        emailId: user.emailId,
        age: user.age,
        gender: user.gender,
        bio: user.bio,
        skills: user.skills,
      },
    });
  } catch (err) {
    res.status(400).json({
      message: err.message,
      data: null,
    });
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    const user = req.user;
    const receivedUpdates = req.body;

    const isAllowed = validateAllowedUpdates(req);
    if (!isAllowed) {
      throw new Error("Update not allowed");
    }
    const isSame = Object.keys(receivedUpdates).every((key) => {
      if (Array.isArray(user[key]) && Array.isArray(receivedUpdates[key])) {
        return (
          user[key].length === receivedUpdates[key].length &&
          user[key].every(
            (value, index) => value === receivedUpdates[key][index],
          )
        );
      }

      return user[key] === receivedUpdates[key];
    });

    if (isSame) {
      return res.status(200).json({
        message: "No changes were made",
        data: {
          firstName: user.firstName,
          lastName: user.lastName,
          emailId: user.emailId,
          age: user.age,
          gender: user.gender,
          bio: user.bio,
          skills: user.skills,
        },
      });
    }

    Object.keys(receivedUpdates).forEach((key) => {
      user[key] = receivedUpdates[key];
    });
    await user.save();

    return res.status(200).json({
      message: "Profile updated successfully",
      data: {
        firstName: user.firstName,
        lastName: user.lastName,
        emailId: user.emailId,
        age: user.age,
        gender: user.gender,
        bio: user.bio,
        skills: user.skills,
      },
    });
  } catch (err) {
    const message =
      err.name === "ValidationError"
        ? Object.values(err.errors)[0].message
        : err.message;
    res.status(400).json({ message, data: null });
  }
});

module.exports = profileRouter;
