const express = require('express');
const router = express();
const userController = require('../Controller/userController');
const authController = require('../Controller/authController');
const { getProfile } = userController;
const { protectRoute } = authController;

router.get('/:profileId', protectRoute, getProfile);

module.exports = router;
