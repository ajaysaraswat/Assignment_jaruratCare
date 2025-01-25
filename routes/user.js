const express = require("express");
const {
  handleRegister,
  handlelogout,
  handlelogin,
  getallApiEndpoints,
} = require("../controller/user");
const { validateUser } = require("../middlewares/validateSchema");

const userRouter = express.Router();

userRouter.get("/", getallApiEndpoints);
userRouter.post("/register", validateUser, handleRegister);
userRouter.post("/login", handlelogin);
userRouter.post("/logout", handlelogout);

module.exports = userRouter;
