const mongoose = require("mongoose");
const validator = require("validator");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      trim: true,
      required: true,
      minLength: 4,
      maxLength: 20,
    },
    lastName: {
      type: String,
      trim: true,
      required: true,
      minLength: 4,
      maxLength: 20,
    },
    emailId: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      unique: true,
      validate(emailId) {
        return validator.isEmail(emailId);
      },
    },
    age: {
      type: Number,
      required: true,
      min: 18,
      max: 100,
    },
    gender: {
      type: String,
      trim: true,
      required: true,
      enum: ["male", "female", "other"],
    },
    password: {
      type: String,
      trim: true,
      required: true,
      validate(password) {
        return validator.isStrongPassword(password);
      },
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("User", userSchema);
