const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      trim: true,
      required: [true, "First name is required."],
      minlength: [4, "First name must be at least 4 characters."],
      maxlength: [20, "First name cannot exceed 20 characters."],
    },

    lastName: {
      type: String,
      trim: true,
      required: [true, "Last name is required."],
      minlength: [4, "Last name must be at least 4 characters."],
      maxlength: [20, "Last name cannot exceed 20 characters."],
    },

    emailId: {
      type: String,
      required: [true, "Email is required."],
      lowercase: true,
      trim: true,
      unique: [true, "Email already exists"],
      validate: {
        validator: (emailId) => validator.isEmail(emailId),
        message: "Please enter a valid email address.",
      },
    },

    age: {
      type: Number,
      required: [true, "Age is required."],
      min: [18, "You must be at least 18 years old."],
      max: [100, "Please enter a valid age."],
    },

    gender: {
      type: String,
      trim: true,
      required: [true, "Gender is required."],
      enum: {
        values: ["male", "female", "other"],
        message: "Please select a valid gender.",
      },
    },

    password: {
      type: String,
      trim: true,
      required: [true, "Password is required."],
    },
  },
  { timestamps: true },
);

userSchema.methods.getJWT = function () {
  const token = jwt.sign({ _id: this._id.toString() }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  return token;
};

userSchema.methods.isHashValid = async function (inputPassword) {
  const isValid = await bcrypt.compare(inputPassword, this.password);
  return isValid;
};

module.exports = mongoose.model("User", userSchema);
