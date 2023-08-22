const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const path = require("path");



const Item = require('../models/file');


async function search_file(req,res){

    
    try{    
        const{originalname} = req.body;
        //const item = await Item.findOne({originalname});
        const matchingItems = await Item.find({
            originalname:{$regex : originalname,$options : 'i'}
        },'originalname');

        const matchingFilenames = matchingItems.map(item => item.originalname);
        res.json(matchingFilenames);



    }
    catch(err){
        res.status(500).send("An error occured");

    }


}


module.exports = {
    search_file,
}





