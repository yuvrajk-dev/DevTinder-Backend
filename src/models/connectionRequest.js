const mongoose = require("mongoose");
const { Schema } = mongoose;

const connectionRequestSchema = new Schema(
  {
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "From userID is required"],
      cast: "From userID is invalid",
    },
    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "To userID is required"],
      cast: "To userID is invalid",
    },
    status: {
      type: String,
      enum: {
        values: ["rejected", "requested", "ignored", "interested"],
        message: "{value} is incorrect status type",
      },
    },
  },
  { timestamps: true },
);

connectionRequestSchema.pre("save", function (next) {
  if (this.fromUserId.equals(this.toUserId)) {
    throw new Error("You cannot send a connection request to yourself");
  }
  next();
});

connectionRequestSchema.index({ fromUserId: 1, toUserId: 1 });

module.exports = mongoose.model("connectionRequest", connectionRequestSchema);
