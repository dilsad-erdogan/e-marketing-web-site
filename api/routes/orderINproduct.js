const express = require('express');
const router = express.Router();
const { getOIP, addOIP, deleteOIP } = require('../controllers/orderINproduct');

router.route('/get/:id').get(getOIP);
router.route('/add').post(addOIP);
router.route('/delete/:id').patch(deleteOIP);

module.exports = router;