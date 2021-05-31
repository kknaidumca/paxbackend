'use strict';
const express = require("express");
const router = express.Router();
const userController = require('../../controller/user/user-controller');
router.post('/user/info', userController.userInfo);
router.post('/user/trust', userController.userTrust);
router.post('/user/untrust', userController.userUnTrust);
module.exports = router;