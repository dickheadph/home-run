const Projects = require('../Schema/projectSchema');
const AsyncHandler = require('express-async-handler');
const AppErr = require('../Middlewares/AppError');

exports.getAll = AsyncHandler(async (req, res, next) => {
  const projects = await Projects.find();
  res.status(200).json(projects);
});

exports.addPoject = AsyncHandler(async (req, res, next) => {
  const { name, type, category, image, author } = req.body;
  const newProject = await Projects.create({
    name,
    type,
    category,
    image,
    author,
  });
  if (!newProject) {
    return next(new AppErr('Failed to add project. Please try again', 403));
  }
  res.status(201).json({
    message: 'success',
    newProject,
  });
});
