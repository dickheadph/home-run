const express = require('express');
const router = express();
const projectRoute = require('../Controller/projectControler');
const { getAll } = projectRoute;

router.route('/').get(getAll);

module.exports = router;
