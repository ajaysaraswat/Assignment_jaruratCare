const express = require("express");
const { connecttoMongoDB } = require("./connection");
const userRouter = require("./routes/user");
const resourceRouter = require("./routes/resourceDonor");
const { restrictedtouserloginonly } = require("./middlewares/auth");
const cookieParser = require("cookie-parser");
const app = express();
const PORT = 8000;

connecttoMongoDB("mongodb://127.0.0.1:27017/RahatDatabase");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

app.use("/", userRouter);
app.use("/", restrictedtouserloginonly, resourceRouter);

app.listen(PORT, (req, res) => {
  console.log(`server is running on port ${PORT}`);
});
