const express = require('express');
const router = express();
const userController = require('../Controller/userController');
const { getUsers, getOneUser, addNewUser } = userController;

router.route('/').get(getUsers).post(addNewUser);
router.route('/:userId').get(getOneUser);

module.exports = router;
