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
  .connect("mongodb://127.0.0.1:27017/Project1", {
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

//console.log("Hello Oshayer");
dotenv.config();

const RegisterRouter = require('./router/RegisterRouter');
const LoginRouter = require('./router/LoginRouter');
const UploadRouter = require('./router/UploadRouter');
const SeachRouter = require('./router/SearchRouter');




app.use('/',RegisterRouter);
app.use('/',LoginRouter);
app.use('/',UploadRouter);
app.use('/',SeachRouter);






app.listen(process.env.port,()=> {
    console.log(`server listening on port ${process.env.port}`)
})