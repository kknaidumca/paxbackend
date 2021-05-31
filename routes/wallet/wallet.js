'use strict';
const express = require("express");
const router = express.Router();
const walletController = require('../../controller/wallet/wallet-controller');
router.post('/wallet/balance', walletController.walletBalance);
router.post('/wallet/new-address', walletController.walletNewAddress);
router.post('/wallet/list-addresses', walletController.walletListddresses);
module.exports = router;