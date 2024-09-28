const express = require('express');
const router = express.Router();
const { getProduct, addProduct, updateName, updatePhoto, updatePrice, deleteProduct, getProductId, } = require('../controllers/product');

router.route('/get').get(getProduct);
router.route('/add').post(addProduct);
router.route('/updateName/:id').put(updateName);
router.route('/updatePhoto/:id').put(updatePhoto);
router.route('/updatePrice/:id').put(updatePrice);
router.route('/delete/:id').patch(deleteProduct);
router.route('/byId/:id').get(getProductId);

module.exports = router;