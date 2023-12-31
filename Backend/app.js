const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const multer = require('multer');
const path = require('path');
const dotenv = require('dotenv');
const app = express();



mongodb://127.0.0.1:27017/Project1

mongoose
  .connect("mongodb+srv://oshayersiddique2001:F8rxwIKDqeREkjmS@cluster3.fuqlsyt.mongodb.net/?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });


app.use(express.json());

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, 'UPLOAD_FOLDER')));


//console.log("Hello Oshayer");
dotenv.config();

const RegisterRouter = require('./router/RegisterRouter');
const LoginRouter = require('./router/LoginRouter');
const UploadRouter = require('./router/UploadRouter');
const SeachRouter = require('./router/SearchRouter');
const P2PShareRouter = require('./router/P2PShareRouter');



app.get('/',(req,res)=>{
  res.send("Hello Oshayer");
})

app.use('/',RegisterRouter);
app.use('/',LoginRouter);
app.use('/',UploadRouter);
app.use('/',SeachRouter);
app.use('/',P2PShareRouter);






app.listen(process.env.port,()=> {
    console.log(`server listening on port ${process.env.port}`)
})