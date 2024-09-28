const express = require('express');
const router = express.Router();
const { getOrder, addOrder, deleteOrder } = require('../controllers/order');

router.route('/get/:id').get(getOrder);
router.route('/add').post(addOrder);
router.route('/delete/:id').patch(deleteOrder);

module.exports = router;