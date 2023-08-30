const express = require('express')

const router = express.Router();


const{upload_private,downloadP2P} = require('../controller/P2PShare');
const { route } = require('./RegisterRouter');


router.post('/privatefiles',upload_private);
router.get('/privatefiles/:fileuuid',downloadP2P);


module.exports = router;

