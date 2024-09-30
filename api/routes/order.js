const express = require('express');
const router = express.Router();
const { getOrder, addOrder, deleteOrder, getOrderId } = require('../controllers/order');

router.route('/get/:id').get(getOrder);
router.route('/add').post(addOrder);
router.route('/delete/:id').patch(deleteOrder);
router.route('/byId/:id').get(getOrderId);

module.exports = router;