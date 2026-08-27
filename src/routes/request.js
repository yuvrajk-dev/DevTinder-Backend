const express = require("express");
const requestRouter = express.Router();
const userAuth = require("../middleware/userAuth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");
const mongoose = require("mongoose");

requestRouter.post(
  "/request/send/:status/:toUserID",
  userAuth,
  async (req, res) => {
    try {
      const toUserId = req.params.toUserID;
      const fromUserId = req.user._id;
      const status = req.params.status;

      const allowedStatus = ["interested", "ignored"];

      if (!allowedStatus.includes(status)) {
        return res.status(400).json({ message: "Invalid status", status });
      }

      if (!mongoose.Types.ObjectId.isValid(toUserId)) {
        return res.status(400).json({
          message: "Invalid user ID",
        });
      }
      const user = await User.findById(toUserId);

      if (!user) {
        return res.status(404).json({
          message: "User does not exist",
        });
      }

      const existingConnectionRequest = await ConnectionRequest.findOne({
        $or: [
          { fromUserId, toUserId },
          { fromUserId: toUserId, toUserId: fromUserId },
        ],
      });
      if (existingConnectionRequest) {
        return res.status(400).json({ message: "Connection Already Exists" });
      }
      const connectionRequest = new ConnectionRequest({
        fromUserId,
        toUserId,
        status,
      });

      const data = await connectionRequest.save();

      res.status(200).json({
        message: "Request sent successfully",
        data: {
          fromUserId: data.fromUserId,
          toUserId: data.toUserId,
          status: data.status,
        },
      });
    } catch (err) {
      res.status(500).send(err.message);
    }
  },
);

module.exports = requestRouter;
