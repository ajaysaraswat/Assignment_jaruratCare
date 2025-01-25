const express = require("express");
const {
  handleRegister,
  handlelogout,
  handlelogin,
} = require("../controller/user");
const { validateUser } = require("../middlewares/validateSchema");

const userRouter = express.Router();

userRouter.post("/register", validateUser, handleRegister);
userRouter.post("/login", handlelogin);
userRouter.post("/logout", handlelogout);

module.exports = userRouter;
