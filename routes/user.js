const express = require("express");
const {
	handlepostuser,
    handlelogout,
	handlepostsignin,
	
} = require("../controllers/user");

const userRouter = express.Router();

userRouter.post("/user", handlepostuser);
userRouter.post("/user/signin", handlepostsignin);
userRouter.post("/user/logout", handlelogout);

module.exports = userRouter;
