const express = require('express');
const router = express.Router();
const { updateName, updateEmail, updatePassword, deleteUser } = require('../controllers/user');

router.route('/updateName/:id').put(updateName);
router.route('/updateEmail/:id').put(updateEmail);
router.route('/updatePassword/:id').put(updatePassword);
router.route('/delete/:id').patch(deleteUser);

module.exports = router;