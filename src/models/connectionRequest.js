const mongoose = require("mongoose");
const { Schema } = mongoose;
const User = require("../models/user");

const connectionRequestSchema = new Schema(
  {
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "From userID is required"],
      cast: "From userID is invalid",
      ref: User,
    },
    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "To userID is required"],
      cast: "To userID is invalid",
      ref: User,
    },
    status: {
      type: String,
      enum: {
        values: ["rejected", "ignored", "interested", "accepted"],
        message: "{VALUE} is incorrect status type",
      },
    },
  },
  { timestamps: true },
);

connectionRequestSchema.pre("save", function () {
  if (this.fromUserId.equals(this.toUserId)) {
    throw new Error("You cannot send a connection request to yourself");
  }
});

connectionRequestSchema.index({ fromUserId: 1, toUserId: 1 });

module.exports = mongoose.model("connectionRequest", connectionRequestSchema);
