require("dotenv").config();
const express = require("express");
const connectDB = require("./src/config/database");
const cookieParser = require("cookie-parser");
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());

const authRouter = require("./src/routes/auth");
const profileRouter = require("./src/routes/profile");
const requestRouter = require("./src/routes/request");
const userRouter = require("./src/routes/user");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);

app.use((req, res) => {
  return res.status(404).send("Something went wrong");
});

app.use((err, req, res, next) => {
  console.error(err);
  return res.status(400).send("Something went wrong");
});

connectDB()
  .then(() => {
    console.log("Database is connected");
    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error(err);
  });
