const express = require('express');
const router = express.Router();
const indexController = require('../controllers/indexController');

router.get("/", indexController.indexPageViewController)
router.post("/create/orderId", indexController.CreateOrder);
router.post('/api/payment/verify', indexController.VerifyPayment);

module.exports = router;