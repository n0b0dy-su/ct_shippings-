const express = require('express');
const router = express.Router();
const shippingCtrl = require('../../controllers/shipping');

//Shipping API

// CREATE
router.post('/shipping',shippingCtrl.create);
// UPDTAE
router.put('/shipping/:id',shippingCtrl.update);
// SHOW STATUS
router.get('/shipping/:id',shippingCtrl.get);

module.exports = router
