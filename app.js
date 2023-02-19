const express = require('express');
const app = express();
app.use(express.json());

const projectRoute = require('./Routes/projectRoute');

app.use('/projects', projectRoute);

module.exports = app;
