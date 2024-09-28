const express = require('express');
const router = express.Router();
const { addRole } = require('../controllers/role');

router.route('/add').post(addRole);

module.exports = router;