const express = require('express');
const router = express();
const userController = require('../Controller/userController');
const authController = require('../Controller/authController');
const { getUsers, getOneUser } = userController;
const { userSignup, userLogin } = authController;
const uploadImage = require('../Utility/imageUpload');

router.post('/sign-up', uploadImage, userSignup);
router.post('/log-in', userLogin);

router.route('/').get(getUsers);
router.route('/:userId').get(getOneUser);

module.exports = router;
