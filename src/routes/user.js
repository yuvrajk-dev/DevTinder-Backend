const express = require("express");
const userAuth = require("../middleware/userAuth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");
const userRouter = express.Router();

userRouter.get("/user/requests/received", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const data = await ConnectionRequest.find({
      toUserId: loggedInUser._id,
      status: "interested",
    })
      .select("fromUserId")
      .populate("fromUserId", "firstName lastName age gender bio skills");

    if (data.length === 0) {
      return res.status(200).json({ message: "No incoming requests" });
    }

    res.status(200).json({ message: "Incoming requests", data });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

userRouter.get("/user/connections", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const connections = await ConnectionRequest.find({
      status: "accepted",
      $or: [{ fromUserId: loggedInUser._id }, { toUserId: loggedInUser._id }],
    })
      .select("fromUserId toUserId")
      .populate("fromUserId", "firstName lastName age gender bio skills")
      .populate("toUserId", "firstName lastName age gender bio skills");
    if (connections.length === 0) {
      return res.status(200).json({ message: "No connections" });
    }

    const data = connections.map((connection) => {
      if (connection.fromUserId._id.equals(loggedInUser._id)) {
        return connection.toUserId;
      }
      return connection.fromUserId;
    });

    res.status(200).json({ message: "connections", data });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

userRouter.get("/feed", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;
    limit = limit > 50 ? 50 : limit;
    const skip = (page - 1) * limit;

    let connectionRequests = await ConnectionRequest.find({
      $or: [{ fromUserId: loggedInUser._id }, { toUserId: loggedInUser._id }],
    });

    let hiddenUser = new Set();

    connectionRequests.forEach((connection) => {
      hiddenUser.add(connection.fromUserId);
      hiddenUser.add(connection.toUserId);
    });

    const feed = await User.find({
      _id: { $nin: [...hiddenUser, loggedInUser._id] },
    })
      .select("firstName lastName age gender bio skills")
      .sort({ _id: 1 })
      .skip(skip)
      .limit(limit);
    res.status(200).send(feed);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = userRouter;
