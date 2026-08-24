const validator = require("validator");

function validateSignup(req) {
  if (!req.body || Object.keys(req.body).length === 0) {
    throw new Error("Something went wrong");
  }

  const { password } = req.body;

  if (!password) {
    throw new Error("Password is required");
  }

  if (!validator.isStrongPassword(password)) {
    throw new Error(
      "Password: 8+ chars, uppercase, lowercase, number & symbol required.",
    );
  }
  return;
}

module.exports = validateSignup;
