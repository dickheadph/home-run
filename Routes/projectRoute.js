const express = require('express');
const router = express();
const projectRoute = require('../Controller/projectControler');
const { getAll, getSingleProject, addProject, editProject, deleteProject } =
  projectRoute;

router.route('/').get(getAll).post(addProject);
router
  .route('/:projectId')
  .get(getSingleProject)
  .patch(editProject)
  .delete(deleteProject);

module.exports = router;
