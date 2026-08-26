const express = require("express");
const profileRouter = express.Router();
const userAuth = require("../middleware/userAuth");
const { validateAllowedUpdates } = require("../utils/validate");

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    return res.status(200).json({
      firstName: user.firstName,
      lastName: user.lastName,
      emailId: user.emailId,
      age: user.age,
      gender: user.gender,
    });
  } catch (err) {
    res.status(400).send(err.message);
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

    Object.keys(receivedUpdates).forEach((key) => {
      user[key] = receivedUpdates[key];
    });
    await user.save();

    return res
      .status(200)
      .json({ result: "sucsess", updates: receivedUpdates });
  } catch (err) {
    res.status(400).send(err.message);
  }
});

module.exports = profileRouter;
