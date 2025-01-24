const { getuser } = require("../services/auth");

const restrictedtouserloginonly = (req, res, next) => {
  const userId = req.cookies?.uid;
  if (!userId) return res.json({ message: "no userid find" });
  console.log("userId", userId);
  const user = getuser(userId);
  console.log("user", user);
  if (!user) return res.json({ message: "no user found" });
  req.User = user;
  next();
};

const authorizeRole = (roles) => {
  return (req, res, next) => {
    console.log("req.user", req.User);
    if (!roles.includes(req.User.role)) {
      return res.status(403).json({
        message: "Forbidden: You do not have access to this resource",
      });
    }
    next();
  };
};

const checkauth = (req, res, next) => {
  const userId = req.cookies?.uid;
  const user = getuser(userId);
  req.user = user;
  next();
};
module.exports = {
  restrictedtouserloginonly,
  checkauth,
  authorizeRole,
};
