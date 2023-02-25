const express = require('express');
const router = express();
const userController = require('../Controller/userController');
const authController = require('../Controller/authController');
const { getUsers, getOneUser } = userController;
const { userSignup, userLogin, protectRoute } = authController;
const uploadImage = require('../Utility/imageProcess');

router.post('/sign-up', uploadImage, userSignup);
router.post('/log-in', userLogin);

router.route('/').get(protectRoute, getUsers);
router.route('/:userId').get(getOneUser);

module.exports = router;
