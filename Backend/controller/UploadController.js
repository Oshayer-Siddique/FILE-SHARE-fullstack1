const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const FileMetadata = require("../models/file");

// Set up multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "UPLOAD_FOLDER/"); // Destination folder for uploaded files
  },
  filename: function (req, file, cb) {
    // Rename the file to avoid overwriting
    // const uniqueSuffix = Date.now() + '-' + 1000;
    // const extension = path.extname(file.originalname);
    const filename = file.originalname;
    cb(null, filename);
  },
});

const uploadFile = multer({ storage }).array("file", 10);

const upload = async (req, res) => {
  await uploadFile(req, res,  (err) => {
    if (err) {
      res.status(500).send("file upload fail");
    }
    let authorization = req.cookies[process.env.COOKIE_NAME];
    const decoded = jwt.verify(authorization, process.env.secret_key);
    const uploadername = decoded.username;

    const uploader = uploadername;

    const uploadedFile = req.files;
    const response_data = {
      info1: uploadedFile,
      info2: uploader,
    };

    //console.log(response_data);
    var info1 = response_data.info1;
    //console.log(info1);

    //console.log(info1.length);

    let flag = 1;



      for (var i = 0; i < info1.length; i++) {
        var item = info1[i];
        var originalname = item.originalname;
        var mimetype = item.mimetype;





        //console.log(originalname,mimetype);
        const newFileMetatdata = new FileMetadata({
          originalname,
          mimetype,
          uploader,
        });
 
        newFileMetatdata.save();
          


      }

      res.send(response_data);
    


    
  });
};


const getListFiles = async(req,res) => {
  const filemetadata = await FileMetadata.find({},'originalname');

  const fileNames = filemetadata.map(filemetadata => filemetadata.originalname);
  res.send(fileNames);



}


const download = (req,res) =>{
  const filename = req.params.filename;
  console.log(filename);
  const directoryPath = path.join('H:', 'Full Stack Project', 'Project1', 'Backend', 'UPLOAD_FOLDER',filename);
  

  // if (fs.existsSync(directoryPath)) {
  //   res.send('Directory exists.');
  // } else {
  //   res.send('Directory does not exist.');
  // }


  res.download(directoryPath,filename => {})

}











module.exports = {
  upload,
  getListFiles,
  download,
  
  
};
