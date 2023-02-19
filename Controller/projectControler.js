const Projects = require('../Schema/projectSchema');
const AsyncHandler = require('express-async-handler');

exports.getAll = AsyncHandler(async (req, res, next) => {
  const projects = await Projects.find();
  res.status(200).json(projects);
});
