const express = require('express')

const router = express.Router();


const{search_file} = require('../controller/SearchController');


router.post("/search",search_file);

module.exports = router;

