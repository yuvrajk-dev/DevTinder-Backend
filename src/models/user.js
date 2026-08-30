const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      cast: "First name must be a valid string.",
      trim: true,
      required: [true, "First name is required."],
      minlength: [4, "First name must be at least 4 characters."],
      maxlength: [20, "First name cannot exceed 20 characters."],
    },

    lastName: {
      type: String,
      cast: "Last name must be a valid string.",
      trim: true,
      required: [true, "Last name is required."],
      minlength: [4, "Last name must be at least 4 characters."],
      maxlength: [20, "Last name cannot exceed 20 characters."],
    },

    emailId: {
      type: String,
      cast: "Email must be a valid string.",
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
      cast: "Age must be a valid number.",
      required: [true, "Age is required."],
      min: [18, "You must be at least 18 years old."],
      max: [100, "Please enter a valid age."],
    },

    gender: {
      type: String,
      cast: "Gender must be a valid string.",
      trim: true,
      required: [true, "Gender is required."],
      enum: {
        values: ["male", "female", "other"],
        message: "Please select a valid gender.",
      },
    },
    bio: {
      type: String,
      cast: "Bio must be a valid string.",
      trim: true,
      required: [true, "Bio is required."],
      minlength: [10, "Bio must be at least 10 characters."],
      maxlength: [300, "Bio cannot exceed 300 characters."],
    },
    skills: {
      type: [String],
      required: [true, "At least two skills are required."],
      validate: [
        {
          validator: (skills) => skills.length >= 2,
          message: "At least two skills are required.",
        },
        {
          validator: (skills) => skills.length <= 5,
          message: "You can add a maximum of 5 skills.",
        },
        {
          validator: (skills) =>
            skills.every(
              (skill) => typeof skill === "string" && skill.trim().length > 0,
            ),
          message: "Skills cannot be empty.",
        },
      ],
    },

    password: {
      type: String,
      cast: "Password must be a valid string.",
      trim: true,
      required: [true, "Password is required."],
    },
  },
  { timestamps: true },
);

userSchema.methods.getJWT = function () {
  const user = this;

  const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  return token;
};

userSchema.methods.isHashValid = async function (inputPassword) {
  const user = this;

  const isValid = await bcrypt.compare(inputPassword, user.password);

  return isValid;
};

module.exports = mongoose.model("User", userSchema);
