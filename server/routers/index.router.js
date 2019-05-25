const express=require('express');
const router=express.Router();

const ctrlUser=require('../controllers/user.controller');
const jwtHelper=require('../config/jwtHelper') 

router.post('/register',ctrlUser.register);
router.post('/authenticateUser',ctrlUser.userAuthenticate);
router.get('/userProfile',jwtHelper.verifyJwtToken,ctrlUser.userProfiile);

module.exports=router;
