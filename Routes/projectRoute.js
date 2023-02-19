const express = require('express');
const router = express();
const projectRoute = require('../Controller/projectControler');
const { getAll, addPoject } = projectRoute;

router.route('/').get(getAll).post(addPoject);

module.exports = router;
