const User = require("../models/user");
const jwt = require("jsonwebtoken");

async function userAuth(req, res, next) {
  try {
    const cookie = req.cookies;
    if (!cookie.token) throw new Error("Invalid user");
    const { token } = cookie;
    const decodedJwt = jwt.verify(token, process.env.JWT_SECRET);
    const { _id } = decodedJwt;

    const user = await User.findById(_id);
    if (!user) {
      throw new Error("User not found");
    }
    req.user = user;
    next();
  } catch (err) {
    res.status(401).send(err.message);
  }
}

module.exports = userAuth;
