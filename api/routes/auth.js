const express = require('express');
const router = express.Router();
const { register, loginOrigin, login2FA, verify2FA, forgotPassword } = require('../controllers/auth');

router.route('/register').post(register);
router.route('/loginOrigin').post(loginOrigin);
router.route('/login2FA').post(login2FA);
router.route('/verify2FA').post(verify2FA);
router.route('/forgot').post(forgotPassword);

module.exports = router;