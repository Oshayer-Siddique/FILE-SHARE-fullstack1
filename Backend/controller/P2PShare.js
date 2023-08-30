const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const {v4 : uuid4} = require('uuid');


const FileMetadata = require("../models/file");


// Set up multer storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "Private_folder/"); // Destination folder for uploaded files
    },
    filename: function (req, file, cb) {
      // Rename the file to avoid overwriting
      // const uniqueSuffix = Date.now() + '-' + 1000;
      // const extension = path.extname(file.originalname);
      const filename = file.originalname;
      cb(null, filename);
    },
  });



const privateuploadfile = multer({ storage }).single('file');

const upload_private = async (req, res) => {
    await privateuploadfile(req, res,  (err) => {
      if (err) {
        res.status(500).send("file upload fail");
      }
      let authorization = req.cookies[process.env.COOKIE_NAME];
      const decoded = jwt.verify(authorization, process.env.secret_key);
      const uploadername = decoded.username;



      const uploader = uploadername;
      const originalname = req.file.originalname;
      const path = req.file.path;
      const size = req.file.size;
      const fileuuid = uuid4();
      const mimetype = req.file.mimetype;

      const privateFileMetadata = new FileMetadata({
        originalname,
        fileuuid,
        mimetype,
        uploader,
        path,
        size,

      });
      privateFileMetadata.save();
      return res.json({file: `${process.env.APP_BASE_URL}/privatefiles/${fileuuid}`});




      


  

  
  
      
    });
  };
  

const downloadP2P = async(req,res) =>{
    // const fileuuid  = req.params.fileuuid;
    // //res.send(fileuuid);

    // const directoryPath = path.join('H:', 'Full Stack Project', 'Project1', 'Backend', 'Private_folder',fileuuid);

    // res.send(directoryPath);


    try{
        const file = await FileMetadata.findOne({fileuuid : req.params.fileuuid});
        if(!file){
            res.send("Something problem");
        }
        else{
            const filename = file.originalname;
            const directoryPath = path.join('H:', 'Full Stack Project', 'Project1', 'Backend', 'Private_folder',filename);
            //res.send(directoryPath);

            res.download(directoryPath,filename => {});

        }


    }catch(err){
        res.send("Something Problem");

    }



}







  module.exports = {
    upload_private,
    downloadP2P,
    
  };
  


