const express = require('express');
const payrouter = express.Router();
const paymen=require('../contorler/payment')


payrouter.post('/pay',paymen.payment);

module.exports = payrouter
