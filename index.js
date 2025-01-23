const express = require("express");
const {connecttoMongoDB} =  require("./connection");
const app = express();
const PORT = 8000;

connecttoMongoDB("mongodb://127.0.0.1:27017/RahatDatabase");

app.use(express.urlencoded({extended : false}));
app.use(express.json());


app.listen(PORT,(req,res)=>{
    console.log(`server is running on port ${PORT}`);
})