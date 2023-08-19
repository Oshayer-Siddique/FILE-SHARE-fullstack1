const express = require('express')

const router = express.Router();

const{login,profile,logout} = require('../controller/LoginController');
const CheckLogin = require('../middlewares/checklogin');




router.post("/login",login);
router.get("/profile/:username",CheckLogin,profile);
router.delete("/",logout)

module.exports = router;





