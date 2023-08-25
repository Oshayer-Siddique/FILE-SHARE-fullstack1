const express = require('express')

const router = express.Router();


const {upload,getListFiles,download} = require('../controller/UploadController');

router.post('/upload',upload);
router.get('/files',getListFiles);
router.get('/download/:filename',download);





module.exports = router;


