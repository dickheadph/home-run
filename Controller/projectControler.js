const Projects = require('../Schema/projectSchema');
const AsyncHandler = require('express-async-handler');
const AppErr = require('../Middlewares/AppError');

exports.getAll = AsyncHandler(async (req, res, next) => {
  const projects = await Projects.find();
  res.status(200).json(projects);
});

exports.getSingleProject = AsyncHandler(async (req, res, next) => {
  const project = await Projects.findById(req.params.projectId);
  if (!project) {
    return next(new AppErr('No project found that Id.', 403));
  }
  res.status(200).json(project);
});

exports.addProject = AsyncHandler(async (req, res, next) => {
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

exports.editProject = AsyncHandler(async (req, res, next) => {
  const { name, type, category, image, author } = req.body;

  const updatedProject = await Projects.findByIdAndUpdate(
    req.params.projectId,
    {
      name,
      type,
      category,
      image,
      author,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  if (!updatedProject) {
    return next(new AppErr('Failed to update project. Please try again.', 403));
  }

  res.status(200).json({
    message: 'success',
    updatedProject,
  });
});

exports.deleteProject = AsyncHandler(async (req, res, next) => {
  await Projects.findByIdAndDelete(req.params.projectId);
  res.status(201).json({
    data: null,
  });
});
