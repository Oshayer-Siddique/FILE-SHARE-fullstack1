const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const path = require("path");

const FileMetadata = require("../models/file");



// Set up multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'UPLOAD_FOLDER/'); // Destination folder for uploaded files
  },
  filename: function (req, file, cb) {
    // Rename the file to avoid overwriting
    // const uniqueSuffix = Date.now() + '-' + 1000;
    // const extension = path.extname(file.originalname);
    const filename = file.originalname
    cb(null, filename);
  },
});

const uploadFile = multer({ storage }).array('file',10);




const upload = async (req, res) => {

  

  await uploadFile(req,res,(err) => {
    if(err){
      res.status(500).send("file upload fail");

    }
    let authorization  = req.cookies[process.env.COOKIE_NAME];
    const decoded = jwt.verify(authorization,process.env.secret_key);
    const uploadername = decoded.username;


    const uploader = uploadername;

    const uploadedFile  = req.files;
    const response_data = {
      info1 : uploadedFile,
      info2 : uploader,
    }



    

    





    
    res.send(response_data);
    







    

  })

};



module.exports = {
  upload,
}