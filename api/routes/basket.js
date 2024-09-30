const express = require('express');
const router = express.Router();
const { getBasket, addBasket, updateAmount, deleteBasket, getBasketId } = require('../controllers/basket');

router.route('/get/:id').get(getBasket);
router.route('/add').post(addBasket);
router.route('/updateAmount/:id').put(updateAmount);
router.route('/delete/:id').patch(deleteBasket);
router.route('/byId/:id').get(getBasketId);

module.exports = router;