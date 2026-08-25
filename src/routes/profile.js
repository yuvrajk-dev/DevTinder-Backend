const express = require("express");
const profileRouter = express.Router();
const userAuth = require("../middleware/userAuth");

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

module.exports = profileRouter;
