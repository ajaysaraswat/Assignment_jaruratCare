const express = require("express");
const {
	handleRegister,
    handlelogout,
	handlelogin,
} = require("../controllers/user");

const userRouter = express.Router();

userRouter.post("/", handleRegister);
userRouter.post("/login", handlelogin);
userRouter.post("/logout", handlelogout);

module.exports = userRouter;
